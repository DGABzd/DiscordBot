const { readdirSync } = require('fs');
const ascii = require('ascii-table')
const chalk = require('chalk');
let table = new ascii("Comandos");
table.setHeading('Categoria', 'Comando', ' Status de Carga');
module.exports= (client) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name && pull.description && pull.category){
                client.commands.set(pull.name, pull);
                table.addRow(dir, file,'✅')
            }else if (!pull.name){
                table.addRow(dir, file, '❌ -> Pierdo a help.name, o help.name es un string.')
                continue;
            }else if (!pull.description){
                table.addRow(dir, file, '❌ -> Pierdo a help.description, o help.description es un string.');
            }else if (!pull.category){
                table.addRow(dir, file, '❌ -> Pierdo a help.category, o help.category es un string.');
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    console.log(table.toString());
}