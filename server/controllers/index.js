let fs = require('fs');
let path = require('path');

let files = fs.readdirSync(__dirname);
let controllers = {};

files.map((file) => {
    controllerName = file.replace('.js', '');
    if (controllerName !== 'index') {
        controllers[controllerName] = require(`./${file}`);
    }
});

module.exports = controllers
