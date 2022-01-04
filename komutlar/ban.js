const Discord = require("discord.js");
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
const db = require("quick.db")
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args,) => {

   
    if (!message.member.roles.cache.has(ayarlar.banhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
 if (args.length < 1) return message.lineReply("Bir üye etiketle ve tekrardan dene!")
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.lineReply("Belirttiğiniz kullanıcı geçerli değil.",)
		if(user.id === message.author.id) return message.lineReply('Kendine ban atamazsın.')
        if(user.id === client.user.id) return message.lineReply('Bota ban atamazsın.')
        if(user.id === message.guild.OwnerID) return message.lineReply('Sunucu sahibine ban atamazsın.')
        if (message.guild.members.cache.has(user.id) && message.guild.members.cache.get(user.id).hasPermission("ADMINISTRATOR"))  return message.channel.send("Üst yetkiye sahip kişileri yasaklayamazsın!")
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
		let reason = args.slice(1).join(" ") || "Sebep Belirtilmedi."
	let Cezaİd = db.fetch(`Cezaİd_`) + 1;
		 db.add(`Cezaİd_`, +1);
		 db.set(`cezaBilgi_${Cezaİd}`, {
        sebep: reason,
        kod: Cezaİd,
        yetkili: message.author.id, 
        uyes: user.id,
        cezatip: "ban"
    });
    user.send(`${message.author} tarafından ${reason} sebebiyle sunucudan yasaklandın`)
		const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor("#2F3136")
            .setDescription(`<:Cezalandrld:923279133566435358> ${user} kullanıcısı  ${message.author} tarafından ${reason} sebebiyle  başarıyla sunucudan yasaklandı. (Ceza Numarası: \` ${Cezaİd}\`)`);
            await message.channel.send(embed)
			const banlandı = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setColor("#2F3136")
            .setDescription(`
            ${user ? user.toString() : user.username} üyesi banlandı!

Ceza ID: \`#${Cezaİd}\`
Banlanan Üye: ${user ? user.toString() : ""} \`  ${user.id})\`
Banlayan Yetkili: ${message.author} \` - ${message.author.id})\`
Ban Tarihi: \`${moment(Date.now()).format("LLL")}\`
Ban Sebebi: \`${reason}\`
            `)
			await client.channels.cache.get(ayarlar.banlog).send(banlandı)
			user.ban()
            message.react(ayarlar.adotik)
			  }
	exports.conf = {
    name: "ban",
    aliases: ["yargı"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'ban', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'rich <isim>',
    kategori: 'kullanıcı'
};