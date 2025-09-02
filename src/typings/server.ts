import { APIUser, APIUserSummary } from "./user";

export type APIServer = {
    id: string;
    ownerId: string;
    type?: APIServerType;
    name: string;
    url?: string;
    about?: string;
    avatar?: string;
    banner?: string;
    timezone?: string;
    isVerified?: boolean;
    defaultChannelId?: string;
    createdAt: string;
};

export type APIServerType = 
    | "team" 
    | "organization" 
    | "community" 
    | "clan" 
    | "guild" 
    | "friends" 
    | "streaming" 
    | "other";

// Member

export type APIMember = Omit<APIMemberSummary, "user"> & {
    user: APIUser;
    nickname?: string;
    joinedAt: string;
    isOwner?: boolean;
};

export type APIMemberSummary = {
    user: APIUserSummary;
    roleIds: number[];
};