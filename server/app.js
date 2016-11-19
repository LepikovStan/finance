let express = require('express');
let app = express();

let bodyParse = require('body-parser');
let csurf = require('csurf');
let session = require('express-session');
let webpack = require('webpack');
let winston = require('winston');
let serveStatic = require('serve-static');
let fs = require('fs');
let contentDisposition = require('content-disposition')
let path = require('path');

let resolve = (url) => {
    return path.resolve(`${__dirname}/${url}`);
}

let middlewares = require(resolve('./middlewares'));
let serveOptions = {
    redirect: false,
    setHeaders: (res, path) => {
        console.log('serveStatic.mime.lookup(path)', serveStatic.mime.lookup(path));
        res.setHeader('Content-Disposition', contentDisposition(path));
        res.setHeader('Content-Type', serveStatic.mime.lookup(path));
    }
}

// app.use(serveStatic(resolve('./public'), serveOptions));
app.use(middlewares.logger);
app.use(middlewares.user);
app.use(express.static(resolve('./public')));

app.get('/', (req, res) => {
    res.render('index');
});

server = app.listen(3000);

server
    .once('listening', () => {
      console.log('Example app listening on port 3000');
    })
    .once('error', (error) => {
    });
