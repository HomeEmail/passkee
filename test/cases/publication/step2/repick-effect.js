const expect = require('chai').expect
const actions = require('../../../actions')
import utils from '@/utils'
import $ from 'puppeteer-domkit'
const { before, after } = require('../../global')
const path = require('path')

module.exports = () => {
    it('重选效果图 ', async () => {
        await $.page.click('.publication-dialog .cover .btns button')
        await $.page.waitForSelector('.publication-select-effect', {
            visible: true
        })
        await $.page.waitFor(600)
        expect(true).to.be.true
    })

    it('点击图片 选择', async () => {
        await $.page.click('.publication-select-effect .item:nth-child(2) img')
        await $.page.waitFor(100)
        expect(
            await $.page.$eval(
                '.publication-select-effect .item:nth-child(2) [type=checkbox]',
                (el) => el.checked
            )
        ).to.be.true
    })

    it('验证单选 ', async () => {
        await $.page.click('.publication-select-effect .item:nth-child(3) img')
        await $.page.waitFor(100)
        expect(
            !(await $.page.$eval(
                '.publication-select-effect .item:nth-child(2) [type=checkbox]',
                (el) => el.checked
            ))
        ).to.be.true
    })

    it('提交 ', async () => {
        const img = await $.page.$eval(
            '.publication-select-effect .item:nth-child(3) img',
            (el) => el.src
        )

        await utils.click('.publication-select-effect .footer .confirm-btn')
        await $.page.waitFor(600)
        const img2 = await $.page.$eval(
            '.publication-dialog .publication-other-imgs .cover img',
            (el) => el.src
        )
        expect(
            img.split('.jpg')[0] &&
                img.split('.jpg')[0] === img2.split('.jpg')[0]
        ).to.be.true
    })

    it('上传 ', async () => {
        const el = await $.page.$(
            '.publication-dialog .material-upload-btn [type=file]'
        )
        await el.uploadFile(await utils.data('images/1.jpg'))
        const res = await $.page.waitForResponse(
            (response) =>
                response.url().indexOf('/image/upload') > -1 &&
                response.status() === 200
        )
        const data = await res.json()

        await $.page.waitFor(100)

        const img2 = await $.page.$eval(
            '.publication-dialog .publication-other-imgs .cover img',
            (el) => el.src
        )

        expect(img2.indexOf(data.data.img_id) > -1).to.be.true
    })
}
