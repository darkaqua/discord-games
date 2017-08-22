
const probe = require('pmx').probe();

module.exports = {

    _init() {

        this.guilds = probe.counter({
            name: 'guilds'
        });

        this.games = probe.counter({
            name: 'games'
        });

    }

};