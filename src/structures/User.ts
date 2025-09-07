import { APIUser, APIUserStatus, APIUserType } from "../typings/user";
import { Client } from "./Client";

export class User {
    id: string;
    type?: APIUserType;
    name: string;
    avatar?: string;
    banner?: string;
    createdAt: Date;
    status?: APIUserStatus;

    constructor(data: APIUser, public client: Client) {
        this.id = data.id;
        this.type = data.type;
        this.name = data.name;
        this.avatar = data.avatar;
        this.banner = data.banner;
        this.createdAt = new Date(data.createdAt);
        this.status = data.status;
    };
};