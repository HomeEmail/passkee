const path = require('path')
const $ = require('puppeteer-domkit')
const cases = require('../cases')
module.exports = async (param) => {
    const res = cases.read(path.join(__dirname, '../../test/cases'))
    $.page.evaluate(function(res) {
        setTimeout(() => {
            window.PDRGUI.category.data = res
        }, 2000)
    }, res)
}
