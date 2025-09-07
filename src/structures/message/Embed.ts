import { APIEmbed, APIEmbedAuthor, APIEmbedField, APIEmbedFooter, APIEmbedImage, APIEmbedThumbnail } from "../../typings";

export class Embed {
    title?: string;
    description?: string;
    url?: string;
    color?: number;
    footer?: APIEmbedFooter;
    timestamp?: Date;
    thumbnail?: APIEmbedThumbnail;
    image?: APIEmbedImage;
    author?: APIEmbedAuthor;
    fields?: APIEmbedField[];

    constructor(data?: APIEmbed) {
        if (data) {
            this.title = data.title;
            this.description = data.description;
            this.url = data.url;
            this.color = data.color;
            this.footer = data.footer;
            this.timestamp = this.timestamp ? new Date(this.timestamp) : undefined;
            this.thumbnail = data.thumbnail;
            this.image = data.image;
            this.author = data.author;
            this.fields = data.fields || [];
        };
    };

    setTitle(title: string) {
        this.title = title;
        return this;
    };

    setDescription(description: string) {
        this.description = description;
        return this;
    };

    setURL(url: string) {
        this.url = url;
        return this;
    };

    setColor(color: number) {
        this.color = color;
        return this;
    };

    setFooter(footer: APIEmbedFooter) {
        this.footer = footer;
        return this;
    };

    setTimestamp(timestamp: Date | string) {
        this.timestamp = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
        return this;
    };

    setThumbnail(thumbnail: string | APIEmbedThumbnail) {
        this.thumbnail = typeof thumbnail === "string" ? { url: thumbnail } : thumbnail;
        return this;
    };

    setImage(image: string | APIEmbedImage) {
        this.image = typeof image === "string" ? { url: image } : image;
        return this;
    };

    setAuthor(author: APIEmbedAuthor) {
        this.author = author;
        return this;
    };

    setFields(fields: APIEmbedField[]) {
        this.fields = fields;
        return this;
    };

    addFields(fields: APIEmbedField[]) {
        this.fields = { ...this.fields, ...fields };
        return this;
    };

    addField(field: APIEmbedField) {
        this.fields?.push(field);
        return this;
    };

    toJSON() {
        return {
            title: this.title,
            description: this.description,
            url: this.url,
            color: this.color,
            footer: this.footer,
            timestamp: this.timestamp,
            thumbnail: this.thumbnail,
            image: this.image,
            author: this.author,
            fields: this.fields,
        } as APIEmbed;
    };
};