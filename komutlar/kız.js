const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const tdb = new db.table("taglılar")
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

      
    if (!message.member.roles.cache.has(ayarlar.registerhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)

        

   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) 
        return message.lineReply(`Kayıt Olacak Kullanıcıyı Belirtmelisin`)


if(member.id === message.author.id) return  message.lineReply('Kendini kayıt edemezsin.')
if(member.id === client.user.id) return  message.lineReply('Botu kayıt edemezsin.')
if(member.id === message.guild.OwnerID) return  message.lineReply('Sunucu sahibini kayıt edemezsin.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)

      let name = args[1]
        if (!name) 
        return message.lineReply(` Kayıt olacak Kullanıcın İsmini Belirtmelisin`)

   
 let taglıalım = await tdb.fetch(`taglıalım.${message.guild.id}`)
if(taglıalım === true){
    if(!member.user.username.includes("wéis")  &&  !member.user.discriminator.includes("#1986") && !member.roles.cache.has(ayarlar.vip) && !member.roles.cache.has(ayarlar.booster)) return message.channel.send(new Discord.MessageEmbed() .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })) .setDescription(`Sunucumuzda taglı alım modu açıktır kayıt olmak için isminize \`wéis\` sembolünü alabilir yada  \`1986\` Etiketini Alabilir veya \`Boost\` basarak giriş yapabilirsiniz.`))
}
if(["921486947854213130"].some(erkek => member.roles.cache.has(erkek))) return message.lineReply("Kullanıcı zaten kayıtlı.").then(sil => sil.delete({timeout: 5000}));
 
 await message.guild.members.cache.get(member.id).setNickname(`${name} Wéis`)
 db.push(`isimler_${member.id}`, ` \`${name} Wéis\` (<@&921486947854213130>) yetkili:${message.author}`);
 db.set(`kayıt_${member.id}`, true)
 db.add(`kız_${message.author.id}`, 1)
 db.add(`toplam_${message.author.id}`, 1)
 await message.guild.members.cache.get(member.id).roles.remove(ayarlar.unregister)
 await message.guild.members.cache.get(member.id).roles.add(ayarlar.kız1)
 message.react(ayarlar.adotik)
client.channels.cache.get(genelchat).send(`<@${member.id}> Aramıza Katıldı ona hoşgeldin diyelim`)
const Void = client.channels.cache.get(ayarlar.registerlog)
const log = new Discord.MessageEmbed()
.setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
.setColor('#2F3136')
.setDescription(`${member} üyesi başarıyla  ${message.author} yetkilisi tarafından **Kız** olarak kayıt edildi`)
    Void.send(log)
            }
            exports.conf = {
                aliases: ['k'],
                permLevel: 0,
                kategori: "Moderasyon",
              }; 
              exports.help = {
                name: 'kız',
                description: 'kayıt ediyor yarragım ne bakıyon.',
                usage: 'kayıt ediyor yarragım ne bakıyon',
              };

