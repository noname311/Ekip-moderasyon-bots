const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../ayarlar.json')
require("moment-duration-format");

exports.run = async (client, message, args) => {
    let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Mutsuz Adoş").setColor("#2F3136");
    if(!message.member.roles.cache.has(ayarlar.mutehammer))
    if(!message.member.roles.cache.has(ayarlar.jailhammer))
    if(message.author.id !== "719458133617147986")  return  message.react(ayarlar.adored);




    let CezaID = args[0]
    if(!CezaID || isNaN(CezaID)) return message.channel.send(embed.setDescription(`${message.member} lütfen geçerli bir \`ID\` giriniz.`))
    let ceza = db.get(`cezaBilgi_${CezaID}`)
    if(!ceza) return message.channel.send(`:x: **\`${CezaID}\`** ID'sine ait bir ceza bulunamadı!`)  
    message.channel.send(embed.setDescription(`
        \`${ceza.kod}\` ID'li Ceza Bilgi **Tipi:** __**${ceza.cezatip}** __
        • **Üye :** <@${ceza.uyes}>
        • **Yetkili :** <@${ceza.yetkili}>
        • **Sebep :** ${ceza.sebep}
`))
message.react(ayarlar.adotik)
}
	exports.conf = {
    name: "cezaıd",
    aliases: ["cezaid"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'cezaıd', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'rich <isim>',
    kategori: 'kullanıcı'
};