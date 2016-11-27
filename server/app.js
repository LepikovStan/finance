let express = require('express');
let app = express();

let bodyParser = require('body-parser');
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
app.use(middlewares.user);
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

sass({
    file: resolve('./client/sass/main.sass'),
    outFile: resolve('./public/css/main.css')
});
// watch(resolve('./client/sass/'))
//     .then((fileName) => {
//         console.log('fileName',fileName);
//
//         sass({
//             file: resolve('./client/sass/main.sass'),
//             outFile: resolve('./public/css/main.css')
//         });
//     });

plugins = [
    new webpack.ProvidePlugin({
        '$': `${__dirname}/node_modules/jquery/dist/jquery.min.js`,
        'React': 'react',
        'ReactDOM': 'react-dom',
        'store': resolve('./client/js/store'),
        '_': 'lodash'
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
    // new webpack.NoErrorsPlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin()
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
        extensions: ['', '.js', '.jsx'],
        alias: {
            'modules': resolve('./client/js'),
            'components': resolve('./client/js/components'),
            'lib': resolve('./client/js/lib')
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: [ 'jsx-loader']
            }
        ]
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
