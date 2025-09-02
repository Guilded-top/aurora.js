import { CreateMessageOptions } from "../../managers/MessageManager";
import { APIMentions, APIMessage, APIMessageType } from "../../typings";
import { Client } from "../Client";
import { Channel } from "../server/Channel";
import { Member } from "../server/Member";
import { Server } from "../server/Server";
import { Embed } from "./Embed";

export class Message {
    id: string;
    type: APIMessageType;
    serverId?: string;
    groupId?: string;
    channelId: string;
    content?: string;
    hiddenLinkPreviewUrls?: string[];
    embeds?: Embed[];
    replyMessageIds?: string[];
    isPrivate?: boolean;
    isSilent?: boolean;
    isPinned?: boolean;
    mentions?: APIMentions;
    createdAt: Date;
    createdBy: string;
    createdByWebhookId?: string;
    updatedAt?: Date;
    deletedAt?: Date;

    constructor(data: APIMessage, public client: Client) {
        this.id = data.id;
        this.type = data.type;
        this.serverId = data.serverId;
        this.groupId = data.groupId;
        this.channelId = data.channelId;
        this.content = data.content;
        this.hiddenLinkPreviewUrls = data.hiddenLinkPreviewUrls || [];
        this.embeds = data.embeds ? data.embeds.map((data) => new Embed(data)) : [];
        this.replyMessageIds = data.replyMessageIds || [];
        this.isPrivate = data.isPrivate || false;
        this.isSilent = data.isSilent || false;
        this.isPinned = data.isPinned || false;
        this.mentions = data.mentions;
        this.createdAt = new Date(data.createdAt);
        this.createdBy = data.createdBy;

        if (data.createdByWebhookId) this.createdByWebhookId = data.createdByWebhookId;
        if (data.updatedAt) this.updatedAt = new Date(data.updatedAt);
        if (data.deletedAt) this.deletedAt = new Date(data.deletedAt);
    };

    get server(): Server | undefined {
        return this.serverId
            ? this.client.servers.cache.get(this.serverId)
            : undefined;
    };

    get channel(): Channel | undefined {
        return this.client.channels.cache.get(this.channelId);
    };
    
    get member(): Member | undefined {
        return this.serverId 
            ? this.client.members.cache.get(`${this.serverId}:${this.createdBy}`)
            : undefined;
    };

    reply(body: string | CreateMessageOptions) {
        return this.client.messages.create(this.channelId, 
            typeof body === "string"
            ? { content: body, replyMessageIds: [this.id] }
            : { replyMessageIds: [this.id], ...body }
        );
    };
};