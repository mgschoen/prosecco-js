const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = [{
    mode: 'production',
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
        })
    ]
},{
    mode: 'production',
    entry: './src/index-inline.js',
    output: {
        filename: 'bundle-inline.js',
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
