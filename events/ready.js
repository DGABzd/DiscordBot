module.exports = (client) => {
    const config = require("../config.json");
    const prefix = config.prefix;
    client.user.setPresence( 
        {
        status: "online", 
        activities: [{ 
            name: `${prefix}help | v1.3.1 Beta`, 
            url: null,
            type: "PLAYING"
            }]
        }
    );
};