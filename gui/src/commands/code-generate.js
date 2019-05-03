const path = require('path');
const $ = require('puppeteer-domkit');
const codeGenerator = require('../util/codeGenerator');
module.exports = (args) => {
	console.log('code-generate', args);
	if (args.type === 'request') {
		TNK.dispatch('network-list-change', 'networkList', (networkList) => {
			networkList.push(args.options);
			return networkList;
		});
	}
	codeGenerator.commandExec(args);
};
