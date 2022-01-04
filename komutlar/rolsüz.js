const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json');


exports.run = async (bot, message, args, client, ) => {

if(!message.member.roles.cache.has(ayarlar.registerhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)

let adoncia = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

if(args[0] == "ver") {
    adoncia.forEach(r => {
r.roles.add("923645463419318352")
})
const adoncia = new Discord.MessageEmbed()
.setAuthor(" "+message.author.username +" ", message.author.avatarURL())
.setColor("#2F3136")
.setDescription("Sunucuda rolü olmayan \`"+ adoncia.size +"\` kişiye <@&923645463419318352> rolü verildi!")
message.channel.send(adoncia).then(m => message.react(ayarlar.onay))
} else if(!args[0]) {
const adoşcuk = new Discord.MessageEmbed()
.setAuthor(""+message.author.username +" ", message.author.avatarURL())
.setColor("#2F3136")
.setDescription("Sunucumuzda rolü olmayan \`"+ adoncia.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!")
message.channel.send(adoşcuk)
}
}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ["rolsuz"],
permLevel: 0
};

exports.help = {
name: "rolsüz",
description: "",
usage: "rolsüz ver"
};