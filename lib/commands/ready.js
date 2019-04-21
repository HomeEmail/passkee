const path = require('path');
const $ = require('puppeteer-domkit');
const cases = require('../cases');
module.exports = async (param) => {
	const res = cases.read(path.join(__dirname, '../../test/cases'));
	$.page.evaluate(function(res) {
		setTimeout(() => {
			window.PDRGUI.category.data = res;
		}, 100);
		// window.open(
		// 	'about:blank',
		// 	'newwindow',
		// 	'height=1000, width=800, top=100, left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
		// );
	}, res);
};
