const $ = require('puppeteer-domkit');
module.exports = async (args) => {
	await $.page.setViewport({
		width: args.width,
		height: args.height,
		deviceScaleFactor: 3
	});
};
