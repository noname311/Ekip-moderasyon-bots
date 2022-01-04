const Discord = require("discord.js");
const db = require("quick.db")
const sicil = new db.table("tmute");
const ms = require('ms');
const moment = require("moment");
require("moment-duration-format")
const ayarlar = require("../ayarlar.json")
exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(ayarlar.registerhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
 if (args.length < 1) return message.lineReply("Bir üye etiketle ve tekrardan dene!")
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.lineReply("Belirttiğiniz kullanıcı geçerli değil.",)
		if(user.id === message.author.id) return message.lineReply('Kendine jail atamazsın.')
        if(user.id === client.user.id) return message.lineReply('Bota jail atamazsın.')
        if(user.id === message.guild.OwnerID) return message.lineReply('Sunucu sahibine jail atamazsın.')
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
		let reason = args.slice(1).join(" ") || "Sebep Belirtilmedi."
 
  
   
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

    
    let time = args[1];
    if(!time || !ms(time)) return message.channel.send('Susturma süresini belirtmelisin')
moment.locale("tr")
let yaziSure = time.replace("d", " Gün").replace("h", " Saat").replace("m", " Dakika").replace("s", " Saniye");


    db.add(`jailAlma.${user.id}`, 1) //User kaç mute yemiş onu sayar
    db.add(`jailAtma.${message.member.id}`, 1) //Yetkili kaçtane mute atmış onu sayar

 //Ceza puan sayma
  
    db.add(`Cezaİd_`, +1);
    db.add(`cpuan${user.id}`, 7) //Ceza ID sayma

    let Cezaİd = db.fetch(`Cezaİd_`) + 1;
    let cpuan = db.fetch(`cpuan${user.id}`) //Ceza ID veri çekme 


  moment.locale("tr")
let muteBitiş = `${moment(Date.now()+ms(time)).format("LLL")}` 
moment.locale("tr")
let muteAtılma = `${moment(Date.now()).format("LLL")}`

    db.set(`jailRoles.${user.id}`, user.roles.cache.map(x => x.id)) //Jail rol kayıt etme

    await user.roles.set(user.roles.cache.has(ayarlar.booster) ? [ayarlar.jail, ayarlar.booster] : [ayarlar.jail]);


const mutelendi = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(member.user.avatarURL({dynamic: true}))
            .setColor("32CD32")
            .setDescription(`
            ${user ? user.toString() : user.username}  üyesi ${message.author} Tarafından ${yaziSure} boyunca jaillendi!
Ceza Puan: \`${cpuan}\`
Ceza ID: \`#${Cezaİd}\`
cezalandırılan Üye: ${user ? user.toString() : ""} \`  ${user.id})\`
cezalanlandıran Yetkili: ${message.author} \` - ${message.author.id})\`
jail Atılma Tarihi: \`${muteAtılma}\`
jail  Bitiş Tarihi: \`${muteBitiş}\`
jail  Sebebi: \`${reason}\`
            `)
			await client.channels.cache.get(ayarlar.jaillog).send(mutelendi)

            db.push(`${user.id}_sicil`, `${message.author} tarafından ${reason} sebebiyle ${muteAtılma} tarihinde  Cezalandırıldı`)

            sicil.push(`sicil.${user.id}`, {
                Tip : "Jail",
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
        cezatip: "Temp Jail"
    });


   
    setTimeout(async () => {
	const mutelendi = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(member.user.avatarURL({dynamic: true}))
            .setColor("32CD32")
            .setDescription(`
            ${user ? user.toString() : user.username}  üyesi'nin Jail cezası kalktı !

Ceza ID: \`#${Cezaİd}\`
cezalandırılan Üye: ${user ? user.toString() : ""} \`  ${user.id})\`
cezalanlandıran Yetkili: ${message.author} \` - ${message.author.id})\`
jail Atılma Tarihi: \`${muteAtılma}\`
jail  Bitiş Tarihi: \`${muteBitiş}\`
jail  Sebebi: \`${reason}\`
            `)
			await client.channels.cache.get(ayarlar.jaillog).send(mutelendi)

        let eskiRolles = await db.get(`jailRoles.${user.id}`);
        await user.roles.set(eskiRolles).catch(e => { });
    }, ms(time));

    message.react(ayarlar.adotik)
			  }
		
		exports.conf = {
    name: "jail",
    aliases: ["jailyargı"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'jail', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'rich <isim>',
    kategori: 'kullanıcı'
};