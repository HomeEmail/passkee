const generators = {
	dom: require('./dom'),
	page: require('./page'),
	custom: require('./custom'),
	trigger: require('./triggers'),
	target: require('./target'),
	request: require('./request')
};
module.exports = function(line) {
	console.log('opts', line);

	if (!line || !line.type || !Object.keys(generators).includes(line.type))
		throw 'line generator is not exist: ' + line.type;
	return generators[line.type](line);
};
