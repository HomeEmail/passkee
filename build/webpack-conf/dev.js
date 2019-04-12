const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('../common/webpack-utils');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseWebpackConf = require('./base');
const path = require('path');
const fs = require('fs');

const guiPath = path.join(__dirname, '../../gui');

const entry = {
		index: path.join(guiPath, 'index.js')
	},
	plugins = [
		new HtmlWebpackPlugin({
			title: 'puppeteer-domkit-recorder',
			cache: false,
			filename: `index.html`,
			inject: 'body'
		}),
		new webpack.HotModuleReplacementPlugin()
	];

module.exports = merge(baseWebpackConf, {
	entry,
	resolve: {
		alias: {}
	},
	module: {
		rules: utils.styleLoaders({
			sourceMap: true,
			extract: false
		})
	},
	output: {
		path: guiPath,
		filename: 'gui.js?[hash:7]'
	},
	devtool: '#source-map',
	watch: true,
	mode: 'development',
	devServer: {
		port: 3030,
		open: true
	},
	plugins
});
