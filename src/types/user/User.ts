
export default class User {

    id: string;
    type: string;
    name: string;
    banner: string;
    avatar: string;
    jointAt: Date;

    botId: string | undefined;
    createdBy: string | undefined;

    constructor(data: any) {
        this.id = data.user.id;
        this.type = data.user.type;
        this.name = data.user.name;
        this.avatar = data.user.profilePicture;
        this.banner = data.user.profileBannerLg;
        this.jointAt = new Date(data.user.joinDate);

        this.botId = data.user.botId;
        this.createdBy = data.user.createdBy;
    }


}