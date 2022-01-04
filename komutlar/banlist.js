const Discord = require("discord.js");
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")

exports.run = async (client, message, args,) => {
        message.guild.fetchBans(true).then(banned => {
            let list = banned.map(user => `${user.user.id} | ${user.user.tag}`).join('\n');
            message.lineReply(`${list}\n\nSunucuda toplamda ${banned.size} yasaklı kullanıcı bulunmakta.`, { code: "js", split: true })
        }
        )
    }
        exports.conf = {
        name: "banlist",
        aliases: ["yargılist"],
        enabled: true,
        guildOnly: true
    };
    
    exports.help = { 
        name: 'banlist', 
        description: 'banlist.',
        usage: 'banlist',
        kategori: 'kullanıcı'
    };