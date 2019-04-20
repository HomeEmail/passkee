const assert = require('chai').assert
const actions = require('../../../actions')
import utils from '@/utils'
import $ from 'puppeteer-domkit'
module.exports = () => {
    it('点击按钮 弹出弹框 ', async () => {
        await $.page.waitFor(500)
        await utils.click(
            '.publication-dialog .publication-roam .roam-header .btn',
            {
                forShow: '.publication-select-roam'
            }
        )
    })

    it('查看全屋漫游 ', async () => {
        await actions.plan.openRoam(
            '.publication-select-roam .item:nth-child(2) a'
        )
        // 等待加载中弹层隐藏
        await $.page.waitFor(1000)
    })

    it('生成全屋漫游弹框 ', async () => {
        await actions.plan.openGenRoam(
            '.publication-select-roam .footer .redirect a'
        )
    })

    it('点击图片 选择', async () => {
        utils.click('.publication-select-roam .item:nth-child(2) img')
        await $.page.waitFor(100)
        if (
            await $.page.$eval(
                '.publication-select-roam .item:nth-child(2) [type=checkbox]',
                (el) => el.checked
            )
        ) {
        } else {
            assert.fail('点击图片 checkbox 没选中')
        }
    })

    it('验证单选 ', async () => {
        utils.click('.publication-select-roam .item:nth-child(3) img')
        await $.page.waitFor(100)
        if (
            !(await $.page.$eval(
                '.publication-select-roam .item:nth-child(2) [type=checkbox]',
                (el) => el.checked
            ))
        ) {
        } else {
            assert.fail('多选？')
        }
    })

    it('提交 ', async () => {
        const img = await $.page.$eval(
            '.publication-select-roam .item:nth-child(3) img',
            (el) => el.src
        )

        await utils.click('.publication-select-roam .confirm-btn')
        await $.page.waitFor(1000)
        const img2 = await $.page.$eval(
            '.publication-dialog .publication-roam .roam-body img',
            (el) => el.src
        )
        if (
            img.split('.jpg')[0] &&
            img.split('.jpg')[0] === img2.split('.jpg')[0]
        ) {
        } else {
            assert.fail('全屋漫游选择失败')
        }
    })
}
