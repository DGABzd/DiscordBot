const Discord = require("discord.js");

module.exports = {
    category: "Musica",
    name: "skip",
    aliases: ["s"],
    description: "skip.",
    usage: "",
    cooldown: 1,
    run: async (client, message, args, color) => {
        client.player.skip(message)
    },
};