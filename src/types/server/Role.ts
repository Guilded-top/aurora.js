import Client from "../../Client";


export default class Role {

    client: Client;

    id: string;
    serverId: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    isSelfAssignable: boolean;
    permissions: Permissions[];
    colors: number[];

    constructor(data: any, client: Client) {
        this.client = client;

        this.id = data.id;
        this.name = data.name;
        this.serverId = data.serverId;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = new Date(data.updatedAt);
        this.isSelfAssignable = data.isSelfAssignable;
        this.permissions = data.permissions;
        this.colors = data.colors;
    }

}