import Client from "../Client";
import Channel from "../types/server/Channel";
import { request } from "../utils/api";

export default class ChannelsManager {
    cache: Map<string, Channel> = new Map();
    
    constructor(public client: Client) {};

    fetch(channelId: string): Promise<Channel | null> {
        return request(`/channels/${channelId}`, this.client)
        .then((data) => Promise.resolve(new Channel(data, this.client)))
        .catch(() => Promise.reject(null));
    };
};