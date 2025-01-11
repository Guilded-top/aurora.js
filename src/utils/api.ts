import Client from "../Client";
import Member from "../types/server/Member";
import Server from "../types/server/Server";
import User from "../types/user/User";

const base = `https://www.guilded.gg/api/v1`

const headers = (client: Client) => {
    return {
        "Authorization": `Bearer ${client.data.token}`,
    } as HeadersInit;
};

export const fetchServer = (serverId: string, client: Client): Promise<Server | null> => 
    fetch(`${base}/servers/${serverId}`, { headers: headers(client) })
    .then((res) => res.json())
    .then((json) => {
        return Promise.resolve(new Server(json, client));
    })
    .catch(() => {
        return Promise.resolve(null);
    });

export const fetchServerMember = (serverId: string, userId: string, client: Client) =>
    fetch(`${base}/servers/${serverId}/members/${userId}`, { headers: headers(client) })
    .then((res) => res.json())
    .then((json) => {
        return new Member(json, client);
    });

export const fetchUser = (userId: string) => 
    fetch(`https://www.guilded.gg/api/users/${userId}`)
    .then((res) => res.json())
    .then((json) => {
        return new User(json);
    });