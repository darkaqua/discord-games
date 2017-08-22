
const path = require('path');
const http = require('http');
const express = require('express');
const lessMiddleware = require('less-middleware');

const base64_econder = require('../base64_econder');

module.exports._init = () => {

    const app = express();

    app.use(lessMiddleware(path.join(__dirname, "public")));
    app.use(express.static(path.join(__dirname, "/public")));
    app.set('view engine', 'pug');

    http.createServer(app).listen(global.config.website.port, () => {

        app.get('/metrics', (req, res) => res.send({
            guilds: global.metrics.guilds.val(),
            games: global.metrics.games.val()
        }));

        app.all('*', (req, res) => res.render(
            path.join(__dirname, 'views/index.pug'), {
                bot_id: global.config.bot.id,
                favicon: base64_econder.base64_image_encode(global.config.website.favicon, 'ico'),
                avatar: base64_econder.base64_image_encode(global.config.website.avatar, 'png'),
                gif: base64_econder.base64_image_encode(global.config.website.gif, 'gif'),
                name: global.config.website.name,
                current_guilds: global.metrics.guilds.val(),
                current_games: global.metrics.games.val()
            })
        );

    });

};