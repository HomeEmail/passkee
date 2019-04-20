import $ from 'puppeteer-domkit'
import { expect } from 'chai'
import utils from '@/utils'
// import actions from '@/actions'
export default () => {
    before(async () => {
        await utils.routeTo('/msgcenter/notice')
    })

    // after(async () => {
    // })

    it('列表-无数据，显示暂无系统通知', async () => {
        await utils.mock({
            '/designer/user/notice/system': '0-items'
        })
        await $.reload()
        await $('.no-msg').waitFor.exist(true)
    })

    it('列表-有数据，显示列表', async () => {
        await utils.mock({
            '/designer/user/notice/system': '1-items'
        })
        await $.reload()
        await $('.no-msg').waitFor.exist(false)
    })

    it('列表-分页数据统计', async () => {
        await utils.mock({
            '/designer/user/notice/system': '100-items'
        })
        await $.reload()
        await $('.msg-pagination .el-pagination__total').waitFor.text(
            '共 100 条'
        )
    })

    it('列表-分页-点击下一页', async () => {
        await $('.msg-pagination .btn-next').click()
        await $.waitFor.response('/designer/user/notice/system')
        await $('.msg-pagination .el-pager>.number.active').waitFor.text('2')
    })
    it('列表-分页-点击上一页', async () => {
        await $('.msg-pagination .btn-prev').click()
        await $.waitFor.response('/designer/user/notice/system')
        await $('.msg-pagination .el-pager>.number.active').waitFor.text('1')
    })

    it('列表-分页-点击数字页', async () => {
        await $('.msg-pagination .el-pager>li:eq(1)').click()
        await $.waitFor.response('/designer/user/notice/system')
        await $('.msg-pagination .el-pager>.number.active').waitFor.text('2')
    })

    it('列表-分页-输入跳入页', async () => {
        await $('.msg-pagination .el-pagination__jump input').input('3')
        await $.waitFor.response('/designer/user/notice/system')
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
        await $.waitFor.response('/designer/user/notice/system')
    })
    it('列表-分页-不需要分页的时候，隐藏分页', async () => {
        await utils.mock({
            '/designer/user/notice/system': '0-items'
        })
        await $.reload()
        await $('.msg-pagination .el-pagination__total').waitFor.exist(false)
    })

    it('列表-过滤项，默认选中全部，检测全部数据', async () => {
        await utils.mock({
            '/designer/user/notice/system': '100-items'
        })
        await $.reload()
        await $('.filter-tabs .btn-all.active').waitFor.exist(true)
    })

    it('列表-过滤项，选中第2项，全部取消选中', async () => {
        await $('.filter-tabs .tab-btn:eq(1)').click()
        await $.page.click('[test-ppt-mark="0"]')
        await $('.filter-tabs .btn-all.active').waitFor.exist(false)
        await $('.filter-tabs .tab-btn:eq(1)').waitFor.hasClass('active', true)
    })

    it('列表-过滤项，选中第3项，分页数状态-重置', async () => {
        await $('.msg-pagination .el-pager>li:eq(1)').click()
        await $('.filter-tabs .tab-btn:eq(2)').click()
        await $('.msg-pagination .el-pager>.number.active').waitFor.text('1')
    })

    it('列表-过滤项，再选中第3项，2、3项都选中状态', async () => {
        await $('.filter-tabs .tab-btn.active').expect.length(2)
    })

    it('列表-过滤项，选中全部，其他项取消选中', async () => {
        await $('.filter-tabs .btn-all').click()
        await $('.filter-tabs .tab-btn.active').waitFor.length(1)
        await $('.filter-tabs .btn-all.active').waitFor.exist(true)
    })

    it('列表项-缺数据不影响列表展示', async () => {
        await utils.mock({
            '/designer/user/notice/system': 'lack-fields'
        })
        await $.reload()
        await $('.msg-list .msg-item').waitFor.length(4)
    })

    it('列表项-日期时间显示', async () => {
        const text = await $('.msg-list .msg-item .date').text()
        expect(text.trim()).contains(' ')
    })
}
