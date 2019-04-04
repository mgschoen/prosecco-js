const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        contentBase: './dist'
    },

    plugins: [
        new CleanWebpackPlugin({
            claenOnceBeforeBuildPatterns: ['dist']
        }),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
    ]
}