import { Channel } from "../structures/server/Channel";
import { APIChannel } from "../typings";
import { BaseManager } from "./BaseManager";

export class ChannelManager extends BaseManager<string, Channel> {
    fetch(channelId: string): Promise<Channel | null> {
        return this.api.get<{ channel: APIChannel }>(`/channels/${channelId}`)
        .then((data) => Promise.resolve(new Channel(data.channel, this.client)))
        .catch(() => Promise.reject(null));
    };
};