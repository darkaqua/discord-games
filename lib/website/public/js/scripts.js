const get_tag_value = (tag_name) => {
    return parseInt($(document).find(tag_name).html());
};

const set_tag_value = (tag_name, value, negative) => {
    const tag = $(document).find(tag_name);
    tag.html(value);
    tag.css('color', negative ? 'red' : 'white');
    tag.animate({
        color: "#99AAB5"
    }, 1000, () => {
        tag.css('color', '');
    });
};

const ajax_request = () => {
    $.get( "/metrics", function( data ) {

        const old_games_value = get_tag_value('#games');
        const old_guilds_value = get_tag_value('#guilds');

        if(old_games_value !== data.games){
            set_tag_value('#games', data.games, old_games_value > data.games);
        }
        if(old_guilds_value !== data.guilds){
            set_tag_value('#guilds', data.guilds, old_guilds_value > data.guilds);
        }
    });
};

setInterval(ajax_request, 1000 * 5);