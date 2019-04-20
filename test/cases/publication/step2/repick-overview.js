const expect = require('chai').expect
const actions = require('../../../actions')
import utils from '@/utils'
import $ from 'puppeteer-domkit'
const { before, after } = require('../../global')
const path = require('path')

module.exports = () => {
    it('重选俯视图 ', async () => {
        await $.page.waitFor(1000)
        await $.page.click('.publication-dialog .over .btns .btn')
        await $.page.waitForSelector('.publication-select-overview', {
            visible: true
        })
        await $.page.waitFor(600)
        expect(true).to.be.true
    })

    it('点击图片 选择', async () => {
        await $.page.click(
            '.publication-select-overview .item:nth-child(2) img'
        )
        await $.page.waitFor(100)
        expect(
            await $.page.$eval(
                '.publication-select-overview .item:nth-child(2) [type=checkbox]',
                (el) => el.checked
            )
        ).to.be.true
    })

    it('验证单选 ', async () => {
        await $.page.click(
            '.publication-select-overview .item:nth-child(3) img'
        )
        await $.page.waitFor(100)
        expect(
            !(await $.page.$eval(
                '.publication-select-overview .item:nth-child(2) [type=checkbox]',
                (el) => el.checked
            ))
        ).to.be.true
    })

    it('提交 ', async () => {
        const img = await $.page.$eval(
            '.publication-select-overview .item:nth-child(3) img',
            (el) => el.src
        )

        await utils.click('.publication-select-overview .footer .confirm-btn')
        await $.page.waitFor(600)
        const img2 = await $.page.$eval(
            '.publication-dialog .publication-other-imgs .over img',
            (el) => el.src
        )
        expect(
            img.split('.jpg')[0] &&
                img.split('.jpg')[0] === img2.split('.jpg')[0]
        ).to.be.true
    })
}
