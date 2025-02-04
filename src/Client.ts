import { WebSocket } from "ws";
import Events from "./types/Events";
import Message from "./types/server/Message";
import Server from "./types/server/Server";
import Member from "./types/server/Member";
import { fetchUser } from "./utils/api";
import Channel from "./types/server/Channel";
import { version } from "../package.json";
import ServersManager from "./managers/servers";
import ChannelsManager from "./managers/channels";
import MembersManager from "./managers/members";

type botData = { 
    token: string;
}

export default class Client {
    data: botData;
    socket: WebSocket | null;
    events: Map<string, Function[]>;
    ready: Boolean = false;

    botId: string | undefined;

    servers: ServersManager;
    channels: ChannelsManager;
    members: MembersManager;

    constructor(data: botData) {
        this.data = data;
        this.socket = null;
        this.events = new Map();

        this.servers = new ServersManager(this);
        this.channels = new ChannelsManager(this);
        this.members = new MembersManager(this);
    }

    login() {
        this.socket = new WebSocket("wss://www.guilded.gg/websocket/v1", {
            headers: {
                "authorization": `Bearer ${this.data.token}`,
                "User-Agent": `@guilded.top/aurora.js@${version}`,
            },
        });

        this.socket.on("message", (data) => {
            const event = JSON.parse(data.toString());
            const { t: eventType, d: eventData } = event;

            if (!eventType && !this.ready) {
                this.ready = true;

                this.events.get(Events.Ready)?.forEach((callback) => {
                    callback();
                }); 
                return;
            }

            switch (eventType) {
                case Events.BotServerMembershipCreated: {
                    const server = new Server(eventData, this);
                    const { createdBy: createdById } = eventData;

                    this.events.get(Events.BotServerMembershipCreated)?.forEach((callback) => {
                        callback(server, createdById);
                    });
                    break;
                }

                case Events.BotServerMembershipDeleted: {
                    const server = new Server(eventData, this);
                    const { deletedBy: deletedById } = eventData;

                    this.events.get(Events.BotServerMembershipDeleted)?.forEach((callback) => {
                        if (this.servers.cache.get(server.id)) this.servers.cache.delete(server.id);
                        callback(server, deletedById);
                    });
                    break;
                }

                case Events.ChatMessageCreated: {
                    const message = new Message(eventData, this);
                    this.events.get(Events.ChatMessageCreated)?.forEach((callback) => {
                        callback(message);
                    });
                    break;
                }

                case Events.ChatMessageDeleted: {
                    const message = new Message(eventData, this);
                    this.events.get(Events.ChatMessageDeleted)?.forEach((callback) => {
                        callback(message);
                    });
                    break;
                }

                case Events.ChatMessageUpdated: {
                    const message = new Message(eventData, this);
                    this.events.get(Events.ChatMessageUpdated)?.forEach((callback) => {
                        callback(message);
                    });
                    break;
                }

                case Events.ServerMemberJoined: {
                    const member = new Member(eventData, eventData.serverId, this);
                    const server = this.servers.fetch(eventData.serverId);

                    this.events.get(Events.ServerMemberJoined)?.forEach((callback) => {
                        callback(member, server);
                    });
                    break;
                }

                case Events.ServerMemberRemoved: {
                    const { serverId, userId, isKick, isBan } = eventData;
                    const server = this.servers.fetch(eventData.serverId);
                    const user = fetchUser(userId);
                    
                    this.events.get(Events.ServerMemberRemoved)?.forEach((callback) => {
                        if (this.members.cache.get({ serverId, userId })) 
                            this.members.cache.delete({ serverId, userId});
                        callback(user, server, isKick, isBan);
                    });
                    break;
                }

                case Events.ServerChannelCreated: {
                    const channel = new Channel(eventData, this);
                    this.events.get(Events.ServerChannelCreated)?.forEach((callback) => {
                        callback(channel);
                    });
                    break;
                }

                case Events.ServerChannelUpdated: {
                    const channel = new Channel(eventData, this);
                    this.events.get(Events.ServerChannelUpdated)?.forEach((callback) => {
                        callback(channel);
                    });
                    break;
                }

                case Events.ServerChannelDeleted: {
                    const channel = new Channel(eventData, this);
                    this.events.get(Events.ServerChannelDeleted)?.forEach((callback) => {
                        if (this.channels.cache.get(channel.id))
                            this.channels.cache.delete(channel.id);
                        callback(channel);
                    });
                    break;
                }

                default: {
                    console.log(`Unknown event: ${eventType}`);
                    console.log(eventData);
                    break;
                }
            }
        });
    }


    on(event: string | Events, callback: Function) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }

        this.events.get(event)?.push(callback);
    }

}
