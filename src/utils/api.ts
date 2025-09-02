import { Client } from "../structures/Client";
import { name, version } from "../../package.json";

const base = "https://www.guilded.gg/api/v1";

/** https://www.guilded.gg/docs/api/http_methods */
enum Method {
    Get = "GET",
    Head = "HEAD",
    Post = "POST",
    Put = "PUT",
    Patch = "PATCH",
    Delete = "DELETE",
};

export class API {
    constructor(public client: Client) {};

    async get<T>(path: string): Promise<T> {
        return this.request<T>(path, Method.Get);
    };

    async post<T, D = unknown>(path: string, body?: D): Promise<T> {
        return this.request<T>(path, Method.Post, body);
    };

    async put<T, D>(path: string, body?: D): Promise<T> {
        return this.request<T>(path, Method.Put, body);
    };

    async patch<T, D>(path: string, body: D): Promise<T> {
        return this.request<T>(path, Method.Patch, body);
    };

    async delete<T = unknown>(path: string): Promise<T | null> {
        return this.request<T>(path, Method.Delete);
    };

    async request<T, D = unknown>(path: string, method: Method, body?: D): Promise<T> {
        console.log(method, path);
        const response = await fetch(base + path, {
            method,
            headers: {
                Authorization: `Bearer ${this.client.data.token}`,
                "User-Agent": `${name}@${version}`,
                "Content-Type": "application/json",
            },
            body: body && method !== Method.Get ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) throw new Error("Response was not OK.");
        if (response.status === 204) return null as T;

        return response.json() as Promise<T>;
    };
};