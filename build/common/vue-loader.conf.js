var utils = require('./webpack-utils')

module.exports = {
    loaders: utils.cssLoaders({
        sourceMap: true,
        extract: true
    })
}
