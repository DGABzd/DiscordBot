const Discord = require("discord.js");

module.exports = {
    category: "Musica",
    name: "play",
    aliases: ["p"],
    description: "Reproduce una cancion o agrega una a la lista de reproduccion.",
    usage: "<nombre | link>",
    cooldown: 1,
    run: async (client, message, args, color) => {
        const config = require("../../config.json")
        if (!message.member.voice.channel)
            return message.reply(config.emoji.error + "Deves estar en un canal de voz");
            const permissions = voiceChannel.permissionsFor(message.client.user)
        if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) { 
            return message.channel.send('No tengo permisos para conectarme al canal de voz o hablar')}
        if(client.voice.adapters.get(message.guild.id) && message.member.voice.channel && message.member.voice.channel.id !== client.voice.connections.get(message.guild.id).channel.id) {
            return message.channel.send('Debes estar en el mismo canal de voz en el que me encuentro!')
        }
        const query = args.join("");
        if (!query) return message.reply(config.emoji.error + "Debes introducir el nombre de la cancion o el url de esta.")
        message.channel.send("**Buscando** `" + query + "`")
        await client.player.play(message, query);
    },
};
