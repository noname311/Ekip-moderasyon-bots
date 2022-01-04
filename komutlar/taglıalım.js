const { MessageEmbed } = require('discord.js')
const Database = require('quick.db')
const kdb = new Database.table("kayıtlar")
const ayarlar = require('../ayarlar.json')
const tdb = new Database.table("taglılar")

exports.run = async(client, message, args) => {


if(!args[0]) {
    message.lineReply(`Yalnış kullanım! .taglıalım aç/kapat`).then(tedoa => tedoa.delete({ timeout : 10000 })).then(message.react(ayarlar.red))
    return;    
    }
    if (args[0] == 'aç') {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`).then(tedoa => tedoa.delete({ timeout : 5000 })).then(message.react(ayarlar.red))

        let açıkmı =  tdb.fetch(`taglıalım.${message.guild.id}`)
        if(açıkmı === true) return message.lineReply(`Sunucu durumu zaten taglı alım durumunda!`).then(tedoa => tedoa.delete({ timeout : 5000 })).then(message.react(ayarlar.red))
        await tdb.set(`taglıalım.${message.guild.id}`, true)
        message.lineReply(`Başarıyla taglı alım moduna geçildi.`).then(tedoa => tedoa.delete({ timeout : 5000 })).then(message.react(ayarlar.onay))
     }
     if (args[0] == 'kapat') { 
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.lineReply(`bu komutu kullanabilmek için yeterli yetkiye sahip değilsin!`).then(tedoa => tedoa.delete({ timeout : 5000 })).then(message.react(ayarlar.red))
        let kapalımı = tdb.fetch(`taglıalım.${message.guild.id}`)
        if(kapalımı === false) return message.lineReply(`Sunucu durumu zaten taglı alım durumuna kapalı!`).then(tedoa => tedoa.delete({ timeout : 5000 })).then(message.react(ayarlar.red))
        await tdb.set(`taglıalım.${message.guild.id}`, false)
        message.lineReply(`Başarıyla taglı alım modundan çıkıldı.`).then(tedoa => tedoa.delete({ timeout : 5000 })).then(message.react(ayarlar.onay))
    }



}

    exports.conf = {
        enabled : true,
        guildOnly : false,
        aliases : ["taglıalım"], 
         }
    
    exports.help = {
        name : 'taglı-alım',
        help: "taglıalım [aç/kapat]",
        cooldown: 0
     }