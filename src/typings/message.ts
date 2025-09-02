export type APIMessage = {
    id: string;
    type: APIMessageType;
    serverId?: string;
    groupId?: string;
    channelId: string;
    content?: string;
    hiddenLinkPreviewUrls?: string[];
    embeds?: APIEmbed[];
    replyMessageIds?: string[];
    isPrivate?: boolean;
    isSilent?: boolean;
    isPinned?: boolean;
    mentions: APIMentions;
    createdAt: string;
    createdBy: string;
    createdByWebhookId?: string;
    updatedAt?: string;
    deletedAt?: string;
};

export enum APIMessageType {
    Default = "default",
    System = "system",
};

export type APIMentions = {
    users?: { id: string }[];
    channels?: { id: string }[];
    roles?: { id: string }[];
    everyone?: boolean;
    here?: boolean;
};

// Embeds

export type APIEmbed = {
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    footer?: APIEmbedFooter;
    timestamp?: string;
    thumbnail?: APIEmbedThumbnail;
    image?: APIEmbedImage;
    author?: APIEmbedAuthor;
    fields?: APIEmbedField[];
};

export type APIEmbedFooter = {
    icon_url?: string;
    text: string;
};

export type APIEmbedThumbnail = { url?: string };
export type APIEmbedImage = { url?: string };

export type APIEmbedAuthor = {
    name?: string;
    url?: string;
    icon_url?: string;
};

export type APIEmbedField = {
    name: string;
    value: string;
    inline?: boolean;
};