const generators = {
    dom: require('./dom'),
    trigger: require('./triggers')
}
module.exports = function(opts) {
    if (!opts.type || !Object.keys(generators).includes(opts.type))
        throw 'line generator is not exist: ' + opts.type
    return generators[opts.type](opts)
}
