const Discord = require("discord.js");

module.exports = {
    category: "Musica",
    name: "resume",
    aliases: [""],
    description: "resume.",
    usage: "",
    cooldown: 1,
    run: async (client, message, args, color) => {
        const config = require("../../config.json")
        const queue = client.player.getQueue(message)
        if (!queue) return message.channel.send(`${config.emoji.error} | There is nothing in the queue right now!`)
        client.player.resume(message)
        message.channel.send("Resumed the song for you :)")
    },
};
