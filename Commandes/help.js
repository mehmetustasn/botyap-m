const Discord = require("discord.js");
const path = require('path');

module.exports.run = async(client, message, args) => {

    let langues = require(path.resolve(path.join('.', 'database/lang.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'tr'){
        const embed = await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Yardım sistemi')
                .setColor('ORANGE')
                .setDescription('Lütfen reaksiyonları aşağıdaki koda göre kontrol edin :\n\n> 📪: ``Özel mesajla yardım alın``,\n> 📝: ``Buradan yardım alın.``')
        )
        await embed.react('📪');
        await embed.react('📝');

        const filter = (reaction, user) => {
            return ['📪', '📝'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
    
        let bool = false;
        let prefixes = require(path.resolve(path.join('.', 'database/prefixes.json')));
        let prefix = prefixes[message.guild.id].prefixes;
        
        client.on('messageReactionAdd', (reaction, user) => {
            if (reaction.emoji.name === '📪' || reaction.emoji.name === '📝' && user.id === message.author.id && user.id != client.user.id) {
    
                if(bool == true){
                    return;
                }
                switch(reaction.emoji.name){
                    case '📪':
                        if(bool === true) return;
                        bool = true;
                        let sended = true;
                        embed.delete();
                        if(langue === 'tr'){
                            message.author.send(
                                new Discord.MessageEmbed()
                                    .setTitle('Yardım menüsü')
                                    .setColor('RED')
                                    .setDescription(`**İşte mevcut komutların listesi :**\n\n\`\`${prefix}gstart\`\`: İstenilen süre için bir çekiliş başlatın.\n\`\`${prefix}reroll\`\`: İstenen çekilişte yeni bir kazanan bulun.\n\`\`${prefix}help\`\`: Yardım menüsünü gönder.\n\`\`🚨\`\`・\`\`${prefix}prefix\`\`: Sunucunuz için bot prefix değiştirin.\n\`\`🚨\`\`・\`\`${prefix}lang\`\`: Sunucunuzdaki bot dilini değiştirin.\n\n\`\`🚨\`\` = **KOMUTLAR SADECE YÖNETİCİ YETKİSİNDE OLANLAR TARAFINDAN KULLANILIR.**`)
                            ).catch(() => {
                                sended = false;
                                message.channel.send(
                                    new Discord.MessageEmbed()
                                        .setTitle('__HATA__')
                                        .setColor('RED')
                                        .setDescription('Lütfen özel mesajlarınızı herkese açın.')
                                )
                                
                                if(sended === true) {
                                    message.channel.send(
                                        new Discord.MessageEmbed()
                                            .setTitle("Yardım menüsü")
                                            .setColor('DARK_GREEN')
                                            .setDescription("Size yardım menüsünü özel mesajla gönderdim.")
                                    )
                                }
                            })
                            
                        }
                    case '📝':
                        if(bool === true) return;
                        bool = true;
                        embed.delete();
                        if(langue === 'tr'){
                            message.channel.send(
                                new Discord.MessageEmbed()
                                        .setTitle('Yardım menüsü')
                                        .setColor('RED')
                                        .setDescription(`**İşte mevcut komutların listesi :**\n\n\`\`${prefix}gstart\`\`: İstenilen süre için bir çekiliş başlatın.\n\`\`${prefix}reroll\`\`: İstenen çekilişte yeni bir kazanan bulun.\n\`\`${prefix}help\`\`: Yardım menüsünü gönder.\n\`\`🚨\`\`・\`\`${prefix}prefix\`\`: Sunucunuz için bot prefix değiştirin.\n\`\`🚨\`\`・\`\`${prefix}lang\`\`: Sunucunuzdaki bot dilini değiştirin.\n\n\`\`🚨\`\` = **KOMUTLAR SADECE YÖNETİCİ YETKİSİNDE OLANLAR TARAFINDAN KULLANILIR.**`)
                            )
                        }
                }
    
            }
        })

    } else if(langue === 'en'){
        const embed = await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Help System')
                .setColor('ORANGE')
                .setDescription('Please check the reactions based on the code below :\n\n> 📪: ``Get help in dm\'s``,\n> 📝: ``Get help here``')
        )
        await embed.react('📪');
        await embed.react('📝');

        const filter = (reaction, user) => {
            return ['📪', '📝'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
    
        let bool = false;
        let prefixes = require(path.resolve(path.join('.', 'database/prefixes.json')));
        let prefix = prefixes[message.guild.id].prefixes;
        
        client.on('messageReactionAdd', (reaction, user) => {
            if (reaction.emoji.name === '📪' || reaction.emoji.name === '📝' && user.id === message.author.id && user.id != client.user.id) {
    
                if(bool == true){
                    return;
                }
                switch(reaction.emoji.name){
                    case '📪':
                        if(bool === true) return;
                        bool = true;
                        let sended = true;
                        embed.delete();
                        if(langue === 'en'){
                            message.author.send(
                                new Discord.MessageEmbed()
                                    .setTitle('Help System')
                                    .setColor('RED')
                                    .setDescription(`**Here is the list of my commands :**\n\n\`\`${prefix}gstart\`\`: Start a giveaway in the channel with a specific duration.\n\`\`${prefix}reroll\`\`: Find a new winner to a specific giveaway.\n\`\`${prefix}help\`\`: Send the help menu.\n\`\`🚨\`\`・\`\`${prefix}prefix\`\`: Change the bot prefix on you server.\n\`\`🚨\`\`・\`\`${prefix}lang\`\`: Change the bot language on your server.\n\n\`\`🚨\`\` = **NEED ADMINISTARTOR PERMISSION TO USE THE COMMAND.**`)
                            ).catch(() => {
                                sended = false;
                                message.channel.send(
                                    new Discord.MessageEmbed()
                                        .setTitle('__ERROR__')
                                        .setColor('RED')
                                        .setDescription('Please, open your DMs and retry.')
                                )

                                if(sended === true) {
                                    message.channel.send(
                                        new Discord.MessageEmbed()
                                            .setTitle("Help System")
                                            .setColor('DARK_GREEN')
                                            .setDescription("I sent you the help mesasge in your DMs.")
                                    );
                                }
                            })
                        }
                    case '📝':
                        if(bool === true) return;
                        bool = true;
                        embed.delete();
                        if(langue === 'en'){
                            message.channel.send(
                                new Discord.MessageEmbed()
                                .setTitle('Help System')
                                .setColor('RED')
                                .setDescription(`**Here is the list of my commands :**\n\n\`\`${prefix}gstart\`\`: Start a giveaway in the channel with a specific duration.\n\`\`${prefix}reroll\`\`: Find a new winner to a specific giveaway.\n\`\`${prefix}help\`\`: Send the help menu.\n\`\`🚨\`\`・\`\`${prefix}prefix\`\`: Change the bot prefix on you server.\n\`\`🚨\`\`・\`\`${prefix}lang\`\`: Change the bot language on your server.\n\n\`\`🚨\`\` = **NEED ADMINISTARTOR PERMISSION TO USE THE COMMAND.**`)
                            )
                        }
                }
    
            }
        })

    }

}
module.exports.help = {
    name: "help"
}