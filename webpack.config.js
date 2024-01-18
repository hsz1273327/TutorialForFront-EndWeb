const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack
	// webpack.chainWebpack((config) => {
	// 	config.module
	// 	  .rule('styl')
	// 	  .use('stylus-loader')
	// 	  .loader('stylus-loader')
	// 	  .options({
	// 	  })
	//   })

	return webpack.resolveConfig();
};
