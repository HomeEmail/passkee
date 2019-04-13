// const utils = require('@/utils')
const $ = require('puppeteer-domkit');
require('colors');
const puppeteer = require('puppeteer');
const pdr = require('../index');

describe('puppeteer-domkit', () => {
	before(async () => {
		await pdr();
	});
	after(() => {
		// setTimeout(() => {
		// 	$.browser.close();
		// }, 20000);
	});
	it('test', async () => {});
});
