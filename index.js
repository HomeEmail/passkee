require('colors');
const path = require('path');
const puppeteer = require('puppeteer');
const $ = require('puppeteer-domkit');
const commands = require('./lib/commands');
const utils = require('./lib/utils');
const listenPptrEvent = require('./lib/listenPptrEvent');

module.exports = async () => {
	let browser = await puppeteer.launch({
		headless: false,
		//devtools: true,
		args: [ '--no-sandbox', '--disable-setuid-sandbox', '--app=http://yun.to8to.com/login' ]
		//args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
	});

	let page = (await browser.pages())[0];

	await $.setBrowser(browser);

	initPage();

	//page.goto('http://yun.to8to.com/login');

	function initPage() {
		page.on('load', (response) => {
			page.evaluate((allCommands) => {
				window.ALL_COMMANDS = allCommands;
			}, $.__for_recorder__);
			page.addScriptTag({
				path: path.join(__dirname, './browser/pdr-gui.js')
				// path: 'http://localhost:3030/gui.js?' + Date.now()
			});

			listenPptrEvent.on();
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
	}
};

module.exports.default = module.exports;
