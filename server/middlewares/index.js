let fs = require('fs');
let path = require('path');

let files = fs.readdirSync(__dirname);
let middlewares = {};

files.map((file) => {
    mwName = file.replace('.js', '');
    if (mwName !== 'index') {
        middlewares[mwName] = require(`./${file}`);
    }
});

module.exports = middlewares
