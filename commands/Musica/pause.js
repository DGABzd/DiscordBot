const Discord = require("discord.js");

module.exports = {
    category: "Musica",
    name: "pause",
    aliases: [""],
    description: "pause.",
    usage: "",
    cooldown: 1,
    run: async (client, message, args, color) => {
        const config = require("../../config.json")
        const queue = client.player.getQueue(message)
        if (!queue) return message.channel.send(`${config.emoji.error} | There is nothing in the queue right now!`)
        if (queue.pause) {
            client.player.resume(message)
            return message.channel.send("Resumed the song for you :)")
        }
    
        client.player.pause(message)
        message.channel.send("Paused the song for you :)")
    },
};
