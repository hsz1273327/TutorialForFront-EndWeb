const webpack = require("@nativescript/webpack");


module.exports = (env) => {
	webpack.init(env);

	// const NsVueTemplateCompiler = require('nativescript-vue-template-compiler')
	// NsVueTemplateCompiler.registerElement('BottomSheet', () => require('@nativescript-community/ui-persistent-bottomsheet').Pager, {
	// 	model: {
	// 	  prop: 'stepIndex',
	// 	  event: 'stepIndexChange'
	// 	}
	//   })
	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	return webpack.resolveConfig();
};
