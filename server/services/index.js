let fs = require('fs');
let path = require('path');

let files = fs.readdirSync(__dirname);
let services = {};

files.map((file) => {
    serviceName = file.replace('.js', '');
    if (serviceName !== 'index') {
        services[serviceName] = require(`./${file}`);
    }
});

module.exports = (app) => {
    Object
        .keys(services)
        .map((serviceName) => {
            services[serviceName] = services[serviceName](app);
        });

    return services;
}
