const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {

    entry: {
        app: './src/app/index.js'
    },

    plugins: [
        new CleanWebpackPlugin(['../dist/']),
        new HtmlWebpackPlugin({
            title: 'Dungeon Crawler',
            template: './src/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.SourceMapDevToolPlugin()
    ],
    
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        contentBase: path.join(__dirname, '../dist/'),
        hot: false,
        inline: true,
        open: true,
        openPage: ''
    },

    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].bundle.js',
        sourceMapFilename: 'bundle.js.map',
        publicPath: '/dist/'
    },

}