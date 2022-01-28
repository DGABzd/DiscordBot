const {
    Collection
} = require("discord.js");

module.exports = async (client, message) => {
    const config = require("../config.json");
    const color = config.color;
    const prefix = client.settings.get(message.guild.id, "prefix");

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member)
        message.member = await message.guild.fetchMember(message);
    const args = message.content
        .slice(client.settings.get(message.guild.id, "prefix").length)
        .trim()
        .split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (!command) return;

    const {
        cooldowns
    } = client;

    if (command && !cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message
                .reply(
                    `Por Favor Espera ${timeLeft.toFixed(
                1
            )} segundo(s) para volver a usar el comando \`${command.name}\`.`
                )
                .then((m) => {
                    setTimeout(() => {
                        m.delete();
                    }, command.cooldown * 1000);
                });
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    if (command) command.run(client, message, args, color, prefix);
}