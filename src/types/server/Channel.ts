import Client from "../../Client";

export default class Channel {
    client: Client;

    id: string;
    type: ChannelType;
    name: string;
    topic?: string;
    createdAt: Date;
    updatedAt?: Date;
    serverId: string;
    rootId?: string;
    parentId?: string;
    messageId?: string;
    categoryId?: string;
    groupId: string;
    visibility?: ChannelVisibility;
    archivedBy?: string;
    archivedAt?: Date;
    priority?: number;

    constructor(data: any, client: Client) {
        this.client = client;

        this.id = data.channel.id;
        this.type = data.channel.type;
        this.name = data.channel.name;
        this.topic = data.channel.topic;
        this.createdAt = new Date(data.channel.createdAt);
        this.updatedAt = new Date(data.channel.updatedAt);
        this.serverId = data.channel.serverId;
        this.rootId = data.channel.rootId;
        this.parentId = data.channel.parentId;
        this.messageId = data.channel.messageId;
        this.categoryId = data.channel.categoryId;
        this.groupId = data.channel.groupId;
        this.visibility = data.channel.visibility;
        this.archivedBy = data.channel.archivedBy;
        this.archivedAt = new Date(data.channel.archivedAt);
        this.priority = data.channel.priority;

        this.client.channels.cache.set(this.id, this);
    };
};

export enum ChannelType {
    Announcements = "announcements",
    Chat = "chat",
    Calendar = "calendar",
    Forums = "forums",
    Media = "media",
    Docs = "docs",
    Voice = "voice",
    List = "list",
    Scheduling = "scheduling",
    Stream = "stream"
};

export enum ChannelVisibility {
    Private = "private",
    Public = "public",
};