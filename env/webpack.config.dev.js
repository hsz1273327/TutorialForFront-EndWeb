const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.config.base.js')
const env = require("./conf/dev.json")

module.exports = merge(base,{
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }]
            },
            {
                test: /\.styl$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "stylus-loader"
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        })
    ]
})