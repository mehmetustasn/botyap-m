const discord = require('discord.js');
const ms = require('ms');
const path = require('path');
const fs = require('fs');

module.exports.run = async (client, message, args) => {

    let langues = require(path.resolve(path.join('.', 'database/lang.json')));
    let langue = langues[message.guild.id].langues;

    if(langue === 'tr'){


        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription('Bu komutu kullanmak için `MANAGE_MESSAGES` izinlerine ihtiyacınız var.')
                    .setTimestamp()
            )
        }

        if(!args[0]){
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Language')
                    .setDescription(`Mevcut dil \`\`${langues}\`\`.Bunu değiştirmek için, botu Türkçe olarak koymak için \`tr\` parametresini ve botu İngilizce olarak koymak için \`en\` parametresini ekleyerek aynı komutu yapın.`)
                    .setTimestamp()
            )
        }

        if(args[0] != 'en' && args[0] != 'tr'){
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Dil')
                    .setDescription('Lütfen bir dil seçin. İngilizce için `en` ve Türçe için `tr` yazın.')
                    .setDescription()
            )
        }

        langues[message.guild.id] = {
            langues: args[0]
        }

        fs.writeFile(path.resolve(path.join('.', 'database/lang.json')), JSON.stringify(langues, null, 2), (err) => {
            if(err) console.log(err)
        });

        return message.channel.send(
            new discord.MessageEmbed()
                .setTitle('Dil')
                .setDescription(`Yeni dil \`${args[0]}\``)
                .setTimestamp()
        )

    } else if(langue === 'en'){

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('RED')
                    .setDescription('You need `ADMINISTRATOR` permissions to use that command.')
                    .setTimestamp()
            )
        }

        if(!args[0]){
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Language')
                    .setDescription(`The current language is \`\`${langue}\`\`. To change it write the same command with paramaters. Put \`en\` for English and \`tr\` for Turkish.`)
                    .setTimestamp()
            )
        }

        if(args[0] != 'en' && args[0] != 'tr'){
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Language')
                    .setDescription('Please select a language. Put `en` for English and `tr` for Turkish.')
                    .setDescription()
            )
        }

        langues[message.guild.id] = {
            langues: args[0]
        }

        fs.writeFile(path.resolve(path.join('.', 'database/lang.json')), JSON.stringify(langues, null, 2), (err) => {
            if(err) console.log(err)
        });

        return message.channel.send(
            new discord.MessageEmbed()
                .setTitle('Language')
                .setDescription(`The new language is \`${args[0]}\``)
                .setTimestamp()
        )
    }
}

module.exports.help = {
  name: "lang"
}