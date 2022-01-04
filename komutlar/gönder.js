const Discord = require("discord.js");

exports.run = async (client, message, args, perm) => {






    if(!message.member.roles.cache.has("891724096528871444") && !message.member.hasPermission("VIEW_AUDIT_LOG")) return
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) return message.channel.send("Kanala göndermek istediğin kullanıcıyı düzgünce belirt ve tekrar dene !")
    if (!member.voice.channel) return message.channel.send("Kanala göndermek istediğin kişi bir ses kanalına bağlı değil.")
    if (message.member.roles.highest.rawPosition < member.roles.highest.rawPosition) return message.channel.send("Rolleri senden yüksek birine sese gönderme işlemi uygulayamazsın.")
    if (!args[1]) return message.channel.send("Göndermek istediğin kanalı belirt ve tekrar dene !")
    let kanal = message.guild.channels.cache.find(x => x.id == args[1])
    if(!kanal) return message.channel.send("Göndermek istediğin kanal hatalı !")
    if(!kanal.permissionsFor(member).has("CONNECT")) return message.channel.send("Kanala taşımak istediğin üyenin kanala bağlanma yetkisi bulunmuyor.")
    member.voice.setChannel(kanal.id);
    await message.channel.send(" <@" + member.id + "> başarıyla " + kanal.name + " kanalına gönderildi.")
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["gönder"],
    permLevel: 0,
  }
  
  exports.help = {
    name: "gönder"
  };
  
  