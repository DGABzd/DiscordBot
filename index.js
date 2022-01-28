const {
  MessageEmbed,
  Collection,
  Client,
  Intents,
  Discord
} = require("discord.js");
let Enmap = require("enmap");
const chalk = require("chalk");
const fs = require("fs");
const myIntents = new Intents();
myIntents.add(32767);
const client = new Client({
  intents: myIntents
});
const config = require("./config.json");

client.settings = new Enmap({
  name: "settings",
  fetchAll: true,
  autoEnsure: {
    prefix: config.prefix,
  },
});

client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});

for (const file of fs.readdirSync('./events/')) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);
    let fileContents = require(`./events/${file}`);
    client.on(fileName, fileContents.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  }
}

client.login(config.token).then(() => {
  console.log(chalk.cyan(`${client.user.username} Listo ✅`))
}).catch((err) => {
  console.error("Error al iniciar sesión: " + err);
});