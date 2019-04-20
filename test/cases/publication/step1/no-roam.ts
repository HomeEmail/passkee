const actions = require('../../../actions')
import utils from '@/utils'
const { Before, After } = require('../../global')
declare var page: any
module.exports = () => {
    before(async () => {
        await Before()

        await utils.mock({
            '/design/recommend-status': 'never-published',
            '/designer/design/list': 'index-0-can-publish',
            '/designer/recommend/check': 'no-roam'
        })

        await actions.plan.list.goto()

        await actions.plan.list.openPublicationDailog()
    })

    after(async () => {
        await After()
    })

    it('显示 X', async () => {
        await page.waitForSelector(
            '.publication-dialog .condition .icon-edit_cancel1.red'
        )
    })

    it('显示【去生成】', async () => {
        await page.waitForSelector('.publication-dialog .condition a')
    })

    it('【去生成】弹层', async () => {
        await actions.plan.openGenRoam('.publication-dialog .condition a')
    })

    it('不能下一步 ', async () => {
        await page.click('.publication-dialog .generate-btn.disabled-btn')
        await page.waitFor(100)
        await page.waitForSelector('.publication-dialog .publication-step1')
    })
}
