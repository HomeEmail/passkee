module.exports = ({ func, insert }) => {
    const code = [`${func}`]

    if (insert) {
        code.unshift('\n')
    }
    return code.join('')
}
