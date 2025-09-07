import { Member } from "../structures/server/Member";
import { APIMember } from "../typings";
import { BaseManager } from "./BaseManager";

type MemberKey = `${string}:${string}`;

export class MemberManager extends BaseManager<MemberKey, Member> {
    fetch(serverId: string, userId: string): Promise<Member | null> {
        return this.api.get<{ member: APIMember }>(`/servers/${serverId}/members/${userId}`)
        .then((data) => Promise.resolve(new Member(data.member, serverId, this.client)))
        .catch(() => Promise.reject(null));
    };
};