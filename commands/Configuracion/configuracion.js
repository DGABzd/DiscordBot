const Discord = require("discord.js");
let Enmap = require("enmap");

module.exports = {
  name: "configuracion",
  aliases: ["config", "configuración"],
  category: "Configuracion",
  description: "Iformacion sobre la configuracion del Servidor",
  usage: "",
  cooldown: 1,
  run: async (client, message, args, color) => {
    const config = require("../../config.json");
    const prefix = config.prefix;
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Configuración`, client.user.avatarURL())
      .setDescription("Esta es la configuración actual del servidor.")
      .addField(
        "<:channels:877557232483565568> Canales",
        `**Confesiones:** ${
          client.settings.get(message.guild.id, "confessions")
            ? `<#${client.settings.get(message.guild.id, "confessions")}>`
            : "No está configurado."
        }\n**Registro: ${
          client.settings.get(message.guild.id, "logs")
            ? `<#${client.settings.get(message.guild.id, "logs")}>`
            : "No está configurado."
        }\n**Registro de Mensajes: ${
          client.settings.get(message.guild.id, "message-logs")
            ? `<#${client.settings.get(message.guild.id, "message-logs")}>`
            : "No está configurado."
        }`,
        true
      )
      .addField(
        "🛠️ Otros ",
        `**Prefix:** ${
          client.settings.get(message.guild.id, "logs")
            ? `<#${client.settings.get(message.guild.id, "logs")}>`
            : `${prefix}`
        }`,
        true
      )
      .setFooter(
        `Informacion del solicitada por ${message.author.username}`,
        message.author.avatarURL
      )
      .setTimestamp()
      .setColor(color);

    message.channel.send({ embeds: [embed] });
  },
};
