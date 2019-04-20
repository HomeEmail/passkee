require('colors')
import actions from '@/actions'
import utils from '@/utils'

let coverage = null
export const Before = async function before() {
    await utils.init()

    // coverage = new utils.Coverage()
    // await coverage.start()

    await actions.login.openAndLogin({
        type: 1,
        name: '17620395906',
        password: '123456789'
    })
    await actions.plan.list.goto()
}
export const After = async function after() {
    // await coverage.end()
    browser.close()
}
