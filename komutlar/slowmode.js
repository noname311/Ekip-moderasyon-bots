const { MessageEmbed } = require("discord.js");
const ayarlar = require('../ayarlar.json')


exports.run = async (client, message, args) => {

  let vegasembed = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true}))
  let embedvegas2 = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.member.user.avatarURL({dynamic:true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}))
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embedvegas2.setDescription(`<a:adIptal:892150699448729610>  Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`)).then(m => m.delete({timeout: 5000}), message.react('<a:adIptal:892150699448729610>'));
  let embed = new MessageEmbed().setColor(`RANDOM`).setAuthor(message.author.tag, message.member.user.avatarURL({dynamic: true})).setFooter(client.user.username,client.user.avatarURL({dynamic:true}));
  let miktar = Number (args[0]);
  message.channel.setRateLimitPerUser(miktar).catch(err => {})
  message.channel.send(vegasembed.setDescription(`Slow Mode **${miktar ? miktar : "Kapalı" }** saniye Olarak Ayarlandı.`)).then(m => m.delete({timeout: 5000}))
  message.react(ayarlar.adotik);
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["slowmode"],
  permLevel: 0,
}

exports.help = {
  name: 'slow-mode'
  
}