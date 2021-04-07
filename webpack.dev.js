const Path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common')
const DIST_DIR = Path.resolve(__dirname, './dist');

module.exports = merge(common, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(css|less)/,
                loader: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
                exclude: /node_modules/,
            },
        ]
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: DIST_DIR,
        host: 'localhost',
        port: '8080',
        inline: true,
        watchOptions: {
            aggregateTimeout: 2000,
            poll: 1000
        },
        historyApiFallback: true,
        hot: true,
        open: true,
        // writeToDisk: true,
    },
})