const Discord = require("discord.js");
const db = require("quick.db")
const sicil = new db.table("tmute");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format")
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
    if (!message.member.roles.cache.has(ayarlar.jailhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
 if (args.length < 1) return message.lineReply("Bir üye etiketle ve tekrardan dene!")
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.lineReply("Belirttiğiniz kullanıcı geçerli değil.",)
		if(user.id === message.author.id) return message.lineReply('Kendi Jailini kaldıramazsın	.')
        if(user.id === client.user.id) return message.lineReply('Botun Jailini kaldıramazsın.')
        if(user.id === message.guild.OwnerID) return message.lineReply('Sunucu sahibinin Jailini kaldıramazsın.')
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
		let reason = args.slice(1).join(" ") || "Sebep Belirtilmedi."
 
 

    
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

    db.add(`jailKaldırma.${message.member.id}`, 1)
   
    const voicemutekalktı = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(member.user.avatarURL({dynamic: true}))
            .setColor("32CD32")
            .setDescription(`
            ${user ? user.toString() : user.username} üyesi'nin Jail'i Kalktı!

Jail kaldırılan Üye: ${user ? user.toString() : ""} \`  ${user.id})\`
Jail'ini kaldıran Yetkili: ${message.author} \` - ${message.author.id})\`
Jail kaldrıma Sebebi: \`${reason}\`
            `)
		await client.channels.cache.get(ayarlar.jaillog).send(voicemutekalktı)

    db.delete(`jaill.${user.id}`) //KALICI JAİL KOMUTU
    let eskiRolles = await db.get(`jailRoles.${user.id}`);
    await user.roles.set(eskiRolles).catch(e => { });
    message.react(ayarlar.adotik)
			  }
		exports.conf = {
    name: "unjail",
    aliases: ["jailunyargı"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'unjail', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'rich <isim>',
    kategori: 'kullanıcı'
};