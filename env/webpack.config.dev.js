const merge = require('webpack-merge')
const base = require('./webpack.config.base.js')

module.exports = merge(base, {
    devtool: 'eval-source-map',
    module: {
        rules: [{
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
    }
})