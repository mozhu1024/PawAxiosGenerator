const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './app.js',
    output: {
        path: __dirname,
        filename: 'AxiosGenerator.js'
    }
}