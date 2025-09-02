import { Server } from "../structures/server/Server";
import { APIServer } from "../typings";
import { BaseManager } from "./BaseManager";

export class ServerManager extends BaseManager<string, Server> {
    fetch(serverId: string): Promise<Server | null> {
        return this.api.get<{ server: APIServer }>(`/servers/${serverId}`)
        .then((data) => Promise.resolve(new Server(data.server, this.client)))
        .catch(() => Promise.reject(null));
    };
};