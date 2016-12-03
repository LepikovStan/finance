const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const csurf = require('csurf');
const session = require('express-session');
const webpack = require('webpack');
const winston = require('winston');
const serveStatic = require('serve-static');
const fs = require('fs');
const contentDisposition = require('content-disposition')
const path = require('path');
const mysql = require('mysql');
const config = require('./config');
const db = mysql.createConnection(config.db);
db.connect();
app.db = db;

const resolve = (url) => {
    return path.resolve(`${__dirname}/${url}`);
}

app.paths = {
    middlewares: resolve('./middlewares'),
    sass: resolve('./lib/sass'),
    watcher: resolve('./lib/watcher'),
    mainTemplate: resolve('./public/index.html'),
    static: resolve('./public')
}

let middlewares = require(app.paths.middlewares);
let sass = require(app.paths.sass);
let watch = require(app.paths.watcher);
let controllers = require('./controllers');
let services = require('./services')(app);

let serveOptions = {
    redirect: false,
    setHeaders: (res, path) => {
        res.setHeader('Content-Disposition', contentDisposition(path));
        res.setHeader('Content-Type', serveStatic.mime.lookup(path));
    }
}

// app.set('views', resolve('./public'));
// app.set('view engine', 'html');
app.services = services;

app.use('/public', serveStatic(app.paths.static, serveOptions));
app.use(middlewares.logger);
app.use(middlewares.user(app));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}))
app.use(bodyParser.json({limit: '10mb'}))

routes = {
    '/payments/:type': 'payments',
    '/balance': 'balance',
    '/categories-list': 'categories',
    '/category/:categoryId': 'category'
};

for (let route in routes) {
    let Controller = controllers[routes[route]];

    if (Controller) {
        let controller = new Controller(app);

        app
            .get(route, controller['get'].bind(controller))
            .post(route, controller['post'].bind(controller))
            .put(route, controller['put'].bind(controller))
            .delete(route, controller['delete'].bind(controller));
    }
}

let MainTemplateController = new controllers['mainTemplate'](app);
app.get(
    '/*',
    MainTemplateController.get.bind(MainTemplateController)
);

webpack(config.webpack, (error, stats) => {
    if (error) {
        return console.error(error);
    }
    console.log('webpack render success');
});

server = app.listen(3000);

server
    .once('listening', () => {
        console.log('Example app listening on port 3000');
    })
    .once('error', (error) => {
        console.error('server start error=', error)
    });
