const expect = require('chai').expect
const actions = require('../../../actions')
import $ from 'puppeteer-domkit'
import utils from '@/utils'

module.exports = () => {
    it('展开 ', async () => {
        await $.page.click(
            '.publication-dialog .publication-roam-details .details-header'
        )
        await $.page.waitFor(500)
        const height = await $.page.$eval(
            '.publication-roam-details.open',
            (el) => el.style.height
        )
        expect(parseInt(height)).to.be.above(100)
    })
    it('收起 ', async () => {
        await $.page.click(
            '.publication-dialog .publication-roam-details .details-header'
        )
        await $.page.waitFor(500)
        const height = await $.page.$eval(
            '.publication-roam-details',
            (el) => el.style.height
        )
        expect(parseInt(height)).to.be.below(100)
    })
    it('查看全屋漫游 ', async () => {
        await $.page.click(
            '.publication-dialog .publication-roam-details .details-header'
        )
        await $.page.waitFor(500)
        await actions.plan.openAllView(
            '.publication-roam-details .item:nth-child(1) .img a'
        )
        // 等待加载中弹层隐藏
        await $.page.waitFor(1000)
        expect(true).to.be.true
    })

    it('编辑房间名 ', async () => {
        await $.page.click(
            '.publication-roam-details .item:nth-child(1) .title i',
            {
                forShow:
                    '.publication-roam-details .item:nth-child(1) .title input'
            }
        )

        await $.page.type(
            '.publication-roam-details .item:nth-child(1) .title input',
            'TEXT'
        )

        await utils.blur()

        await $.page.waitFor(100)

        const text = await $.page.$eval(
            '.publication-roam-details .item:nth-child(1) .title',
            (el) => el.innerText
        )

        expect(text).to.be.contains('TEXT')
    })
    it('输入描述300 验证限制250', async () => {
        await $.page.type(
            '.publication-roam-details .item:nth-child(1) .el-textarea textarea',
            '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
        )

        await utils.blur()

        await $.page.waitFor(100)

        const text = await $.page.$eval(
            '.publication-roam-details .item:nth-child(1) .el-textarea textarea',
            (el) => el.value
        )

        await $.page.waitFor(3000)

        expect(text.length === 250).to.be.true
    })
}
