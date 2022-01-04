const Discord = require("discord.js");
const db = require("quick.db")
const sicil = new db.table("cezalar");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require('../ayarlar.json');
exports.run = async (client, message, args) => {
   

  if (!message.member.roles.cache.has(ayarlar.mutehammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
 if (args.length < 1) return message.channel.send("Bir üye etiketle ve tekrardan dene!")
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("Belirttiğiniz kullanıcı geçerli değil.",)
		if(user.id === message.author.id) return message.channel.send('Kendine Mute atamazsın.')
        if(user.id === client.user.id) return message.channel.send('Bota Mute atamazsın.')
        if(user.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibine Mute atamazsın.')
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
		let reason = args.slice(1).join(" ") || "Sebep Belirtilmedi."
	
	const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  
    let time = args[1];
    if(!time || !ms(time)) return message.react('<a:Iptal:881993409605275689>')
let yaziSure = time.replace("d", " Gün").replace("h", " Saat").replace("m", " Dakika").replace("s", " Saniye");


 

    db.add(`smuteAlma.${user.id}`, 1) //User kaç mute yemiş onu sayar
    db.add(`smuteAtma.${message.member.id}`, 1) //User kaç tane mute atmış onu sayar

     //Userin ceza puanını sayar
    db.add(`cpuan${user.id}`, 5)
    db.add(`Cezaİd_`, +1); //Ceza ID'yi sayar

    let Cezaİd = db.fetch(`Cezaİd_`) + 1; //
    let cpuan = db.fetch(`cpuan${user.id}`)
    

   moment.locale("tr")
let muteBitiş = `${moment(Date.now()+ms(time)).format("LLL")}` 
moment.locale("tr")
let muteAtılma = `${moment(Date.now()).format("LLL")}`

db.push(`${user.id}_sicil`, `${message.author} tarafından ${reason} sebebiyle ${muteAtılma} tarihinde Ses kanallarında susturuldu`)

sicil.push(`sicil.${user.id}`, {
    Tip : "Voice Mute",
    Yetkili : message.author.id,
    reason : reason,
    tarih : muteAtılma
});

    //Ceza ID veri kayıt
    db.set(`cezaBilgi_${Cezaİd}`, {
      sebep: reason,
      kod: Cezaİd,
      yetkili: message.author.id, 
      uyes: user.id,
      bsure: muteAtılma,
      ssure: muteBitiş,
      cezatip: "Voice Mute"
  });

    const voicemutelendi = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(member.user.avatarURL({dynamic: true}))
            .setColor("#2F3136")
            .setDescription(`
            <:ado_vmute:927516825628069900>  ${user ? user.toString() : user.username}  üyesi ${message.author} Tarafından ${yaziSure} boyunca Seste Mutelendi!
Ceza Puan: \`${cpuan}\`
Ceza ID: \`#${Cezaİd}\`
Mutelenen Üye: ${user ? user.toString() : ""} \`  ${user.id})\`
Muteleyen Yetkili: ${message.author} \` - ${message.author.id})\`
Voice Mute Atılma Tarihi: \`${muteAtılma}\`
Voice Mute Bitiş Tarihi: \`${muteBitiş}\`
Voice mute Sebebi: \`${reason}\`
            `)
			await client.channels.cache.get(ayarlar.mutelog).send(voicemutelendi)

    db.set(`voiceCehck_${user.id}`, reason); //Mute geri açma

   if(user.voice.channel) user.voice.setMute(true);

    setTimeout(async () => {


const voicemutekalktı = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(member.user.avatarURL({dynamic: true}))
            .setColor("#2F3136")
            .setDescription(`
            <:ado_vunmute:927516845165133845>  ${user ? user.toString() : user.username} üyesi'nin Voice Mutesi Kalktı!

Ceza ID: \`#${Cezaİd}\`
Mutelenen Üye: ${user ? user.toString() : ""} \`  ${user.id})\`
Muteleyen Yetkili: ${message.author} \` - ${message.author.id})\`
Voice Mute Atılma Tarihi: \`${muteAtılma}\`
Voice Mute Bitiş Tarihi: \`${muteBitiş}\`
Voice mute Sebebi: \`${reason}\`
            `)
			await client.channels.cache.get(ayarlar.mutelog).send(voicemutekalktı)
    
  
    if(user.voice.channel) user.voice.setMute(false);

    }, ms(time));

    message.react(ayarlar.adotik)
  }
	exports.conf = {
    name: "vmute",
    aliases: ["voiceyargı"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'vmute', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'rich <isim>',
    kategori: 'kullanıcı'
};
