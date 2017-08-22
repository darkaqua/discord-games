
const probe = require('pmx').probe();

module.exports = {

    _init(current_guilds = 0) {

        this.guilds = probe.counter({
            name: 'guilds'
        });

        this.games = probe.counter({
            name: 'games'
        });

        if(current_guilds > 0)
            this.guilds.inc(current_guilds);

    }

};