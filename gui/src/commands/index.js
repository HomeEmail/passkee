const codeGenerate = require('./code-generate');
module.exports = (command, args) => {
	return {
		'code-generate': codeGenerate
	}[command](args);
};
