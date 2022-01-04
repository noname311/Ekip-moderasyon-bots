const Discord = require("discord.js");
const db = require("quick.db")
const sicil = new db.table("tmute");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args) => {
   if (!message.member.roles.cache.has(ayarlar.mutehammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
 if (args.length < 1) return message.channel.send("Bir üye etiketle ve tekrardan dene!")
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("Belirttiğiniz kullanıcı geçerli değil.",)
		if(user.id === message.author.id) return message.channel.send('Kendi Muteni kaldıramazsın	.')
        if(user.id === client.user.id) return message.channel.send('Botun Mutesin kaldıramazsın.')
        if(user.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibinin Mutesini kaldıramazsın.')
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
		let reason = args.slice(1).join(" ") || "Sebep Belirtilmedi."
 
 

    
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));


   const voicemutekalktı = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(member.user.avatarURL({dynamic: true}))
            .setColor("#2F3136")
            .setDescription(`
           <:ado_vunmute:927516845165133845> ${user ? user.toString() : user.username} üyesi'nin Voice Mutesi Kalktı!

Mutesi kaldırılan Üye: ${user ? user.toString() : ""} \`  ${user.id})\`
Mutesini kaldıran Yetkili: ${message.author} \` - ${message.author.id})\`
Voice mute kaldrıma Sebebi: \`${reason}\`
            `)
		await client.channels.cache.get(ayarlar.mutelog).send(voicemutekalktı)
	






   
    db.delete(`voiceCehck_${user.id}`)
    if(user.voice.channel) user.voice.setMute(false);


    message.react(ayarlar.adotik)
 }

	exports.conf = {
    name: "vunmute",
    aliases: ["voiceunyargı"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'vunmute', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'rich <isim>',
    kategori: 'kullanıcı'
};
