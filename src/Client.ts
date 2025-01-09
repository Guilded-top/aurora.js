import { WebSocket } from "ws";
import Events from "./types/Events";
import Message from "./types/server/Message";

type botData = { 
    token: string,
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
                "user-agent": "MelonApi"
            }       
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
