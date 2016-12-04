let fs = require('fs');
let path = require('path');

let files = fs.readdirSync(__dirname);
let models = {};

files.map((file) => {
    modelName = file.replace('.js', '');
    if (modelName !== 'index') {
        models[modelName] = require(`./${file}`);
    }
});

module.exports = (app) => {
    Object
        .keys(models)
        .map((modelName) => {
            models[modelName] = models[modelName](app);
        });
    return models;
}
