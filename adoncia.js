const Discord = require("discord.js");
require("discord-reply")
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err); log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {let props = require(`./komutlar/${f}`);log(`Yüklenen komut: ${props.help.name}.`);client.commands.set(props.help.name, props);props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try { delete require.cache[require.resolve(`./komutlar/${command}`)];let cmd = require(`./komutlar/${command}`);client.commands.delete(command);client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);});
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {let cmd = require(`./komutlar/${command}`);client.commands.set(command, cmd);cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {delete require.cache[require.resolve(`./komutlar/${command}`)];let cmd = require(`./komutlar/${command}`);client.commands.delete(command);client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);}
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;}
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//katılma eventi
client.on('guildMemberAdd', async member => {
  var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
'0': `0`,
'1': `1`,
'2': `2`,
'3': `3`,
'4': `4`,                       
'5': `5`,
'6': `6`,
'7': `7`,
'8': `8`,
'9': `9`}[d];
        })
      }
member.roles.add("kayıtsızrolid")
const Webhook = new Discord.WebhookClient("", "")
let user = client.users.cache.get(member.id);
const kurulus = new Date().getTime() - user.createdAt.getTime(); 
var kontrol;
  if (kurulus < 1296000000) kontrol = '<:ado_no:924013360754851880>'
  if (kurulus > 1296000000) kontrol = '<:ado_okey:924013362772328528>'
  moment.locale("tr");
  Webhook.send(`:tada: **Ross'#1781** Sunucumuza Hoşgeldin <@${member.id}> bizde seni bekliyorduk

Hesabın ${moment(member.user.createdAt).format("Do MMMM YYYY hh:mm")} Tarihinde **${moment(member.user.createdTimestamp).fromNow()}** oluşturulmuş

Seninle birlikte sunucumuz toplam **${üyesayısı}** kişiye ulaşmış bulunmakta <@&923645452920963102> yetkili arkadaşlarım seninle ilgilenecektir

Sunucu kurallarımız <#923645443253092412> kanalında belirtilmiştir Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek :tada:
`);             
});
//sunucudan ayrılırsa
client.on("guildMemberRemove", async  member =>  {
  db.delete(`kayıt_${member.id}`)
  db.push(`isimler_${member.id}`, ` \`${member.displayName}\` (Sunucudan Ayrılma)`);
});
//mesaj log
client.on("messageDelete", async message => {
	const Webhook = new Discord.WebhookClient("", "")
 {
  if (message.author.bot || message.channel.type == "dm") return;
const adoş = new Discord.MessageEmbed()
  if (message.attachments.first()) {
    Webhook.send(adoş.setAuthor(message.author.tag ,message.author.avatarURL({ dynamic: true, size: 2048 })).setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`<@!${message.author.id}> üyesi <#${message.channel.id}> kanalında  fotoğrafını sildi. 

**Fotoğraf İçeriği:** `).setImage(message.attachments.first().proxyURL
).setColor("#2F3136"));
    } else {
      Webhook.send(adoş.setAuthor(message.author.tag , message.author.avatarURL({ dynamic: true, size: 2048 })).setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`<@!${message.author.id}> üyesi <#${message.channel.id}> kanalında mesajını sildi.

 **Mesaj İçeriği:** \`${message.content}\`
 

\`Kanal: ${message.channel.name} (${message.channel.id})
Kullanıcı: ${message.author.tag} (${message.author.id})
Mesaj id : (${message.id})\`

`).setColor("#2F3136"));
    }}
});
client.on('messageUpdate', async (oldMessage, newMessage) => {
  const Webhook = new Discord.WebhookClient("", "")
 {
const arxEmb = new Discord.MessageEmbed()
    if (oldMessage.author.bot) return;
    if (!oldMessage.guild) return;
    if (oldMessage.content == newMessage.content) return;

    Webhook.send(arxEmb.setAuthor(`${oldMessage.author.tag}`, oldMessage.author.avatarURL({ dynamic: true, size: 2048 })).setThumbnail(oldMessage.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`<@!${oldMessage.author.id}> üyesi <#${oldMessage.channel.id}> kanalında mesajını düzenledi.

**Eski Mesaj:** \`${oldMessage.content}\`
**Yeni Mesaj:** \`${newMessage.content}\`

\`Kanal: ${oldMessage.channel.name} (${oldMessage.channel.id})
Kullanıcı: ${oldMessage.author.tag} (${oldMessage.author.id})
Mesaj id : (${oldMessage.id})\`
`).setColor("#2F3136"));
  }}
);
client.on("userUpdate", async function(oldUser, newUser) { 
  const guildID = ""//sunucu
  const roleID = ""//taglırolü
  const tag = ""//tag 
  const log2 = '' // log kanalı
  const guild = client.guilds.cache.get(guildID)
  const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
  const member = guild.members.cache.get(newUser.id)
  if (newUser.username !== oldUser.username) {
      if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          client.channels.cache.get(log2).send(` ${newUser} isminden \`\` Çıkararak ailemizden ayrıldı!`)
      } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
          member.roles.add(roleID)
          client.channels.cache.get(log2).send(`  ${newUser} ismine \`\` alarak ailemize katıldı`)
      }
  }
 if (newUser.discriminator !== oldUser.discriminator) {
      if (oldUser.discriminator == "" && newUser.discriminator !== "") {
          client.channels.cache.get(log2).send(`<@${newUser.id}> etiketinden \`\` çıakrtarak ailemizden ayrıldı!`)
      } else if (oldUser.discriminator !== "" && newUser.discriminator == "") {
          member.roles.add(roleID)
          client.channels.cache.get(log2).send(`<@${newUser.id}> etiketine \`\` alarak ailemize katıldı`)
      }
  }
})
client.on('message', msg => {
  if (msg.content === '.tag' || msg.content=="!tag" || msg.content== "tag") {
      msg.channel.send(`**\`\`** `); 
  }
});

