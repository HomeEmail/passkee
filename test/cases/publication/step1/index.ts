// import utils from '@/utils'
import utils from '@/utils'
import hasRoam from './has-roam'
const noRoam = require('./no-roam')
utils.env()
describe('投稿流程 - 第一步', () => {
    describe('符合条件', hasRoam)
    describe('不符合条件', noRoam)
})
