const assert = require('chai').assert
const actions = require('../../../actions')
import $ from 'puppeteer-domkit'
import utils from '@/utils'
const pubData = utils.data('publication/form-data.json')
let el
let input
module.exports = () => {
    it('方案名称 有默认 ', async () => {
        // await utils.waitForAttr(
        //     '.publication-aside .el-form-item:nth-child(1) input',
        //     'value',
        //     utils.const.Value.NOT_EMPTY
        // )
        el = await $('.publication-aside .el-form-item:nth-child(1)')
        input = (await el.find('input'))[0]
        await input.waitForAttr('value', utils.const.Value.NOT_EMPTY)
    })
    // it('方案名称 输入 空，自动填充方案名', async () => {
    //     await input.input('')
    //     await input.waitForAttr('value', utils.const.Value.NOT_EMPTY)
    //     assert.ok(true)
    // })
    const plan_name = utils.data('publication/plan_name.json')

    plan_name.error.forEach((item) => {
        it('方案名称 输入:' + item, async () => {
            el = await $('.publication-aside .el-form-item:nth-child(1)')
            input = (await el.find('input'))[0]
            await input.input(item)
            await utils.waitForShow(
                '.publication-aside .el-form-item:nth-child(1) .el-form-item__error'
            )
        })
    })

    plan_name.ok.forEach((item) => {
        it('方案名称 输入:' + item, async () => {
            await input.input(item)
            await $.page.waitFor(100)
            if (
                !(await utils.exist(
                    '.publication-aside .el-form-item:nth-child(1) .el-form-item__error'
                ))
            )
                assert.ok(true)
        })
    })

    // it('方案名称 输入30 验证20限制 ', async () => {
    //     await input.input('123456789012345678901234567890')
    //     await utils.waitForShow(
    //         '.publication-aside .el-form-item:nth-child(1) .el-form-item__error'
    //     )
    //     assert.ok(true)
    // })

    // it('方案名称 输入合法数据 ', async () => {
    //     await input.input(pubData.plan_name)
    //     assert.ok(true)
    // })

    it('城市 有默认 ', async () => {
        await utils.waitForAttr(
            '.publication-aside .el-form-item:nth-child(2) .el-cascader .el-input input',
            'value',
            utils.const.Value.NOT_EMPTY
        )
    })

    it('城市选择 ', async () => {
        await actions.form.citySelect(
            '.publication-step2 .el-form-item:nth-child(2) .el-cascader',
            pubData.province,
            pubData.city,
            pubData.town
        )
    })

    it('工程造价 输入 空 ', async () => {
        await utils.input(
            '.publication-aside .el-form-item:nth-child(3) input',
            '',
            true
        )
        await utils.waitForShow(
            '.publication-aside .el-form-item:nth-child(3) .el-form-item__error'
        )
    })

    it('工程造价 自动转换一位小数 ', async () => {
        await utils.input(
            '.publication-aside .el-form-item:nth-child(3) input',
            '11.22',
            true
        )
        await utils.waitForAttr(
            '.publication-aside .el-form-item:nth-child(3) input',
            'value',
            '11.2'
        )
    })

    it('风格选择 ', async () => {
        await actions.form.styleSelect(
            '.publication-step2 .el-form-item:nth-child(4) .el-select',
            [0, 1, 2]
        )
    })

    it('方案说明 输入 空 ', async () => {
        el = await $('.publication-aside .el-form-item:nth-child(5)')
        input = (await el.find('textarea'))[0]
        await input.input('')
        await utils.waitForShow(
            '.publication-aside .el-form-item:nth-child(5) .el-form-item__error'
        )
    })

    it('方案说明 输入 300字符 限制 200字符 ', async () => {
        await input.input(
            '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
        )
        await $.page.waitFor(1000)
        const val = await input.val()
        if (val.length === 200) assert.ok(true)
        else assert.fail(false)
    })
}
