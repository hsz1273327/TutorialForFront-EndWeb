const webpack = require("@nativescript/webpack")
// import the plugin first
const { ProvidePlugin } = require('webpack')
module.exports = (env) => {
	webpack.init(env)
	// Learn how to customize:
	// https://docs.nativescript.org/webpack
	let config = webpack.resolveConfig()
	return config
}
