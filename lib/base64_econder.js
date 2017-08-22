
const fs = require('fs');

module.exports = {

    base64_encode(file) {
        return new Buffer(fs.readFileSync(file)).toString('base64');
    },

    base64_image_encode(file, format){
        return `data:image/${format};base64,${this.base64_encode(file)}`;
    },

    base64_decode(base64str, file) {
        fs.writeFileSync(file, new Buffer(base64str, 'base64'));
    }

};