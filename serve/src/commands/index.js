const resize = require('./resize');
const ready = require('./ready');
const codeGenerate = require('./code-generate');
module.exports = (command, args) => {
	return {
		resize,
		ready,
		'code-generate': codeGenerate
	}[command](args);
};
