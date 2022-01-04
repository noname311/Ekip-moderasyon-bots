const Discord = require("discord.js");
const db = require("quick.db")
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args,) => {

if(!message.member.roles.cache.has() && !message.member.hasPermission("ADMINISTRATOR")) return
let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!user) return message.channel.send("Belirttiğiniz kullanıcı geçerli değil.",)
if (!db.get(`${user.id}_sicil`)) return message.channel.send("bu kullanıcı hiç işlem görmedi.");
var sicil = db.get(`${user.id}_sicil`).map((data, index) => `\`${index+1}.\` ${data}`).join("\n")
        const embed = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setDescription(`${user} Adlı kullanıcının sicili:\n${sicil}`)
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
        return message.channel.send(embed)
    }



exports.conf = {
    guildOnly: true,
    aliases: ["sicil"],
    permLevel: 0
};

exports.help = {
    name: "geçmiş",
};