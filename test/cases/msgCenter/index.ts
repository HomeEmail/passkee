import utils from '@/utils'
import { Before, After } from '@/cases/global'
import redDot from './redDot'
import announce from './announce'
import ad from './ad'
import sysNotice from './sysNotice'

utils.env()
describe('消息中心测试', () => {
    before(async () => {
        await Before()
    })

    after(async () => {
        await After()
    })

    describe('广告', ad)
    describe('系统消息', sysNotice)
    describe('消息红点', redDot)
    describe('公告', announce)
})
