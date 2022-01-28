const Discord = require("discord.js");

module.exports = (client, oldMessage, newMessage) => {
    const config = require("../config.json");
    if(!newMessage.guild) return;
    if(newMessage.author.bot) return;
    let id = client.settings.get(newMessage.guild.id, "messages-logs") ? client.settings.get(newMessage.guild.id, "messages-logs") : false;
    if(!id) return;
    if (!message.guild.channels.cache.find(c => c.id === client.settings.get(message.guild.id, "messages-logs")))
        return;
    
    const embed = new Discord.MessageEmbed()
    .setAuthor("Mensaje Editado", newMessage.guild.iconURL())
    .addField("Miembro", newMessage.author.username, true)
    .addField("Contenido", oldMessage.content, true)
    .addField("Contenido Nuevo", newMessage.content, true)
    .addField("Canal", `<#${newMessage.channel.id}>`, true)
    .addField("ID del mensaje", newMessage.id, true)
    .setColor(config.colors.neutral)
    .setThumbnail(newMessage.author.avatarURL())
    .setTimestamp()
    client.channels.cache.get(id).send({ embeds: [embed] });
}