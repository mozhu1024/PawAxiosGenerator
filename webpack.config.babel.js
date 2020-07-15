const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');
const PACKAGE = require('./package.json')

const name = PACKAGE.config.extension_name
const identifier = PACKAGE.config.extension_identifier

const config = {
    mode: 'production',
    target: 'node-webkit',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, `./dist/${identifier}`),
        filename: `${name}.js`
    },
    module: {
        rules: [{
            test: /\.(js|ts)$/,
            use: 'babel-loader',
            exclude: /node_modules/,
        }, ]
    },

    resolve: {
        extensions: ['.ts', '.js', '.d.ts'],
    },

    devtool: 'inline-source-map',

    optimization: {
        minimize: false
    },

    plugins: [
        new CopyPlugin({
            patterns: [{
                from: path.join(__dirname, 'LICENSE'),
                to: './'
            }, {
                from: path.join(__dirname, 'README.md'),
                to: './'
            }, ],
        })
    ]
}

module.exports = config