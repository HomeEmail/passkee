require('colors')
const utils = require('../common/webpack-utils')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./base')
const path = require('path')

module.exports = () => {
    const entry = {
        'passkee-gui': path.join(__dirname, '../../gui/index.js'),
        'passkee-listener': path.join(__dirname, '../../listener/index.js'),
        'passkee-serve': path.join(__dirname, '../../serve/index.js')
    }

    return merge(baseWebpackConfig, {
        mode: 'production',
        entry,
        module: {
            rules: utils.styleLoaders({
                sourceMap: false,
                extract: false
            })
        },
        externals: {
            'puppeteer-domkit': 'puppeteer-domkit',
            puppeteer: 'puppeteer'
        },
        devtool: false,
        output: {
            path: path.join(__dirname, '../../browser'),
            publicPath: '',
            filename: `[name].js`,
            library: '[name]',
            libraryTarget: 'umd',
            umdNamedDefine: true
        },
        devtool: false
    })
}
