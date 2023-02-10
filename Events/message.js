const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = (client, message) => {
    if (message.channel.type === 'dm') return;
    if(message.author.bot) { return; }
    if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) { return; }
    let prefixes = require(path.resolve(path.join('.', 'database/prefixes.json')));
    let prefix = prefixes[message.guild.id].prefixes;
    if (!message.content.startsWith(prefix)) { return; }

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let commande = args.shift();
        let cmd = client.commands.get(commande);

        if (!cmd) { return; }
            cmd.run(client, message, args);
};