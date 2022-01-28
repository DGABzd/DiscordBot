const Discord = require("discord.js");

module.exports = {
  name: "setlogs",
  aliases: [""],
  category: "Configuracion",
  description: "Esteblece el canal de registro",
  usage: "<canal>",
  cooldown: 5,
  run: async (client, message, args, color) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
      return message.channel
        .send("No tienes permisos para usar este comando")
        .then((m) => {
          setTimeout(() => {
            m.delete();
          }, 3000);
        });
    let canal = message.mentions.channels.first();
    if (!args[0]) return message.reply("¿Y el canal?");
    if (!canal) {
      return message.reply(
        "<a:no:868260948299878502> Mencional un canal de texto"
      );
    } else if (canal.isText() === false) {
      return message.reply(
        "<a:no:868260948299878502> Eso no es un canal de texto"
      );
    } else if (!canal.permissionsFor(canal.guild.me).has("SEND_MESSAGES")) {
      return message.reply(
        "<a:no:868260948299878502> No tengo el permiso `SEND_MESSAGES` en ese canal"
      );
    } else if (!canal.permissionsFor(canal.guild.me).has("EMBED_LINKS")) {
        return message.reply(
          "<a:no:868260948299878502> No tengo el permiso `EMBED_LINKS` en ese canal"
        );
      }
    client.settings.set(message.guild.id, canal.id, "logs");
    message
      .reply("<a:yes:868260831756963861> Canal cambiado a <#" + canal.id + ">")
      .then((m) => { 
        let embed = new Discord.MessageEmbed()
        .setAuthor(`Canal de Registro Cambiado`, client.user.avatarURL())
        .addField(`Nuevo Canal de Registro:`, `<#${client.settings.get(message.guild.id, "logs")}>`)
        .addField(`Autor:`, message.author.username)
        .setTimestamp()
        .setColor(color)
        client.channels.cache.get(client.settings.get(message.guild.id, "logs")).send({ embeds: [embed] });
    });

  },
};