module.exports = ({ selector, event, from, insert }) => {
    const code = [`await $('${selector}').${event}()`]
    if (from === 'document') {
        code.unshift(`await $('${selector}').waitFor.visible()\n`)
        code.push('\n')
    }

    if (insert) {
        code.unshift('\n')
    }

    return code.join('')
}
