const constant = require('../../../../common/constant');
const lineParser = require('../lineParser');
module.exports = ({ options: { selector = '', mode, func }, action, currentLine }) => {
	const code = [];

	const lineInfo = lineParser.parseBasedSelector(currentLine.code);

	let params;

	if (action === 'replace') {
		if (!lineInfo) return;

		selector = selector || lineInfo.selector;

		func = func || lineInfo.func;

		mode = mode || lineInfo.mode || 'get';

		params = lineInfo.params;
	}

	const isOneParam = constant.domOneParam.includes(func);
	const isTwoParam = constant.domTwoParam.includes(func);

	if (!constant.dom.includes(func)) {
		return currentLine.code;
	}

	if (!params) {
		if (isOneParam) {
			params = `'value'`;
		} else if (isTwoParam) {
			params = `'name', 'value'`;
		}
		if (mode === 'waitFor') {
			params += ', {timeout: 2000, delay: 100}';
		}
	}

	if (params) {
		if (mode !== 'waitFor') {
			params = params.replace(/\,\s?\{timeout\:\s?\d+?\,\s?delay\:\s?\d+?\}$/, '');
		}

		if (mode === 'get') {
			if (isOneParam) {
				params = '';
			} else if (isTwoParam) {
				params = params.split(/\,\s?/)[0];
			}
		}

		if (mode === 'waitFor') {
			if (isOneParam) {
				params = params === "'value'" ? params + ', {timeout: 2000, delay: 100}' : params;
			} else if (isTwoParam) {
				params = !params.includes(',') ? params + ", 'value', {timeout: 2000, delay: 100}" : params;
			}
		}
	}

	if (mode === 'get') {
		code[0] = `const ${func} = await $('${selector}')${mode !== 'get' ? '.' + mode : ''}.${func}(${params})`;
	} else {
		code[0] = `await $('${selector}')${mode !== 'get' ? '.' + mode : ''}.${func}(${params})`;
	}

	return code.join('');
};
