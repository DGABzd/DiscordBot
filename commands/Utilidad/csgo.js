const Discord = require('discord.js'); //definiomos discord

var request = require('request');//definiomos request
var cheerio = require('cheerio');//definiomos cheerio

function getStatData(location , $){
    var selector = $('.segment-stats .value').eq(location).text();
    var stat_array = $.parseHTML(selector);
    var stat = 0;

    if(stat_array == null || stat_array.lengh == 0){
        return -1;
    }else{
        stat = stat_array[0].data;
    }

    return stat;
}  //definiomos la funcion que obtendrá los datos del usuario que nosotros le demos, por ID
module.exports = {
  name: "csgo",
  aliases: ["counterstrike"],
  category: "Utilidad",
  description: "Comando para ver la informacion de un usuario de Conuter Strke Global Offensive",
  usage: "[usuario o ID]",
  cooldown: 2,
  run: async (client, message, args, color) => {
    var UR_L = "https://tracker.gg/csgo/profile/steam/" + args[0] + "/overview"; //url donde se busca el perfil

    if(!args[0]){
        return message.channel.send("<a:no:868260948299878502> | Ingrese un STEAMID64 válido");
    } //si el argumento en 0 no es váilido retorna

    request(UR_L, function(err, resp, body){
        $ = cheerio.load(body);

        var KD = getStatData(0, $);
        if(KD == -1){
            return message.channel.send("<a:no:868260948299878502> | No válido, asegúrese de que su perfil **no sea privado** y de que haya introducido un **STEAMID64** válido!");
        } //lo que he dicho antes, busca al usuario y si no es público retorna

        var KILLS = getStatData(1, $); //buscamos las kills del usuario
        var WIN = getStatData(2, $); //buscamos las wins
        var MVP = getStatData(3, $); //buscamos la cantidad de mvp
        var HS = getStatData(4, $);  //buscamos los headshoots
        var DEATHS = getStatData(5, $); //buscamos las muerte
        var SCORE = getStatData(8, $);  //buscamos la puntuación
        var MONEY = getStatData(9, $); //buscamos el dinero
        var BS = getStatData(12, $); //buscamos bombas plantadas
        var BD = getStatData(13, $); //buscamos bombas desactivadas
        var HR = getStatData(14, $); //buscamos rehenes rescatados
        //Pruebas
        var zd = getStatData(6, $)
        var xd = getStatData(7, $)
        var ad = getStatData(10, $)
        var sd = getStatData(11, $)

        var embed = new Discord.MessageEmbed() //definimos el embed
            .setTitle("__***Estadísticas del Jugador de CSGO***__")
            .setURL(UR_L)
            .addField("cosas", `${zd} ${xd} ${ad} ${sd}`)
            .addField("Estadísticas actuales",
            "📌 ⤜ Total de KD: " + "__**" + KD + "**__" + "\n" +
            "🧮 ⤜ Porcentaje de ganancias totales: " + "__**" + WIN + "**__" + "\n" +
            "🔫 ⤜ MVPs: " + "__**" + MVP + "**__" + "\n" +
            "📊 ⤜ Puntaje total: " + "__**" + SCORE + "**__" + "\n" +
            "📂 ⤜ Asesinatos: " + "__**" + KILLS + "**__" + "\n" +
            "📜 ⤜ Muertes: " + "__**" + DEATHS + "**__" + "\n" +
            "💣 ⤜ Bombas plantadas: " + "__**" + BS + "**__" + "\n" +
            "🧨 ⤜ Bombas desactivadas: " + "__**" + BD + "**__" + "\n" +
            "📍 ⤜ Tiros a la cabeza: " + "__**" + HS + "**__" + "\n" +
            "💰 ⤜ Dinero ganado: " + "__**" + MONEY + "**__" + "\n" +
            "📉 ⤜ Rehenes rescatados: " + "__**" + HR + "**__")
            .addField("Realizado en:", `**[tracker.gg/csgo](http://tracker.gg/csgo)**`)
            .setTimestamp()
            .setColor(color);

            message.channel.send({ embeds: [embed] });
    })//enviamos el embed
}
};
