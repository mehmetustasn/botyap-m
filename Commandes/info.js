const Discord = module.require('discord.js');
const moment = require('moment');
const path = require('path');
var os = require('os');

module.exports.run = async(client, message, args) => {
    
    var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();

    var  getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + '%'

    usedMemory = (usedMemory/ Math.pow(1024, 3)).toFixed(2);
    totalMemory = (totalMemory/ Math.pow(1024, 3)).toFixed(2);
    

    let langues = require(path.resolve(path.join('.', 'database/lang.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'tr'){
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("Bilgi")
                .setDescription(`İşte <@${client.user.id}>'in bilgileri.
                
                ⚙️ **__Sistem bilgisi__:**
                
                > 💽 **İşletim sistemi:** Linux
                > 💿 **Toplam RAM:** ${totalMemory} GB
                > 🗑️ **Kullanılan RAM:** ${usedMemory} GB *(${getpercentage})*

                🤖 **__Bot Bilgisi__:**

                > 👑 **Yaratıcı:** <@661525561394462730>
                > 🏙️ **Sunucular:** ${client.guilds.cache.size}
                > 👤 **Kullanıcılar:** ${client.users.cache.size}

                🔗 **__Bağlantılar__:**
                
                > \\🔗 **Davetiye:** [Buraya Tıkla](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)
                > \\💡 **Destek Sunucusu:** [Katılmak için tıklayın](https://discord.gg/yvrzuCV)
                > <:github:753997514612539422> **Github:** [Benim github](https://github.com/juststopp/gways)`)
        );
    } else if(langue === 'en'){
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle("Informations")
                .setDescription(`Here is all the <@${client.user.id}>'s informations.
                
                ⚙️ **__System Informations__:**
                
                > \\💽 **Os:** Linux
                > \\💿 **Total RAM:** ${totalMemory} GB
                > \\🗑️ **Used RAM:** ${usedMemory} GB *(${getpercentage})*

                🤖 **__Bot informations__:**

                > 👑 **Creator:** <@661525561394462730>
                > 🏙️ **Guilds:** ${client.guilds.cache.size}
                > 👤 **Users:** ${client.users.cache.size}
                
                🔗 **__Links__:**
                
                > \\🔗 **Invite:** [Click here](https://discord.com/oauth2/authorize?client_id=746404171783340164&permissions=8&scope=bot)
                > \\💡 **Support Server:** [Click to join](https://discord.gg/yvrzuCV)
                > <:github:753997514612539422> **Github:** [My github repository](https://github.com/juststopp/gways)`)
        );
    }
}

module.exports.help = {
    name: 'info'
}