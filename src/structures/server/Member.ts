import { APIMember } from "../../typings";
import { Client } from "../Client";
import { User } from "../User";

export class Member {
    user: User;
    roleIds: number[];
    nickname?: string;
    joinedAt: Date;
    isOwner?: boolean;
    
    constructor(data: APIMember, public serverId: string, public client: Client) {
        this.user = new User(data.user, client);
        this.roleIds = data.roleIds;
        this.nickname = data.nickname;
        this.joinedAt = new Date(data.joinedAt);
        this.isOwner = data.isOwner;

        this.client.members.cache.set(`${serverId}:${this.user.id}`, this);
    };
};