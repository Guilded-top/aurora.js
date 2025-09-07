export type APIUser = APIUserSummary & {
    banner?: string;
    createdAt: string;
    status?: APIUserStatus;
};

export type APIUserSummary = {
    id: string;
    type?: APIUserType;
    name: string;
    avatar?: string;
};

export type APIUserStatus = {
    content?: string;
    emoteId: number;
};

export enum APIUserType {
    Bot = "bot",
    User = "user",
};