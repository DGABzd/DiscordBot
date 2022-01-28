const Discord = require("discord.js");

module.exports = {
    category: "Musica",
    name: "stop",
    aliases: [""],
    description: "sus?",
    usage: "",
    cooldown: 1,
    run: async (client, message, args, color) => {
        if (!message.member.voice.channel)
            return message.reply("Por Favor Unete a un canal de voz!");
        client.player.stop(message)
        message.channel.send('Stopped the music!')
    },
};
