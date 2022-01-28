const Discord = require("discord.js");

module.exports = {
  name: "setconfessions",
  aliases: [""],
  category: "Configuracion",
  description: "Cambiar el canal de confesiones del servidor",
  usage: "<nuevo canal>",
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
    let canal = message.mentions.channels.first()
    if (!args[0]) return message.reply("¿Y el canal?");
    if (!canal){ return message.reply("<a:no:868260948299878502> Mencional un canal de texto");
    } else if (canal.isText() === false) {return message.reply("<a:no:868260948299878502> Eso no es un canal de texto");
  } else if (!canal.permissionsFor(canal.guild.me).has("MANAGE_CHANNELS")) {
    return message.reply(
      "<a:no:868260948299878502> No tengo el permiso `MANAGE_CHANNELS` en ese canal"
    );
  }
    client.settings.set(message.guild.id, canal.id, "confessions");
    message.reply("<a:yes:868260831756963861> Canal cambiado a <#" + canal.id + ">");
  },
};