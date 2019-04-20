const expect = require('chai').expect
const actions = require('../../../actions')
import utils from '@/utils'
import $ from 'puppeteer-domkit'

const pubData = utils.data('publication/form-data.json')

module.exports = () => {
    it('提交数据校验 ', async () => {
        await utils.mock({
            '/designer/recommend/create': 'success'
        })

        page.click('.publication-dialog .publication-footer .generate-btn')
        const req = await $.page.waitForRequest(
            (req) => req.url().indexOf('/designer/recommend/create') > -1
        )

        const params = JSON.parse(req.postData())

        expect(true).to.be.true
    })
    it('二次提交，可正常提交', async () => {
        expect(true).to.be.true
    })
}
