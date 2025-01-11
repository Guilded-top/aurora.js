import Client from "../../Client";
import User from "../user/User";

export default class Member {
    client: Client;
    
    user: User;
    roles: number[];
    jointAt: Date;
    nickname: string | undefined;
    isOwner: boolean | undefined;
    
    constructor(data: any, client: Client) {
        this.client = client;

        this.user = data.member.user;
        this.roles = data.member.roleIds;
        this.jointAt = new Date(data.member.joinedAt);
        this.nickname = data.member.nickname;
        this.isOwner = data.member.isOwner;
    };
};