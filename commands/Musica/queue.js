const Discord = require("discord.js");

module.exports = {
    category: "Musica",
    name: "queue",
    aliases: ["q"],
    description: "queue.",
    usage: "",
    cooldown: 1,
    run: async (client, message, args, color) => {
        const queue = client.player.getQueue(message)
		if (!queue) {
			message.channel.send('¡Nada sonando ahora mismo!')
		} else {
			const embed = new Discord.MessageEmbed()
			.setTitle("Lista de Reproduccion")
			.setDescription(`${queue.songs
				.map((song, id) => `${id ? `\`${id}.\` ${song.name} - \`${song.formattedDuration}\`` : `__Ahora Sonando:__ ${song.name} - \`${song.formattedDuration}\``}\n`,)
				.slice(0, 10)
				.join('\n')}`,)
			.setColor(color)
        message.channel.send({ embeds:[embed] });
		}
    },
};
