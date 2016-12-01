const webpack = require('webpack');
const path = require('path');
const resolve = (url) => {
    return path.resolve(`${__dirname}/${url}`);
}

let plugins = [
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

module.exports = {
    webpack: {
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
    }
};
