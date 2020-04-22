const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'bundle-[hash].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../public'), //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true,
        hot: true
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: path.resolve(__dirname, '../node_modules'),
                include: path.resolve(__dirname, '../src')
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/i,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: '[path][name].[ext]?[hash:6]!./dir/file.png'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.tmpl.html') //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载插件
        new CleanWebpackPlugin({
            verbose: true,
            dry: false
        })
    ]
}