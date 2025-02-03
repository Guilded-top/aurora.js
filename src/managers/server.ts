import Client from "../Client";
import Server from "../types/server/Server";
import { request } from "../utils/api";

export default class ServerManager {
    constructor(public client: Client) {};

    fetch(serverId: string): Promise<Server | null> {
        return request(`/servers/${serverId}`, this.client)
        .then((data) => Promise.resolve(new Server(data, this.client)))
        .catch(() => Promise.reject(null));
    };
};