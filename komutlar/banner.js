const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
   let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
    var user = message.mentions.members.first() || client.users.cache.get(args[0]) || message.member;
    let uid = user.id
    let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${client.token}`
        }
    })
    let receive = ''
    let banner = 'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif'
    response.then(a => {
        if (a.status !== 404) {
            a.json().then(data => {
                receive = data['banner']
                if (receive !== null) {
                    let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
                        method: 'GET',
                        headers: {
                            Authorization: `Bot ${client.token}`
                        }
                    })
                    let statut = ''
                    response2.then(b => {
                        statut = b.status
                        banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=4096`
                        if (statut === 415) {
                            banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=4096`
                        }
                    })
                }
            })
        }
    })
    setTimeout(() => {
        if (!receive) return message.react(ayarlar.red)
        message.lineReply(`**${victim.tag}** ${banner}`)
    }, 1000)

}
exports.conf = {
  aliases: ['banner'],
  permLevel: 0,
  kategori: "Moderasyon",
};

exports.help = {
  name: 'banner',
  description: 'İstediğiniz kullanıcının Bannerını verir.',
  usage: 'afiş <Kullanıcı Adı>',
};