import { CreateMessageOptions } from "../../managers/MessageManager";
import { APIChannel, APIChannelType, APIChannelVisibility } from "../../typings";
import { Client } from "../Client";
import { Server } from "./Server";

export class Channel {
    id: string;
    type: APIChannelType;
    name: string;
    topic?: string;
    createdAt: Date;
    createdBy: string;
    updatedAt?: Date;
    serverId: string;
    rootId?: string;
    parentId?: string;
    messageId?: string;
    categoryId?: number;
    groupId: string;
    visibility?: APIChannelVisibility;
    archivedBy?: string;
    archivedAt?: Date;
    priority?: number;

    constructor(data: APIChannel, public client: Client) {
        this.id = data.id;
        this.type = data.type;
        this.name = data.name;
        this.topic = data.topic;
        this.createdAt = new Date(data.createdAt);
        this.createdBy = data.createdBy;
        this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : undefined;
        this.serverId = data.serverId;
        this.rootId = data.rootId;
        this.parentId = data.parentId;
        this.messageId = data.messageId;
        this.categoryId = data.categoryId;
        this.groupId = data.groupId;
        this.visibility = data.visibility;
        this.archivedBy = data.archivedBy;
        this.archivedAt = data.archivedAt ? new Date(data.archivedAt) : undefined;
        this.priority = data.priority;

        this.client.channels.cache.set(this.id, this);
    };

    get server(): Server | undefined {
        return this.serverId
            ? this.client.servers.cache.get(this.serverId)
            : undefined;
    };

    send(body: string | CreateMessageOptions) {
        return this.client.messages.create(this.id, 
            typeof body === "string"
            ? { content: body }
            : body
        );
    };
};