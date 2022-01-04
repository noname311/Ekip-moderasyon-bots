const Discord = require("discord.js")


exports.run = async (client, message, args) => {
    let user = args.length > 0 ? message.mentions.users.first() || await this.client.users.fetch(args[0]) || message.author : message.author
    message.lineReply(`**${user.tag}** ${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
}
  
exports.conf = {
    name: "avatar",
    aliases: ["avatar"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'avatar', 
    description: 'İstediğiniz kullanıcının avatarını verir.',
    usage: 'avatar <isim>',
    kategori: 'kullanıcı'
};