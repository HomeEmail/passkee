import $ from 'puppeteer-domkit'
import utils from '@/utils'
// import actions from '@/actions'

export default () => {
    it('弹出广告信息', async () => {
        await reloadForAdDialog(
            {
                '/designer/advertisement/list': 'has-url-1-item'
            },
            true
        )
    })

    it('1个广告图，不显示锚点', async () => {
        await $('.home-ad-dialog .paging .dot').expect.length(0)
    })

    it('已配置链接的广告信息，进入详情', async () => {
        await $('.home-ad-dialog img')
            .eq(0)
            .click({
                forTarget: 'www.baidu.com',
                closeTarget: true,
                delay: 1000
            })
    })

    it('无配置链接的广告信息，点击图片无处理', async () => {
        await reloadForAdDialog(
            {
                '/designer/advertisement/list': 'no-url-1-item'
            },
            true
        )
        await $('.home-ad-dialog img')
            .eq(0)
            .click()
        if ((await $.browser.pages()).length > 1) {
            throw new Error('意外弹出新页面')
        }
    })

    it('关闭广告信息', async () => {
        await $('.home-ad-dialog .el-dialog__headerbtn').click({
            forHidden: '.home-ad-dialog'
        })
    })

    it('查看2个广告轮播', async () => {
        await reloadForAdDialog(
            {
                '/designer/advertisement/list': '2-items'
            },
            true
        )
        const adWidth = await $('.home-ad-dialog .ad').width()
        await $('.home-ad-dialog .ad .inner').waitFor.css(
            'left',
            -adWidth + 'px',
            { timeout: 4000, delay: 1000 }
        )
    })
    it('轮播广告有2个tab锚点', async () => {
        await $('.home-ad-dialog .paging .dot').expect.length(2)
    })

    it('点击锚点切换', async () => {
        const adWidth = await $('.home-ad-dialog .ad').width()
        const dots = $('.home-ad-dialog .paging .dot')
        await dots.eq(0).click({ y: 1 })
        await $('.home-ad-dialog .inner').waitFor.css('left', '0px', {
            timeout: 2000,
            delay: 1000
        })
        await dots.eq(1).click({ y: 1 })
        await $('.home-ad-dialog .inner').waitFor.css('left', -adWidth + 'px', {
            timeout: 2000,
            delay: 1000
        })
        //await $('.home-ad-dialog .paging .dot').expect.length(2)
    })
    it('鼠标移入停止轮播', async () => {
        await $.page.hover('.home-ad-dialog .ad')
        const left1 = await $('.home-ad-dialog .inner').css('left')
        await $.page.waitFor(2500)
        await $('.home-ad-dialog .inner').expect.css('left', left1)
        await $.page.waitFor(1000)
        await $('.home-ad-dialog .inner').expect.css('left', left1)
    })
    it('鼠标移出开始轮播', async () => {
        await $.page.mouse.move(0, 0, { steps: 3 })
        await $.page.waitFor(1000)
        const left = await $('.home-ad-dialog .ad').css('left')
        await $.page.waitFor(3000)
        await $('.home-ad-dialog .ad .inner').expect.css('left', left)
    })

    it.skip('大屏显示广告尺寸800px', async () => {
        //await $('.home-ad-dialog .paging .dot').expect.length(2)
    })

    it.skip('小屏显示广告尺寸700px', async () => {
        //await $('.home-ad-dialog .paging .dot').expect.length(2)
    })

    it('刷新不再显示已显示过的广告', async () => {
        await $.reload()
        await $.page.waitFor(2000)
        await $('.home-ad-dialog').expect.exist(false)
    })
    it('刷新只显示今天新增的广告', async () => {
        await reloadForAdDialog(
            {
                '/designer/advertisement/list': 'only-onpen-new-ad'
            },
            true
        )
    })
    it('点击弹框无反应', async () => {
        await $('.el-dialog__wrapper').click()
        await $('.home-ad-dialog').expect.visible(true)
    })
    it('无数据不显示', async () => {
        await reloadForAdDialog(
            {
                '/designer/advertisement/list': '0-items'
            },
            false
        )
    })
}

async function reloadForAdDialog(config, visible) {
    await utils.mock(config)
    await $.page.evaluate(() => {
        window.localStorage.DC_USER_DATA = ''
    })
    await $.page.reload({ waitUntil: 'load' })
    await $.page.waitFor(100)
    if (visible) {
        await $('.home-ad-dialog').waitFor.visible(true)
    } else {
        await $('.home-ad-dialog').expect.exist(false)
    }
}
