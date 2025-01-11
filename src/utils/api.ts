import Client from "../Client";
import Server from "../types/server/Server";
import User from "../types/user/User";

const base = `https://www.guilded.gg/api/v1`

const headers = (client: Client) => {
    return {
        "Authorization": `Bearer ${client.data.token}`,
    } as HeadersInit;
};

export const fetchServer = (serverId: string, client: Client) => 
    fetch(`${base}/servers/${serverId}`, { headers: headers(client) })
    .then((res) => res.json())
    .then((json) => {
        return new Server(json, client);
    });

export const fetchUser = (userId: string) => 
    fetch(`https://www.guilded.gg/api/users/${userId}`)
    .then((res) => res.json())
    .then((json) => {
        return new User(json);
    });