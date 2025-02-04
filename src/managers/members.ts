import Client from "../Client";
import Member from "../types/server/Member";
import { request } from "../utils/api";

type ServerMemberKey = {
    serverId: string;
    userId: string;
};

export default class MembersManager {
    cache: Map<ServerMemberKey, Member> = new Map();

    constructor(public client: Client) {};

    fetch({ serverId, userId }: ServerMemberKey): Promise<Member | null> {
        return request(`/servers/${serverId}/members/${userId}`, this.client)
        .then((data) => Promise.resolve(new Member(data, serverId, this.client)))
        .catch(() => Promise.reject(null));
    };
};