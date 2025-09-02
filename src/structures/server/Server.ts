import { APIServer, APIServerType } from "../../typings";
import { Client } from "../Client";

export class Server {
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
    createdAt: Date;

    constructor(data: APIServer, public client: Client) {
        this.id = data.id;
        this.ownerId = data.ownerId;
        this.type = data.type;
        this.name = data.name;
        this.url = data.url;
        this.about = data.about;
        this.avatar = data.avatar;
        this.banner = data.banner;
        this.timezone = data.timezone;
        this.isVerified = data.isVerified;
        this.defaultChannelId = data.defaultChannelId;
        this.createdAt = new Date(data.createdAt);

        this.client.servers.cache.set(this.id, this);
    };
};