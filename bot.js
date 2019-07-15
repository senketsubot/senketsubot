const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./auth.json');


client.on('ready',() => {
    console.log('Up and Running');
});

function getTime(){
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var modifiedHours = hours - 12;
    var modifiedMinutes = "0" + minutes;
    if ((hours > 12) && (minutes < 10)) {
        return(modifiedHours + ":" + modifiedMinutes + " PM" + " EST")
    } else if ((hours > 12) && (minutes > 10)) {
        return (modifiedHours + ":" + minutes + " PM" + " EST")
    } else {
        return (hours + minutes + " AM" + " EST")
    }

}

const embed = {
    "title": "SENKETSU ANIME BOT",
    "description": "[Add me to your discord server!](https://discordapp.com/oauth2/authorize?&client_id=512712342052536321&scope=bot&permissions=8)  ```" +
        "\nPing      -- Check ping of bot" +
        "\nTime      -- Shows current time in EST" +
        "\nHelp      -- Brings up this list" +
        "\nKick      -- Kicks guild member " +
        "\nBan       -- Bans guild member " +
        "\nMute      -- Mutes guild member (voice)" +
        "\nDeafen    -- Deafens guild member" +
        "\nUnmute    -- Unmutes guild member (voice)      " +
        "\nUndeafen  -- Undefeans guild member" +
        "\nUptime    -- Shows uptime of bot" +
        "\nPurge     -- Deletes messages in bulk" +
        "\nSilence   -- Revokes chat permissions" +
        "\nUnsilence -- Returns chat permissions" +
        "\nBlindfold -- Revokes read permissions" +
        "\nUnblindfold-- Returns read permissions```",
    "color": 16725817,
    "timestamp": "2018-12-28T17:07:32.863Z",
    "footer": {
        "icon_url": "https://cdn.discordapp.com/attachments/410573261030686742/528268897783119873/logo-square.png",
        "text": "made with discordjs"
    },
    "thumbnail": {
        "url": "https://cdn.discordapp.com/avatars/512712342052536321/e25153f65da8983924ed18668314f385.jpg?size=1024"
    },
    "author": {
        "name": "MADE BY N A N I S O R E#0785",
        "icon_url": "https://cdn.discordapp.com/avatars/241289238421700609/fd9510594837cd257bc8b4591fcca899.jpg?size=1024"
    }
};

client.on('ready', () => {
    client.user.setActivity('working')
})




///simple stuff

var prefix = "-";
client.on('message', message => {
    if (message.content.startsWith(prefix + 'ping')) {
        message.channel.send("Pong! `" + (new Date().getTime() - message.createdTimestamp) + "` ms");
    } else

    if (message.content.startsWith(prefix + 'time')) {
        message.channel.send("It is `" + getTime() + "`");
    } else

    if (message.content.startsWith(prefix + 'help')) {
        message.channel.send({ embed });
    } else

    if (message.content.startsWith(prefix + 'uptime')) {
        let totalSeconds = (client.uptime / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.round(totalSeconds % 60);
        let uptime = `I've been alive for ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
        message.channel.send(uptime)
    } else




    ///moderating stuff

    if (message.content.startsWith(prefix + 'purge')) {
        var purgeNumber = message.content.split(/[, ]+/).pop();
        message.channel.bulkDelete(purgeNumber).then(() =>
            message.channel.send('deleted `' + purgeNumber + '` messages')).catch(() =>
            message.channel.send('Please assign appropriate permissions'))
    } else

    if (message.content.startsWith(prefix + 'blindfold')){
        var member = message.mentions.members.first();
        message.channel.overwritePermissions(member,{
            READ_MESSAGES : false,
            READ_MESSAGE_HISTORY : false,
        }).then(() =>
            message.channel.send('blindfolded!')).catch(() =>
            message.channel.send('cannot blindfold!'))
    } else

    if (message.content.startsWith(prefix + 'unblindfold')){
        var member = message.mentions.members.first();
        message.channel.overwritePermissions(member,{
            READ_MESSAGES : null,
            READ_MESSAGE_HISTORY : null,
        }).then(() =>
            message.channel.send('unblindfolded!')).catch(() =>
            message.channel.send('cannot take off blindfold!'))
    } else

    if (message.content.startsWith(prefix + 'silence')){
        var member = message.mentions.members.first();
        message.channel.overwritePermissions(member,{
            SEND_MESSAGES : false,
        }).then(() =>
            message.channel.send('Silenced!')).catch(() =>
            message.channel.send('cannot silence!'))
    } else

    if (message.content.startsWith(prefix + 'unsilence')) {
        var member = message.mentions.members.first();
        message.channel.overwritePermissions(member, {
            SEND_MESSAGES : null,
        }).then(() =>
            message.channel.send('unsilenced!')).catch(() =>
            message.channel.send('cannot unsilence'))
    } else


    if (message.content.startsWith(prefix + 'kick')) {
        var member = message.mentions.members.first();
        member.kick("senpai told me to").then(() => {
            message.channel.send("Kicked!");
        }).catch(() => {

            message.channel.send("You do not have appropriate permissions");
        });
    } else
    if (message.content.startsWith(prefix + 'ban')) {
        var member = message.mentions.members.first();
        member.ban("banned.").then(() => {
            message.channel.send("banned!");
        }).catch(() => {
            message.channel.send("You do not have appropriate permissions")
        });
    } else
    if (message.content.startsWith(prefix + 'mute')) {
        var member = message.mentions.members.first();
        member.setMute(true, "muted.").then(() => {
            message.channel.send("Muted!");
        }).catch((member) => {
            message.channel.send("You do not have appropriate permissions");
        });
    } else
    if (message.content.startsWith(prefix + 'deafen')) {
        var member = message.mentions.members.first();
        member.setDeaf(true, "deafened").then(() => {
            message.channel.send("Deafened!");
        }).catch(() => {
            message.channel.send("You do not have appropriate permissions");
        });
    } else
    if (message.content.startsWith(prefix + 'unmute')) {
        var member = message.mentions.members.first();
        member.setMute(false, "unmuted.").then(() => {
            message.channel.send("Unmuted!");
        }).catch((member) => {
            message.channel.send("You do not have appropriate permissions");
        });
    } else
    if (message.content.startsWith(prefix + 'undeafen')) {
        var member = message.mentions.members.first();
        member.setDeaf(false, "undeafened!").then(() => {
            message.channel.send("Undeafened!");
        }).catch(() => {
            message.channel.send("You do not have appropriate permissions");

        })
    }



});

client.login(settings.token);