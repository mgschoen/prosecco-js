const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = [{
    mode: 'development',
    entry: './src/index-static.js',
    output: {
        filename: 'prosecco.js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        contentBase: './dist'
    },

    plugins: [
        new CleanWebpackPlugin({
            claenOnceBeforeBuildPatterns: ['dist']
        })
    ]
},{
    mode: 'production',
    entry: './src/index-static.js',
    output: {
        filename: 'prosecco.min.js',
        path: path.resolve(__dirname, 'dist')
    },

    devServer: {
        contentBase: './dist'
    },

    plugins: [
        new CleanWebpackPlugin({
            claenOnceBeforeBuildPatterns: ['dist']
        })
    ]
}]
