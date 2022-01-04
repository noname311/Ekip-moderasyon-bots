const Discord = require("discord.js");
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
const db = require("quick.db")
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args,) => {

    if (!message.member.roles.cache.has(ayarlar.banhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
 if (!args[0] || isNaN(args[0])) return  message.lineReply("Geçerli bir kişi ID'si belirtmelisin!").then(x => x.delete({timeout: 5000}));
	let reason = args.slice(1).join(" ") || "Sebep Belirtilmedi."
	let Cezaİd = db.fetch(`Cezaİd_`) + 1;
		 db.add(`Cezaİd_`, +1);
		     db.set(`cezaBilgi_${Cezaİd}`, {
        sebep: reason,
        kod: Cezaİd,
        yetkili: message.author.id, 
        uyes: user.id,
        cezatip: "unban"
    });
		const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .setDescription(`${user} kullanıcısı  ${message.author} tarafından ${reason} sebebiyle  başarıyla sunucudan yasağı kaldırıldı. (Ceza Numarası: \` ${Cezaİd}\`)`);
            await message.channel.send(embed)
			
			const banlandı = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setColor("#2F3136")
            .setDescription(`
            ${user ? user.toString() : user.username} üyesinin  banı açıldı!

Ceza ID: \`#${Cezaİd}\`
Banı kaldırılan Üye: \`${user.id})\`
Banı kaldıran Yetkili: ${message.author} \`	${message.author.id})\`
Banı kaldırma Tarihi: \`${moment(Date.now()).format("LLL")}\`
Banı kaldırma Sebebi: \`${reason}\`
            `)
            await client.channels.cache.get(ayarlar.banlog).send(banlandı)
			 message.guild.members.unban(user)
             message.react(ayarlar.adotik)
			  }
		
	exports.conf = {
    name: "unban",
    aliases: ["yargıkaldır"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'unban', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'rich <isim>',
    kategori: 'kullanıcı'
};
		
		