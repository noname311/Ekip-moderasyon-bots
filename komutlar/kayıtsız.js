const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const ayarlar = require('../ayarlar.json');
const moment = require('moment')


exports.run = async (client, message, args) => {


  
    if (!message.member.roles.cache.has(ayarlar.registerhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
  
const kayıtsız = ("921486951465496638")

//-------------------------------------------------------------------------------\\



let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kendini kayıtsıza atamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir bot Kayıtsıza atılamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
if(kullanici.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Sunucu sahibini Kayıtsıza atamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()).then(x => x.delete({timeout: 5000}));
let reason =args.splice(2).join(" ");
 if(!reason) reason = "Belirtilmedi.";
 kullanici.send(`${message.author} tarafından ${reason} sebebiyle kayıtsıza atıldın`)
client.channels.cache.get(ayarlar.registerlog).send(new MessageEmbed().setDescription(`${kullanici} Adlı kullanıcı ${message.author} tarafından ${reason} sebebiyle kayıtsıza atıldı `).setColor('#2F3136').setFooter(message.author.tag, message.author.avatarURL({dynamic: true})).setTimestamp()) 

kullanici.roles.add(kayıtsız) 
kullanici.roles.cache.forEach(r => {
kullanici.roles.remove(r.id)})
moment.locale("tr");
message.react(ayarlar.adotik)
        

  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıtsız','unreg'],
    permLevel: 0,
};

exports.help = {
      name: "unregister"  
  };