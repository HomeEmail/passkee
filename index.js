require('colors');
const path = require('path');
const puppeteer = require('puppeteer');
const $ = require('puppeteer-domkit');
const commands = require('./lib/commands');
module.exports = async () => {
	let browser = await puppeteer.launch({
		headless: false,
		args: [ '--no-sandbox', '--disable-setuid-sandbox', '--start-fullscreen' ]
	});

	let page = (await browser.pages())[0];

	await $.setBrowser(browser);

	page.on('load', (response) => {
		page.addScriptTag({
			path: path.join(__dirname, './browser/pdr-gui.js')
		});
	});

	page.on('console', (msg) => {
		const jsh = msg.args();
		for (let x of jsh) {
			const text = x.toString().replace(/JSHandle\:/g, '');
			if (text.indexOf('[pdr-command]') === 0) {
				const cmd = text.replace(/\[pdr\-command\]/, '').split('=');
				console.log(` ${cmd} `.yellow);
				commands[cmd[0]] && commands[cmd[0]](decodeURIComponent(cmd[1]));
			}
		}
	});
	page.goto('https://www.youku.com/');
};
module.exports.default = module.exports;
