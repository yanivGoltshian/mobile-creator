/* global __dirname, process */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MinimalSvtstoreWebpackPlugin = require('minimal-svgstore-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const babelOptions = require('./node_modules/pb-node-modules/compilers/babelrc.json');

module.exports = function webpackConfig(env = {}) {
    const ENV = env.NODE_ENV || 'local';
    const isProd = ENV !== 'local';
    const isLocal = ENV === 'local';
    const ifProd = x => isProd && x;
    const ifLocal = x => isLocal && x;
    const ifAnalyzer = x => env.analyze && x;
    const removeEmpty = arr => arr.filter(Boolean);

    const compilationPaths = [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'demo'),
        /node_modules(\/|\\)pb-client-modules/,
        /node_modules(\/|\\)pb-viewer-components/,
    ];

    const config = {
        entry: {
            'mobile-creator': './src/index.js',
        },
        mode: isLocal ? 'development' : 'production',
        output: {
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
            filename: '[name].js',
        },
        module: {
            rules: removeEmpty([
                {
                    test: /\.jsx?$/,
                    exclude: path.resolve(__dirname, 'src'),
                    enforce: 'pre',
                    use: 'source-map-loader',
                },
                {
                    include: compilationPaths,
                    test: /\.jsx?$/,
                    use: {
                        loader: 'babel-loader',
                        options: babelOptions,
                    },
                },
                {
                    test: /\.s?css$/,
                    include: compilationPaths,
                    sideEffects: true,
                    use: [
                        isLocal ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                sourceMap: true,
                                importLoaders: 1,
                                minimize: false,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => autoprefixer(),
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths: [
                                    'node_modules/pb-styles',
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: 'minimal-svgstore-loader',
                },
            ]),
        },
        optimization: {
            noEmitOnErrors: true,
            minimizer: removeEmpty([
                // ifProd(new UglifyJsPlugin({
                //     cache: true,
                //     parallel: true,
                //     uglifyOptions: {
                //         compress: false,
                //         ecma: 6,
                //         mangle: true,
                //     },
                //     sourceMap: true,
                // })),
            ]),
        },
        plugins: removeEmpty([
            ...([
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': `'${ENV}'`
                }),
                new MiniCssExtractPlugin({
                    filename: '[name].css',
                    disable: isLocal,
                }),
                new MinimalSvtstoreWebpackPlugin({
                    prefix: 'pb-icon-',
                    fileName: 'mobile-creator.js',
                }),
                new webpack.ProvidePlugin({
                    Promise: 'promise-polyfill',
                    fetch: 'unfetch',
                }),
                ifLocal(new HtmlWebpackPlugin({
                    template: './demo/demo-index.ejs',
                    inject: false,
                })),
                ifAnalyzer(new BundleAnalyzerPlugin()),
            ] || []),
        ]),

        node: {
            global: true,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false,
            setImmediate: false,
        },

        devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',

        devServer: {
            port: process.env.PORT || 3030,
            host: 'local-mobile-creator.playbuzz.com',
            publicPath: '/',
            contentBase: './',
            historyApiFallback: true,
            open: true,
            openPage: '',
            https: {
                cert: fs.readFileSync('./node_modules/pb-node-modules/cert/playbuzz-wildcard.crt'),
                key: fs.readFileSync('./node_modules/pb-node-modules/cert/playbuzz-wildcard.rsa'),
            },
        }
    };

    return config;
};
