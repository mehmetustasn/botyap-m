const discord = require('discord.js');
const ms = require('ms');
const path = require('path');
const fs = require('fs');

module.exports.run = async (client, message, args) => {

    let langues = require(path.resolve(path.join('.', 'database/lang.json')));
    let lang = langues[message.guild.id].langues;

    if(lang === 'tr'){

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('__HATA__')
                    .setColor('RED')
                    .setDescription('Bu komutu kullanmak için `MANAGE_MESSAGES` izinlerine ihtiyacınız var.')
                    .setTimestamp()
            )
        }

        let prefixes = require(path.resolve(path.join('.', 'database/prefixes.json')));
        if(!args[0]){
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Prefix')
                    .setDescription('Mevcut prefix ``' + prefixes[message.guild.id].prefixes + '``.')
                    .setTimestamp()
            )
        }

        prefixes[message.guild.id] = {
            prefixes: args[0]
        }

        fs.writeFile(path.resolve(path.join('.', 'database/prefixes.json')), JSON.stringify(prefixes, null, 2), (err) => {
            if(err) console.log(err)
        });

        return message.channel.send(
            new discord.MessageEmbed()
                .setTitle('Prefix')
                .setDescription('Yeni prefix ``' + prefixes[message.guild.id].prefixes + '``.')
                .setTimestamp()
        )

    } else if(lang === 'en'){

        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('RED')
                    .setDescription('You need `ADMINISTRATOR` permissions to use that command.')
                    .setTimestamp()
            )
        }

        let prefixes = require(path.resolve(path.join('.', 'database/prefixes.json')));
        if(!args[0]){
            return message.channel.send(
                new discord.MessageEmbed()
                    .setTitle('Prefix')
                    .setDescription('Tue current prefix is ``' + prefixes[message.guild.id].prefixes + '``.')
                    .setTimestamp()
            )
        }

        prefixes[message.guild.id] = {
            prefixes: args[0]
        }

        fs.writeFile(path.resolve(path.join('.', 'database/prefixes.json')), JSON.stringify(prefixes, null, 2), (err) => {
            if(err) console.log(err)
        });

        return message.channel.send(
            new discord.MessageEmbed()
                .setTitle('Prefix')
                .setDescription('The new prefix is ``' + prefixes[message.guild.id].prefixes + '``.')
                .setTimestamp()
        )
    }
}

module.exports.help = {
  name: "prefix"
}