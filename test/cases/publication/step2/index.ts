import utils from '@/utils'
import $ from 'puppeteer-domkit'

const actions = require('../../../actions')

const asideInput = require('./aside-input')
const roam = require('./roam')
const allViews = require('./all-views')
const repickEffect = require('./repick-effect')
const repickOverview = require('./repick-overview')
const submit = require('./submit')

const gl = require('../../global')
utils.env()

describe('投稿流程 - 第二步', () => {
    before(async () => {
        await gl.Before()

        await utils.mock({
            '/design/recommend-status': 'never-published',
            '/designer/design/list': 'index-0-can-publish',
            '/designer/recommend/check': 'has-roam',
            '/designer/recommend/images': 'all'
        })

        await actions.plan.list.goto()

        await actions.plan.list.openPublicationDailog()
        await $.page.waitFor(100)
        await $.page.click('.publication-dialog .generate-btn')
        await $.page.waitForSelector('.publication-dialog .publication-step2')
        await $.page.waitFor(2000)
    })
    after(async () => {
        await gl.After()
    })
    describe('侧栏输入 ', asideInput)
    describe('全屋漫游 ', roam)
    describe('全景图说明 ', allViews)
    describe('封面图 ', repickEffect)
    describe('俯视图 ', repickOverview)
    describe('提交 ', submit)
})
