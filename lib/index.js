
module.exports = (config_path) => {

    global.config = require.main.require(config_path);
    global.website = require('./website/website');
    global.metrics = require('./metrics');
    global.game = require('./game/game');

    global.metrics._init();
    global.website._init();
    global.game._init();
    global.bot = global.game.bot;

    global.available_bots = require('../bots.json');

};

