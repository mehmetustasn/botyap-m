const Discord = require('discord.js');
const ms = require('ms');
const path = require('path');

module.exports.run = async (client, message, args) => {

    let langues = require(path.resolve(path.join('.', 'database/lang.json')));
    let lang = langues[message.guild.id].langues;

    
    let hasPerm = message.member.hasPermission('MANAGE_MESSAGES');
    let hasRole = message.member.roles.cache.find(r => r.name === 'Giveaways');

    if(lang === 'tr'){

        if(hasPerm === false || !hasRole == null) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__HATA__')
                    .setColor('RED')
                    .setDescription('Bu komutu kullanmak için `MANAGE_MESSAGES` izinlerine veya ``Giveaways`` adlı bir role ihtiyacınız var.')
                    .setTimestamp()
            )
        }

        if(!args[0]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__HATA__')
                    .setColor('RED')
                    .setDescription('Lütfen hediyenin süresini girin.\n\n__Kullanım__ : `1[s/m/h/d]`')
                    .setTimestamp()
            )
        }

        if(!args[1]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__HATA__')
                    .setColor('RED')
                    .setDescription('Lütfen kazanan sayısını girin.')
                    .setTimestamp()
            )
        }

        if(!args[2]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__HATA__')
                    .setColor('RED')
                    .setDescription('Lütfen kazanılacak ödülü girin.')
                    .setTimestamp()
            )
        }

        message.delete();

        client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnerCount: parseInt(args[1]),
            messages: {
                giveaway: "🎉 **ÇEKİLİŞ** 🎉",
                giveawayEnded: "🎉 **ÇEKİLİŞ BİTTİ** 🎉",
                timeRemaining: `\n\`⏲️\`・Kalan süre: **{duration}**!\n\`👑\`・Çekilişi yapan: ${message.author}\n\`🏆\`・Kazanan(lar): ${parseInt(args[1])}`,
                inviteToParticipate: "Katılmak için 🎁 emojisine tıklayın!",
                winMessage: "\`🎉\`・Tebrikler, {winners}! **{prize}** kazandın!",
                embedFooter: "Çekiliş",
                noWinner: `\`⛔\`・Yeterli katılım olmadığı için hediye iptal edildi.\n\`👑\`・Çekilişi yapan: ${message.author}`,
                winners: `\`🏆\`・Kazanan(lar)`,
                endedAt: "Bitiş",
                units: {
                    seconds: "Saniye",
                    minutes: "Dakika",
                    hours: "Saat",
                    days: "Gün",
                    pluralS: false
                }
            }
        });


        client.giveawaysManager.on('giveawayRerolled', (giveaway, winners) => {
            winners.forEach((member) => {
                member.send(' Tebrikler, '+member.user.username+', '+giveaway.prize+ ' Kazandın' );
            });
        });

        return;
    } else if(lang === 'en') {
        if(hasPerm === false || !hasRole == null) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('RED')
                    .setDescription('You need `MANAGE_MESSAGES` permissions or a role named ``giveaway`` to use that command.')
                    .setTimestamp()
            )
        }

        if(!args[0]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('RED')
                    .setDescription('Please enter a giveaway duration.\n\n__Example__ : `1[s/m/h/d]`')
                    .setTimestamp()
            )
        }

        if(!args[1]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('RED')
                    .setDescription('Please, enter the number of winners.')
                    .setTimestamp()
            )
        }

        if(!args[2]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('RED')
                    .setDescription('Please, enter the giveaway gift.')
                    .setTimestamp()
            )
        }

        message.delete();

        client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnerCount: parseInt(args[1]),
            messages: {
                giveaway: "🎉 **GIVEAWAY** 🎉",
                giveawayEnded: "🎉 **GIVEAWAY ENDED** 🎉",
                timeRemaining: `\n\`⏲️\`・Time left: **{duration}**!\n\`👑\`・Hosted by: ${message.author}\n\`🏆\`・Winner(s): ${parseInt(args[1])}`,
                inviteToParticipate: "React with ``🎁`` to enter the giveaway!",
                winMessage: "\`🎉\`・Congratulations, {winners}! You won **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: `\`⛔\`・There is no correct participations for the giveaway.\n\`👑\`・Hosted by: ${message.author}`,
                winners: `\`🏆\`・Winner(s)`,
                endedAt: "End at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        });


        client.giveawaysManager.on('giveawayRerolled', (giveaway, winners) => {
            winners.forEach((member) => {
                member.send('**Reroll:** Congratulation, '+member.user.username+', you won: '+giveaway.prize);
            });
        });

        return;
    }

    
}

module.exports.help = {
  name: "gstart"
}