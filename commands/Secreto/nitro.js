const Discord = require("discord.js");

module.exports = {
  name: "nitro",
  aliases: [""],
  category: "secreto",
  description: "Amogus",
  usage: "zd",
  run: async (client, message, args, color) => {
    if (message.author.id !== "615254840586797067") {
      let embed = new Discord.MessageEmbed()
        .setDescription(
          "Mmm, no tienes los permisos suficientes para hacer esto"
        );
      message.channel.send({ embeds: [embed] });
      return 0;
    }
    
    let lista = ["1234567"]
    message.guild.members.members.cache.map(a => a.id)
    lista.push(a)
    console.log(lista.size())
  },
};
