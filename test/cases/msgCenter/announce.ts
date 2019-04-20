import $ from 'puppeteer-domkit'
import { expect } from 'chai'
import utils from '@/utils'
// import actions from '@/actions'
export default () => {
    before(async () => {
        await utils.routeTo('/msgcenter/announce')
        $.page.coverage.startJSCoverage()
        $.page.coverage.startCSSCoverage()
    })

    after(async () => {
        const [jsCoverage, cssCoverage] = await Promise.all([
            $.page.coverage.stopJSCoverage(),
            $.page.coverage.stopCSSCoverage()
        ])

        let totalBytes = 0
        let usedBytes = 0
        const coverage = [...jsCoverage, ...cssCoverage]

        for (const entry of coverage) {
            if (
                entry.url.includes('src/sub_modules/admin/store/announce.ts') ||
                entry.url.includes(
                    'src/sub_modules/admin/views/msgCenter/Announce.vue'
                ) ||
                entry.url.includes(
                    'src/sub_modules/admin/views/msgCenter/components'
                )
            ) {
                totalBytes += entry.text.length
                for (const range of entry.ranges) {
                    usedBytes += range.end - range.start - 1
                }
            }
        }
        console.log(`Bytes used: ${(usedBytes / totalBytes) * 100}%`)
    })

    // after(async () => {
    // })

    it('列表-无数据，显示暂无公告', async () => {
        await utils.mock({
            '/designer/user/notice/announcement': '0-items'
        })
        await $.reload()
        await $('.no-msg').waitFor.exist(true)
    })

    it('列表-有数据，显示列表', async () => {
        await utils.mock({
            '/designer/user/notice/announcement': '1-items'
        })
        await $.reload()
        await $('.no-msg').waitFor.exist(false)
    })

    it('列表-分页-分页数据统计', async () => {
        await utils.mock({
            '/designer/user/notice/announcement': '100-items'
        })
        await $.reload()
        await $('.msg-pagination .el-pagination__total').waitFor.text(
            '共 100 条'
        )
    })
    it('列表-分页-点击下一页', async () => {
        await $('.msg-pagination .btn-next').click()
        await $.waitFor.response('/designer/user/notice/announcement')
        await $('.msg-pagination .el-pager>.number.active').waitFor.text('2')
    })
    it('列表-分页-点击上一页', async () => {
        await $('.msg-pagination .btn-prev').click()
        await $.waitFor.response('/designer/user/notice/announcement')
        await $('.msg-pagination .el-pager>.number.active').waitFor.text('1')
    })

    it('列表-分页-点击数字页', async () => {
        await $('.msg-pagination .el-pager>li:eq(1)').click()
        await $.waitFor.response('/designer/user/notice/announcement')
        await $('.msg-pagination .el-pager>.number.active').waitFor.text('2')
    })

    it('列表-分页-输入跳入页', async () => {
        await $('.msg-pagination .el-pagination__jump input').input('3')
        await $.waitFor.response('/designer/user/notice/announcement')
        await $('.msg-pagination .el-pager>.number.active').waitFor.text('3')
    })

    it('列表-分页-切换每页数量', async () => {
        await $('.el-pagination__sizes .el-select').click({
            delay: 100,
            forShow: '.el-select-dropdown.el-popper'
        })
        await $('.el-select-dropdown.el-popper:visible')
            .find('.el-select-dropdown__item:eq(1)')
            .click()
        await $.waitFor.response('/designer/user/notice/announcement')
    })

    it('列表-分页-不需要分页的时候，隐藏分页', async () => {
        await utils.mock({
            '/designer/user/notice/system': '0-items'
        })
        await $.reload()
        await $('.msg-pagination .el-pagination__total').waitFor.exist(false)
    })

    it('列表项-缺数据不影响列表展示', async () => {
        await utils.mock({
            '/designer/user/notice/announcement': 'lack-fields'
        })
        await $.reload()
        await $('.msg-list .msg-item').waitFor.length(5)
    })

    it('列表项-日期时间显示', async () => {
        const text = await $('.msg-list .msg-item .date').text()
        expect(text.trim()).contains(' ')
    })

    it('列表项-点击公告图，显示预览弹框', async () => {
        await $('.msg-list .msg-item .image>img:eq(0)').click()
        await $('.tu-preview-img-dialog').waitFor.visible(true)
    })

    it('列表项-点击预览图片，无反应', async () => {
        await $('.tu-preview-img-dialog .el-dialog__body img').click()
        await $('.tu-preview-img-dialog').waitFor.visible(true)
    })

    it('列表项-点击图片周边，关闭预览弹框', async () => {
        await $('.el-dialog__wrapper').click()
        await $('.tu-preview-img-dialog').waitFor.visible(false)
    })

    it('列表项-点击立即参与，打开新页面', async () => {
        await $('.msg-list .msg-item .open-link').click({
            delay: 1000,
            forTarget: 'www.baidu.com',
            closeTarget: true
        })
    })
}
