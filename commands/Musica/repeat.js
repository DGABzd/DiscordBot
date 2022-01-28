const Discord = require("discord.js");

module.exports = {
    category: "Musica",
    name: "resume",
    aliases: ["loop"],
    description: "resume.",
    usage: "",
    cooldown: 1,
    run: async (client, message, args, color) => {
        const config = require("../../config.json")
        const queue = client.player.getQueue(message)
        if (!queue) return message.channel.send(`${config.emoji.error} | There is nothing playing!`)
        let mode = null
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        mode = client.player.setRepeatMode(message)
        mode = mode ? mode === 2 ? "Repeat queue" : "Repeat song" : "Off"
        message.channel.send(`Set repeat mode to \`${mode}\``)
    },
};