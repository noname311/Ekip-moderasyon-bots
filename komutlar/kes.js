const Discord = require("discord.js")

exports.run = async(client, message, args, embed) => {
    if (!message.member.roles.cache.has(ayarlar.registerhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)


const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.lineReply(`Bir kullanıcı belirt ve komutu yeniden dene`)
if(member.id === message.author.id) return message.lineReply ('Kendinin bağlantısını kesemezsin.')
if(member.id === client.user.id) return message.lineReply('Botun bağlantısını kesemezsin.')
if(member.id === message.guild.OwnerID) return message.lineReply('Sunucu sahibinin bağlantısını kesemezsin.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(`Rolleri senden yüksek birinin bağlantısını kesemezsin.`)
    if (!member.voice.channel) return message.lineReply((`${member}, Adlı kullanıcı bir ses kanalında değil!`))
    let chn = member.voice.channel;
    await member.voice.kick().then(m => {
    message.channel.send((`${member}, Adlı kullanıcının ${chn} kanalından bağlantısı kesildi `))
    }).catch(e => {})
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["kes"],
    permLevel: 0,
  }
  
  exports.help = {
    name: 'kes'
    
  }
