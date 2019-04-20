const assert = require('chai').assert
const actions = require('../../../actions')
import utils from '@/utils'
import $ from 'puppeteer-domkit'
const { before, after } = require('../../global')
const repickRoam = require('./repick-roam')
module.exports = () => {
    it('打开全屋漫游 ', async () => {
        await actions.plan.openRoam(
            '.publication-dialog .publication-roam .roam-body a'
        )
        // 等待加载中弹层隐藏
        await $.page.waitFor(1000)
    })

    describe('重选全屋漫游 ', repickRoam)
}
