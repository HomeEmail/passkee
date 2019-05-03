require('colors');
const path = require('path');
const puppeteer = require('puppeteer');
const $ = require('puppeteer-domkit');
const utils = require('../lib/utils');
const globalEvent = require('./src/globalEvent');
const connection = require('./src/connection');
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
		page.on('load', async (response) => {
			await page.evaluate(() => {
				let ifr = document.createElement('iframe');
				ifr.src = 'about:blank';
				ifr.name = 'passkee-ifr';
				ifr.id = 'passkee-ifr';
				ifr.frameborder = 0;
				ifr.border = 0;
				ifr.marginheight = 0;
				ifr.marginwidth = 0;
				ifr.scrolling = 'no';
				ifr.allowtransparency = 'yes';
				document.querySelector('html').appendChild(ifr);
			});
			const ifr = await page.frames().find((frame) => frame.name() === 'passkee-ifr');

			ifr.addScriptTag({
				path: path.join(__dirname, '../browser/passkee-gui.js')
			});

			$.gui = ifr;

			page.addScriptTag({
				path: path.join(__dirname, '../browser/passkee-listener.js')
			});

			globalEvent.listen();
		});

		connection.listen();

		page.on('close', () => {
			browser.close();
		});
	}
};

module.exports.default = module.exports;
