import { WebSocket } from "ws";
import Events from "./types/Events";
import Message from "./types/server/Message";
import Server from "./types/server/Server";
import Member from "./types/server/Member";
import { fetchServer, fetchUser } from "./utils/api";
import Channel from "./types/server/Channel";
import { version } from "../package.json";

type botData = { 
    token: string;
}

export default class Client {
    
    data: botData;
    socket: WebSocket | null;
    events: Map<string, Function[]>;
    ready: Boolean = false;

    botId: string | undefined;


    constructor(data: botData) {
        this.data = data;
        this.socket = null;
        this.events = new Map();
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
                    const member = new Member(eventData, this);
                    const server = fetchServer(eventData.serverId, this);

                    this.events.get(Events.ServerMemberJoined)?.forEach((callback) => {
                        callback(member, server);
                    });
                    break;
                }

                case Events.ServerMemberRemoved: {
                    const { serverId, userId, isKick, isBan } = eventData;
                    const server = fetchServer(serverId, this);
                    const user = fetchUser(userId);
                    
                    this.events.get(Events.ServerMemberRemoved)?.forEach((callback) => {
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
