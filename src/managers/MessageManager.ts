import { Embed } from "../structures/message/Embed";
import { Message } from "../structures/message/Message";
import { APIEmbed, APIMessage } from "../typings";
import { BaseManager } from "./BaseManager";

export type CreateMessageOptions = {
    isPrivate?: boolean;
    isSilent?: boolean;
    replyMessageIds?: string[];
    content?: string;
    hiddenLinkPreviewUrls?: string[];
    embeds?: Embed[] | APIEmbed[];
};

export class MessageManager extends BaseManager<string, Message> {
    create(channelId: string, body: CreateMessageOptions): Promise<Message | null> {
        let normalizedBody = { ...body };

        if (body.embeds) {
            normalizedBody.embeds = body.embeds.map(
                (embed) => embed instanceof Embed ? embed.toJSON() : embed
            );
        };

        return this.api.post<{ message: APIMessage }>(`/channels/${channelId}/messages`, normalizedBody)
        .then((data) => Promise.resolve(new Message(data.message, this.client)))
        .catch(() => Promise.reject(null));
    };
};