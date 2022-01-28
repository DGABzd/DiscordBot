const Discord = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["latency"],
  category: "Info",
  description: "Comando para ver el ping",
  usage: "ping",
  cooldown: 1,
  run: async (client, message, args, color) => {
    let ping = Math.floor(client.ws.ping);

    message.channel
      .send(":ping_pong: Pong!")

      .then((m) => {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `:incoming_envelope: Envío de mensajes  **${parseInt(
              m.createdTimestamp,
              6
            )} ms** \n:satellite_orbital: Ping DiscordAPI: **${ping} ms**`
          )
          .setColor(color);
          message.channel.send({ embeds: [embed] });
      });
  },
};
