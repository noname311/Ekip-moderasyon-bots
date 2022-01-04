const discord = require('discord.js')
const Discord = require('discord.js');
const db = require('quick.db');
const data = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
    if (!message.member.roles.cache.has(ayarlar.registerhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
         if (!member) 
         return message.lineReply(`ismi değişecek kullanıcıyı belirtmelisin`)
         if(member.id === message.author.id) return message.lineReply('Kendini ismini değiştiremezsin.')
         if(member.id === client.user.id) return message.lineReply('Botun ismini değiştiremezsin.')
         if(member.id === message.guild.OwnerID) return message.lineReply('Sunucu sahibinin ismini değiştiremezsin.')
         if(member.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
         let name = args[1]
         if (!name) 
         return message.lineReply(`${message.author} İsmi Değişecek Kullanıcın İsmini Belritmelisin`)
         let isimler = db.get(`isimler_${member.user.id}`);
         db.push(`isimler.${member.id}`, `\`${name} tagını yaz\` (İsim Değiştirme)`)
         await message.guild.members.cache.get(member.id).setNickname(`${name} tagını yaz`)
         const adoş = new Discord.MessageEmbed()
         .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
         .setColor('#2F3136')
          .setDescription(`${member} adlı kullanıcın ismi ${message.author} tarafından başarıyla \` ${name} tagını yaz\` olarak değiştirildi  
          Önceki İsimleri\n${isimler.map((data, i) => `${data}`).join("\n")}`)
           client.channels.cache.get(ayarlar.registerlog).send(adoş)
           message.react(ayarlar.adotik)  
         }    
        exports.conf = {
            enabled: true,
            guildOnly: true,
            aliases: ['isim'],
            permLevel: 0
          }
          exports.help = {
            name: 'isim',
            description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.",
            usage: '.isim @etiket/id İsim Yaş'
          }
