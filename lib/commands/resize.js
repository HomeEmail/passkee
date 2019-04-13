const $ = require('puppeteer-domkit');
module.exports = async (param) => {
	param = param.split(',');
	await $.page.setViewport({
		width: parseInt(param[0]),
		height: parseInt(param[1]),
		deviceScaleFactor: 3
	});
};
