
type EmbedField = { 
    name: string,
    value: string,
    inline: boolean
};

export default interface ChatEmbed {

    title: string | undefined;
    description: string | undefined;
    url: string | undefined;
    color: number | undefined;
    timestamp: Date | undefined;

    thumbnail: {
        url: string | undefined;
    };

    image: {
        url: string | undefined;
    };

    footer: {
        text: string | undefined;
        icon_url: string | undefined;
    };

    author: {
        name: string | undefined;
        url: string | undefined;
        icon_url: string | undefined;
    };

    fields: EmbedField[] | undefined;

}
