const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  ButtonInteraction,
  Message,
} = require("discord.js");
let Enmap = require("enmap");

module.exports = {
  name: "id",
  aliases: [""],
  category: "secreto",
  description:
    "Comando para agregar una id para prohibirla del uso del comando reportbug",
  usage: "<id>",
  run: async (client, message, args, color) => {
    if (message.author.id !== "615254840586797067") {
      let embed = new MessageEmbed().setDescription(
        "Mmm, no tienes los permisos suficientes para hacer esto"
      );
      message.channel.send({ embeds: [embed] });
      return 0;
    }
    myEnmap = new Enmap({
      name: "ProhibidosArray",
    });
    myEnmap.set("ProhibidosArray", myEnmap.get("ProhibidosArray"));

    if (!args[0])
      return message.channel.send(
        "Opciones: `add` (Añadir una Id) o `remove` (Remover una Id)"
      );
    let Options = ["add", "remove"];
    if (!Options.includes(args[0].toLowerCase()))
      return message.channel.send(":x: Opcion incorrecta!");
    let args1 = args.slice(1).join(" ");

    if (args[0] == "add") {
      if (!args1) return message.reply("Cual sera la nueva Id para Prohibir");
      message.channel.send(`Nueva Id Prohibida: ${args1}`).then((m) => {
        myEnmap.push("ProhibidosArray", args1);
      });
    } else if (args[0] == "remove") {
      if (!args1) return message.reply("Cual sera la Id para eliminar");
      message.channel.send(`Id Eliminada: ${args1}`).then((m) => {
        myEnmap.remove("ProhibidosArray", args1);
      });
    }
  },
};
