require('colors');
const utils = require('../common/webpack-utils');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./base');
const path = require('path');

module.exports = () => {
	const entry = { index: path.join(__dirname, '../../gui/index.js') };

	return merge(baseWebpackConfig, {
		mode: 'production',
		entry,
		module: {
			rules: utils.styleLoaders({
				sourceMap: false,
				extract: false
			})
		},
		devtool: false,
		output: {
			path: path.join(__dirname, '../../browser'),
			publicPath: '',
			filename: `GUI.js`,
			library: 'puppeteer-domkit-recorder',
			libraryTarget: 'umd',
			umdNamedDefine: true
		},
		devtool: false
	});
};
