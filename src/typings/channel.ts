export type APIChannel = {
    id: string;
    type: APIChannelType;
    name: string;
    topic?: string;
    createdAt: string;
    createdBy: string;
    updatedAt?: string;
    serverId: string;
    rootId?: string;
    parentId?: string;
    messageId?: string;
    categoryId?: number;
    groupId: string;
    visibility?: APIChannelVisibility;
    archivedBy?: string;
    archivedAt?: string;
    priority?: number;
};

export type APIChannelType = 
    | "announcements"
    | "chat"
    | "calendar"
    | "forums"
    | "media"
    | "docs"
    | "voice"
    | "list"
    | "scheduling"
    | "stream";

export type APIChannelVisibility = 
    | "private"
    | "public";