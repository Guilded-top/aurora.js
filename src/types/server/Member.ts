import Client from "../../Client";
import User from "../user/User";
import Role from "./Role";

export default class Member {
    client: Client;
    _roles: Role[];
    
    user: User;
    roleIds: number[];
    jointAt: Date;
    nickname: string | undefined;
    isOwner: boolean | undefined;
    
    constructor(data: any, client: Client) {
        this.client = client;

        this.user = data.member.user;
        this.roleIds = data.member.roleIds;
        this.jointAt = new Date(data.member.joinedAt);
        this.nickname = data.member.nickname;
        this.isOwner = data.member.isOwner;
    };
};