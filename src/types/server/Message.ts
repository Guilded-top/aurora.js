import Server from "./Server";
import Client from "../../Client";
import ChatEmbed from "../ChatEmbed";
import ApiRequestError from "../errors/ApiRequestError";
import { fetchServerMember } from "../../utils/api";
import Member from "./Member";

type rawData = {
    serverId: string;
    id: string;
    type: string;
    groupId: string;
    channelId: string;
    createdAt: Date;
    createdBy: string;
    content: string;

    replyMessageIds: string[] | undefined;
    mentions: string[] | undefined; // TODO: switch to a User object
    embeds: ChatEmbed[] | undefined;

    isPrivate: boolean;
    isPinned: boolean;

    deletedAt: Date | undefined;
    updatedAt: Date | undefined;
}

type ReplyContent = Partial<{
    isPrivate: boolean | undefined;
    isSilent: boolean | undefined;
    replyMessageIds: string[] | undefined;
    content: string | undefined;
    embeds: ChatEmbed[] | undefined;
    hiddenLinkPreviewUrls: string[] | undefined;
}>

export default class Message {

    client: Client;
    _server: Server | null | undefined;
    _author: Member | undefined;
    
    id: string;
    channelId: string;

    content: string;
    embeds: ChatEmbed[] | undefined;
    mentions: string[] | undefined;

    replyMessageIds: string[] | undefined;

    createdAt: Date;
    deletedAt: Date | undefined;
    updatedAt: Date | undefined;

    isPrivate: boolean = false;
    isPinned: boolean = false;

    rawData: rawData;

    constructor(rawData: any, client: Client) {
        this.client = client;
        this.rawData = rawData.message;

        this.id = this.rawData.id;
        this.channelId = this.rawData.channelId;

        this.content = this.rawData.content;
        this.embeds = this.rawData.embeds;
        this.mentions = this.rawData.mentions;

        this.createdAt = this.rawData.createdAt;
        this.deletedAt = this.rawData.deletedAt ? new Date(this.rawData.deletedAt) : undefined;

        this.replyMessageIds = this.rawData.replyMessageIds;

        this.isPrivate = this.rawData.isPrivate;
        this.isPinned = this.rawData.isPinned;
    }

    async delete() {
        if (this.rawData.deletedAt) {
            throw new Error('Message already deleted');
        }

        const request = await fetch(`https://www.guilded.gg/api/v1/channels/${this.channelId}/messages/${this.id}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${this.client.data.token}`,
            }
        });

        if (!request.ok) {
            throw new ApiRequestError((await request.json()).message);
        }

        this.deletedAt = new Date();
    }

    async send(content: ReplyContent) {
        const request = await fetch(`https://www.guilded.gg/api/v1/channels/${this.channelId}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.client.data.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content.content,
                embeds: content.embeds,
                replyMessageIds: content.replyMessageIds,
                isPrivate: content.isPrivate,
                isSilent: content.isSilent,
                hiddenLinkPreviewUrls: content.hiddenLinkPreviewUrls
            })
        });

        if (!request.ok) {
            throw new ApiRequestError((await request.json()).message);
        }
    }

    async reply(content: ReplyContent) {
        const request = await fetch(`https://www.guilded.gg/api/v1/channels/${this.channelId}/messages`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.client.data.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: content.content,
                embeds: content.embeds,
                replyMessageIds: [this.id],
                isPrivate: content.isPrivate,
                isSilent: content.isSilent,
                hiddenLinkPreviewUrls: content.hiddenLinkPreviewUrls
            })
        });

        if (!request.ok) {
            throw new ApiRequestError((await request.json()).message);
        }

        return request.json();
    }

    get server(): Promise<Server | null> {
        if (this._server) {
            return Promise.resolve(this._server);
        }
        return this.client.servers.fetch(this.rawData.serverId).then((server) => {
            this._server = server;
            return Promise.resolve(server);
        });  
    }

    get author(): Promise<Member | null> {
        if (this._author) {
            return Promise.resolve(this._author);
        }
        return fetchServerMember(this.rawData.serverId, this.rawData.createdBy, this.client).then((member) => {
            this._author = member;
            return Promise.resolve(member);
        });
    }

}
