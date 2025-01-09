import ChatEmbed from "../types/ChatEmbed";

export default class EmbedBuilder {

    embed: any;

    constructor() {
        this.embed = {}
    }

    public setTitle(title: string): EmbedBuilder {
        this.embed.title = title;
        return this;
    }

    public setDescription(description: string): EmbedBuilder {
        this.embed.description = description;
        return this;
    }

    public setUrl(url: string): EmbedBuilder {
        this.embed.url = url;
        return this;
    }

    public setColor(color: number): EmbedBuilder {
        this.embed.color = color;
        return this;
    }

    public setTimestamp(timestamp: Date): EmbedBuilder {
        this.embed.timestamp = timestamp;
        return this;
    }

    public setThumbnail(url: string): EmbedBuilder {
        this.embed.thumbnail.url = url;
        return this;
    }

    public setImage(url: string): EmbedBuilder {
        this.embed.image.url = url;
        return this;
    }

    public setFooter(text: string, icon_url: string): EmbedBuilder {
        this.embed.footer.text = text;
        this.embed.footer.icon_url = icon_url;
        return this;
    }

    public setAuthor(name: string, url: string, icon_url: string): EmbedBuilder {
        this.embed.author.name = name;
        this.embed.author.url = url;
        this.embed.author.icon_url = icon_url;
        return this;
    }

    public addField(name: string, value: string, inline: boolean): EmbedBuilder {
        if (!this.embed.fields) this.embed.fields = [];
        this.embed.fields.push({
            name: name,
            value: value,
            inline: inline
        });
        return this;
    }

    public build(): ChatEmbed {
        return this.embed;
    }

}