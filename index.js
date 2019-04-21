require('colors');
const path = require('path');
const puppeteer = require('puppeteer');
const $ = require('puppeteer-domkit');
const commands = require('./lib/commands');
const utils = require('./lib/utils');
module.exports = async () => {
	let browser = await puppeteer.launch({
		headless: false,
		args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
	});

	let page = (await browser.pages())[0];

	await $.setBrowser(browser);

	console.log($.__for_recorder__);

	page.on('load', (response) => {
		page.evaluate((allCommands) => {
			window.ALL_COMMANDS = allCommands;
		}, $.__for_recorder__);
		page.addScriptTag({
			path: path.join(__dirname, './browser/pdr-gui.js')
		});
	});

	page.on('close', () => {
		browser.close();
	});

	page.on('console', (msg) => {
		const jsh = msg.args();
		for (let x of jsh) {
			const text = x.toString().replace(/JSHandle\:/g, '');
			if (text.indexOf('[pdr-command]') === 0) {
				const cmd = text.replace(/\[pdr\-command\]/, '').split('=');
				commands[cmd[0]] && commands[cmd[0]](decodeURIComponent(cmd[1]));
			}
		}
	});
	page.goto('https://news.to8to.com/index.php/article/142405.html');
};

module.exports.default = module.exports;
