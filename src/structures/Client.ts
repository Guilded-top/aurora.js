import { WebSocket } from "ws";
import { name, version } from "../../package.json";
import { Events } from "../typings";
import { Message } from "./message/Message";
import { APIMessage } from "../typings";
import { Server } from "./server/Server";
import { APIChannel, APIServer } from "../typings";
import { ServerManager } from "../managers/ServerManager";
import { Channel } from "./server/Channel";
import { ChannelManager } from "../managers/ChannelManager";
import { MessageManager } from "../managers/MessageManager";
import { API } from "../utils/api";
import { MemberManager } from "../managers/MemberManager";

type BotData = {
    token: string;
};

export class Client {
    public ready: boolean = false;
    public readyAt: Date | null = null;
    public botId?: string;
    events: Map<string, Function[]>;
    socket: WebSocket | null = null;
    api: API;

    servers: ServerManager;
    channels: ChannelManager;
    messages: MessageManager;
    members: MemberManager;

    constructor(public data: BotData) {
        this.events = new Map();
        this.api = new API(this);
        
        this.servers = new ServerManager(this);
        this.channels = new ChannelManager(this);
        this.messages = new MessageManager(this);
        this.members = new MemberManager(this);
    };

    login() {
        this.socket = new WebSocket("wss://www.guilded.gg/websocket/v1", {
            headers: {
                "Authorization": `Bearer ${this.data.token}`,
                "User-Agent": `${name}@${version}`,
            },
        });

        this.socket.on("message", (data) => {
            const event = JSON.parse(data.toString());
            const { op, t: eventType, d: eventData } = event;

            if (op === 0) {
                this.handleEvent(eventType, eventData);
            } else if (op == 1) {
                this.ready = true;
                this.readyAt = new Date();
                this.botId = eventData.botId;

                this.emit(Events.Ready);
            };
        });
    };

    private handleEvent(type: string, data: any) {
        switch (type) {
            case Events.BotServerMembershipCreated: {
                const server = new Server(data.server as APIServer, this);
                this.emit(Events.BotServerMembershipCreated, server, data.createdBy);
                break;
            }
            case Events.BotServerMembershipDeleted: {
                const server = new Server(data.server as APIServer, this);
                this.emit(Events.BotServerMembershipDeleted, server, data.deletedBy);
                break;
            }
            
            case Events.ChatMessageCreated:
            case Events.ChatMessageUpdated:
            case Events.ChatMessageDeleted: {
                const message = new Message(data.message as APIMessage, this);
                this.emit(type, message);
                break;
            }

            case Events.ServerChannelCreated:
            case Events.ServerChannelUpdated:
            case Events.ServerChannelDeleted:
                const channel = new Channel(data.message as APIChannel, this);
                this.emit(type, channel);
                break;
        };
    };

    on(event: string | Events, callback: Function) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event)?.push(callback);
    };
    
    private emit(event: Events, ...data: any) {
        this.events.get(event)?.forEach((callback) => callback(...data));
    };
};