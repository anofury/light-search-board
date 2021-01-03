const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    chunks: 'all',
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    minChunks: 2,
                    minSize: 0,
                    name: 'vendors',
                },
                commons: {
                    chunks: 'all',
                    test: /\.(ts|tsx|js|jsx)/,
                    priority: -10,
                    minChunks: 2,
                    minSize: 0,
                    name: 'commons',
                },
            },
        },
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        // drop_console: true,
                        // pure_funcs: ['console.log'],
                    }
                },
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true,
                    },
                    safe: true,
                    autoprefixer: false
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.(css|less)/,
                loader: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
                // loader: 'css-loader',
                // options: {
                //     modules: {
                //         localIdentName: '[name]-[local]-[hash:8]'
                //     }
                // }
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css?[contenthash:8]',
        }),
    ],
})
