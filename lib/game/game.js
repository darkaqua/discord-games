
const Discord = require("discord.js");
const fs = require("fs");
const path = require("path");

const on_ready = () => {
    global.bot.user.setPresence({
        status: 'online',
        afk: false,
        game: {
            name: `$help`,
            url: null,
            type: 0
        }
    }).catch(console.error);
};

const on_message = (message) => {
    if(!message.guild) return;
    if(message.author.bot) return;

    if(message.content.toLowerCase() === '$help')
        return command_help(message);

    let valid_command = false;

    global.config.bot.aliases.forEach(alias => {
        if(message.content.startsWith(`$play ${alias}`))
            valid_command = true;
    });

    if(!valid_command) return;

    require.main.require(`./${global.config.bot.events_path}/message.js`)(message);
};

const command_help = (message) => {

    message.guild.fetchMembers().then(g => {
        const helper_bot = global.available_bots.filter(b => g.members.find('id', b.id))[0];

        if(helper_bot.id !== global.bot.user.id) return;

        message.author.send(help_message()).catch(console.error);


    }).catch(console.error);

    message.delete().catch(_ => _);
};

const help_message = () => {
    return `Check out our game bots:\n\n${global.available_bots.map(b => `**${b.name}**: https://${b.website}.darkaqua.net`).join('\n')}`;
}

module.exports = {

    _init(){

        this.bot = new Discord.Client();

        fs.readdirSync(global.config.bot.events_path).forEach((name) =>{
            let simple_name = /(.+)\.js/i.exec(name)[1];
            if(simple_name === 'message') return;
            this.bot.on(
                simple_name,
                require.main.require(`./${global.config.bot.events_path}/${name}`)
            );
        });

        this.bot.on('ready', on_ready);
        this.bot.on('message', on_message);

        this.bot.login(global.config.bot.token).catch(console.error);

    },

    start(){
        global.metrics.games.inc();
    },

    end(){
        global.metrics.games.dec();
    }

};