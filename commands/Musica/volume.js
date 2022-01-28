module.exports = {
    name: "volume",
    aliases: ["v", "set", "set-volume"],
    category: "Musica",
    description: "",
    usage: "<musica>",
    cooldown: 1,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const config = require("../../config.json")
        const queue = client.player.getQueue(message)
        if (!queue) return message.channel.send(`${config.emoji.error} | There is nothing in the queue right now!`)
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(`${config.emoji.error} | Please enter a valid number!`)
        client.player.setVolume(message, volume)
        message.channel.send(`${config.emoji.success} | Volume set to \`${volume}\``)
    }
}
