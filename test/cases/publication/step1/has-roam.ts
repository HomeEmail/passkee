const actions = require('@/actions')
import utils from '@/utils'
import $ from 'puppeteer-domkit'
const { Before, After } = require('@/cases/global')

export default () => {
    before(async () => {
        await Before()

        await utils.mock({
            '/design/recommend-status': 'never-published',
            '/designer/design/list': 'index-0-can-publish',
            '/designer/recommend/check': 'has-roam'
        })

        await actions.plan.list.goto()
    })

    after(async () => {
        await After()
    })

    it('打开对话弹层 ', async () => {
        console.log(
            await $('body')
                .find('#app')
                .height()
        )

        const app = $('body').find('#app')

        await app.expect.attr('id', await app.attr('id'))

        await app.find('.userinfo').expect.hasClass('userinfo', true)

        // await $.waitFor.attr('#app', 'id', 'app', {
        //     timeout: 3000,
        //     delay: 1000
        // })

        await actions.plan.list.openPublicationDailog()
        await $.page.waitForSelector('.publication-dialog')
    })

    it('关闭对话弹层 ', async () => {
        await actions.publication.close()

        await actions.plan.list.openPublicationDailog()
    })

    it('显示打 √', async () => {
        await $.page.waitForSelector(
            '.publication-dialog .condition .icon-edit_save1'
        )
    })

    it('默认同意协议 可下一步', async () => {
        await $.page.click('.publication-dialog .generate-btn')
        await $.page.waitForSelector('.publication-dialog .publication-step2', {
            timeout: 1000
        })
    })

    it('不同意协议 不能下一步', async () => {
        await actions.publication.close()
        await actions.plan.list.openPublicationDailog()
        await $('.publication-dialog .agree .el-checkbox__inner').click()
        await $.page.waitFor(100)
        await $.page.click('.publication-dialog .generate-btn.disabled-btn')
        await $.page.waitFor(100)
        await $.page.waitForSelector('.publication-dialog .publication-step1')
    })
}
