import $ from 'puppeteer-domkit'
import utils from '@/utils'
// import actions from '@/actions'
export default () => {
    // before(async () => {})
    // after(async () => {})

    it('进入页面 有新消息 顶部显示红点', async () => {
        await utils.mock({
            '/designer/user/notice/number': 'has'
        })
        await $.page.reload()
        await $('.login-box .red-dot').waitFor.exist(true)
    })

    it('侧栏显示红点', async () => {
        await $('.main-sidebar .red-dot').waitFor.exist(true)
    })

    it('进入系统通知，公告显示红点', async () => {
        await utils.routeTo('/msgcenter/notice')
        await $('.sysnotice>.navbar>.red-dot').waitFor.exist(true)
    })

    it('进入公告，所有红点消失', async () => {
        await utils.routeTo('/msgcenter/announce')
        await $('.login-box .red-dot').waitFor.exist(false)
        await $('.main-sidebar .red-dot').waitFor.exist(false)
        await $('.sysnotice>.navbar>.red-dot').waitFor.exist(false)
    })

    it('进入页面 没有新消息 不显示红点', async () => {
        await utils.mock({
            '/designer/user/notice/number': 'none'
        })
        await utils.routeTo('/msgcenter/notice')
        await $.page.reload()
        await $.page.waitFor(1000)
        await $('.login-box .red-dot').waitFor.exist(false)
        await $('.main-sidebar .red-dot').waitFor.exist(false)
        await $('.sysnotice>.navbar>.red-dot').waitFor.exist(false)
    })

    it('切换路由 无新消息 不显示红点', async () => {
        await utils.routeTo('/plan/list')
        await $.page.waitFor(1000)
        await $('.login-box .red-dot').waitFor.exist(false)
        await $('.main-sidebar .red-dot').waitFor.exist(false)
    })

    it('切换路由 有新消息 显示红点', async () => {
        await utils.mock({
            '/designer/user/notice/number': 'has'
        })
        await utils.routeTo('/msgcenter/notice')
        await $.page.waitFor(1000)
        await $('.login-box .red-dot').waitFor.exist(true)
        await $('.main-sidebar .red-dot').waitFor.exist(true)
        await $('.sysnotice>.navbar>.red-dot').waitFor.exist(true)
    })
}
