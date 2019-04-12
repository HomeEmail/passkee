require('colors');
const webpack = require('webpack');
const BuildConf = require('./webpack-conf/build');
const path = require('path');
const fs = require('fs-extra');

console.log(`正在构建项目`);
webpack(BuildConf(), function(err, stats) {
	if (!err) {
		console.log(`成功构建项目!`.green);
	} else {
		throw err;
	}
});
