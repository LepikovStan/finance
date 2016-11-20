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
let sass = require(resolve('./lib/sass'));
let watch = require(resolve('./lib/watcher'));
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

app.use('/public', serveStatic(resolve('./public'), serveOptions));
app.use(middlewares.logger);
app.use(middlewares.user);

app.get('/', (req, res) => {
    res.sendFile(resolve('./public/index.html'));
});

routes = {
    '/payments': 'payments'
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

sass({
    file: resolve('./client/sass/main.sass'),
    outFile: resolve('./public/css/main.css')
});
watch(resolve('./client/sass/'))
    .then((fileName) => {
        console.log('fileName',fileName);

        sass({
            file: resolve('./client/sass/main.sass'),
            outFile: resolve('./public/css/main.css')
        });
    });

plugins = [
    new webpack.ProvidePlugin({
        '$': `${__dirname}/node_modules/jquery/dist/jquery.min.js`,
        'React': 'react',
        'ReactDOM': 'react-dom'
    })
];
webpack({
    entry: {
        main: resolve('./client/js/main.js')
    },
    output: {
        path: resolve('./public/js/'),
        publicPath: '/public/js/',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: '[name]',
        chunkFilename: '[chunkhash].js',
    },
    resolve: {
        alias: {
            // '$': resolve('./node_modules/jquery/dist/jquery.min.js'),
            // 'jquery': resolve('./node_modules/jquery/dist/jquery.min.js')
        }
    },
    plugins: plugins
}, (error, stats) => {
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
    });
