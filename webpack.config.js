const webpack = require("@nativescript/webpack");
// const NsVueTemplateCompiler = require('nativescript-vue-template-compiler')

module.exports = (env) => {
	webpack.init(env);


	// NsVueTemplateCompiler.registerElement('BottomSheet', () => require('@nativescript-community/ui-persistent-bottomsheet').BottomSheet, {
	// 	model: {
	// 	  prop: 'stepIndex',
	// 	  event: 'stepIndexChange'
	// 	}
	//   })
	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	return webpack.resolveConfig();
};
