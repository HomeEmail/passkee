// const utils = require('@/utils')
const $ = require('puppeteer-domkit')
require('colors')
const puppeteer = require('puppeteer')
const pdr = require('../serve/index')

describe('puppeteer-domkit', () => {
    before(async () => {
        await pdr('https://yun.to8to.com/login')
    })
    after(() => {
        // setTimeout(() => {
        // 	$.browser.close();
        // }, 20000);
    })
    it('test', async () => {})
})
