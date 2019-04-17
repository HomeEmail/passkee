module.exports = ({ func, insert }) => {
    const code = [`await $.page.${func}()`]

    if (insert) {
        code.unshift('\n')
    }
    return code.join('')
}
