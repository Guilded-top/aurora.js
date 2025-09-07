import { Client } from "../structures/Client";
import { API } from "../utils/api";

export class BaseManager<K, T> {
    api: API;
    public cache: Map<K, T> = new Map();

    constructor(public client: Client) {
        this.api = client.api;
    };
};