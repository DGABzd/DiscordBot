const Discord = require("discord.js");

module.exports = (client, message) => {
    const config = require("../config.json");
    if (!message.guild) return;
    if (message.author.bot) return;
    let id = client.settings.get(message.guild.id, "messages-logs") ? client.settings.get(message.guild.id, "messages-logs") : false;
    if (!id) return;
    if (!message.guild.channels.cache.find(c => c.id === client.settings.get(message.guild.id, "messages-logs")))
        return;

    const embed = new Discord.MessageEmbed()
        .setAuthor("Mensaje eliminado", message.guild.iconURL())
        .addField("Miembro", message.author.username, true)
        .addField("Contenido", message.content, true)
        .addField("Canal", `<#${message.channel.id}>`, true)
        .addField("ID del mensaje", message.id, true)
        .setThumbnail(message.author.avatarURL())
        .setColor(config.colors.negative)
        .setTimestamp()
    client.channels.cache.get(id).send({
        embeds: [embed]
    });
}