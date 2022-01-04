const Discord = require("discord.js");
const db = require("quick.db")
const sicil = new db.table("cezalar");
const moment = require("moment");
const ms = require('ms');
moment.locale("tr")
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args,) => {

    if (!message.member.roles.cache.has(ayarlar.mutehammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
 if (args.length < 1) return message.lineReply("Bir üye etiketle ve tekrardan dene!")
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.lineReply("Belirttiğiniz kullanıcı geçerli değil.",)
		if(user.id === message.author.id) return message.lineReply('Kendi Muteni kaldıramazsın	.')
        if(user.id === client.user.id) return message.lineReply('Botun Mutesin kaldıramazsın.')
        if(user.id === message.guild.OwnerID) return message.lineReply('Sunucu sahibinin Mutesini kaldıramazsın.')
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
		let reason = args.slice(1).join(" ") || "Sebep Belirtilmedi."
 
 

    
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));


const mutekalktı = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(member.user.avatarURL({dynamic: true}))
            .setColor("#2F3136")
            .setDescription(`
            <:ado_cunmute:923279242622533704>  ${user ? user.toString() : user.username} üyesi'nin Chat Mutesi Kalktı!

Mutesi kaldırılan Üye: ${user ? user.toString() : ""} \`  ${user.id})\`
Mutesini kaldıran Yetkili: ${message.author} \` - ${message.author.id})\`
Chat mute kaldrıma Sebebi: \`${reason}\`
            `)
			await client.channels.cache.get(ayarlar.mutelog).send(mutekalktı)
        await user.roles.remove(ayarlar.muted)
		message.react(ayarlar.adotik)
			  }
		
		exports.conf = {
    name: "unmute",
    aliases: ["chatunyargı"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'unmute', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'rich <isim>',
    kategori: 'kullanıcı'
};