const Discord = require("discord.js");

module.exports = {
  name: "setprefix",
  aliases: [""],
  category: "Configuracion",
  description: "Cambiar el prefix del bot en el servidor",
  usage: "<nuevo prefix>",
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
    if (!args[0]) return message.reply("¿Y el prefix?");
    client.settings.set(message.guild.id, args.join(" "), "prefix");
    message.reply("Prefix cambiado a `" + args.join(" ") + "`");
  },
};