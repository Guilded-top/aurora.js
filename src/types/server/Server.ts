import Client from "../../Client";

export default class Server {
    client: Client;

    id: string;
    ownerId: string;
    
    type: string;
    
    name: string;
    about: string;
    avatar: string;
    banner: string;
    createdAt: string;
    url: string;

    timezone: string;

    defaultChannelId: string;
    memeberCount: number;

    isVerified: boolean;

    constructor(data: any, client: Client) {
        this.client = client;

        this.id = data.server.id;

        this.memeberCount = data.serverMemberCount;

        this.ownerId = data.server.ownerId;
        this.type = data.server.type;
        this.name = data.server.name;
        this.url = data.server.url;
        this.about = data.server.about;
        this.avatar = data.server.avatar;
        this.banner = data.server.banner;
        this.createdAt = data.server.createdAt;
        this.timezone = data.server.timezone;
        this.defaultChannelId = data.server.defaultChannelId;
        this.isVerified = data.server.isVerified ? data.isVerified : false;

    }

    


}
