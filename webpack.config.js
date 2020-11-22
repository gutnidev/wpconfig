const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('IS DEV: test', isDev);
console.log('IS PROD: ', isProd);

module.exports = {
    context: path.resolve(__dirname, 'src'), //? Папка поиска по умолчанию

    entry: {
        main: ['@babel/polyfill', './index.js'],
        analytics: './analytics.ts',
    },

    output: {
        filename: '[name]_[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
        alias: {
            '@models': path.resolve(__dirname, './src/models'),
            '@': path.resolve(__dirname, './src'),
        },
    },

    optimization: {
        splitChunks: {
            chunks: "all",
        },
        minimize: isProd,
        minimizer: [
            new TerserJSPlugin(),
            new OptimizeCSSAssetsPlugin()
        ],
    },

    devServer: {
        compress: true,
        port: 8080,
        bonjour: true,
        host: '192.168.1.30',
        contentBase: path.join(__dirname, 'dist'),
    },

    devtool: isDev ? 'source-map' : false,

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            showErrors: true,
            minify: isProd,
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/favicon.png'), to: path.resolve(__dirname, 'dist') },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash].css',
        }),
    ],

    module: {
        rules: [
            //? CSS loader
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true,
                        },
                    },
                    'css-loader',
                ],
            },
            //? SASS loader
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true,
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            //? Images loader
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: ['file-loader'],
            },
            //? JS Babel loader
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "useBuiltIns": "entry"
                                }
                            ]
                        ],
                        plugins: [
                            [
                                '@babel/plugin-proposal-class-properties'
                            ],
                        ],
                    },
                },
            },
            //? TS Babel loader
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "@babel/preset-env",
                            '@babel/preset-typescript'
                        ],
                        plugins: [
                            [
                                "@babel/plugin-proposal-class-properties",
                                { "loose": true }
                            ]
                        ],
                    },
                },
            },
            //? Fonts loader
            {
                test: /\.(ttf|woff2?|eot)$/,
                use: ['file-loader'],
            },
            //? XML loader
            {
                test: /\.xml$/,
                use: ['xml-loader'],
            },
            //? CSV loader
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
        ],
    }, //? rules(loaders)
};