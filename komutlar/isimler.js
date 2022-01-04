const db = require('quick.db');
const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args,) => {

    if (!message.member.roles.cache.has(ayarlar.registerhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
           
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(new MessageEmbed())
        let isimler = db.get(`isimler_${member.user.id}`);
        if (!isimler) return message.channel.send("Bu Kullanıcı Daha Önce Hiç Kayıt Olmamış")
        const embed = new MessageEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .setColor('#2F3136')
            .setTitle("Kullanıcının Eski İsimleri")
            .setDescription(isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n") + ``)
        message.channel.send(embed)
    }
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["isimler"],
    permLevel: 0
};

exports.help = {
    name: "isimler"
};