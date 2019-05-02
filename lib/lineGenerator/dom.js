module.exports = ({ options: { selector, mode, func }, action }) => {
	const code = [];

	if (mode === 'get') {
		code[0] = `const ${func} = await $('${selector}')${mode !== 'get' ? '.' + mode : ''}.${func}()`;
	} else {
		code[0] = `await $('${selector}')${mode !== 'get' ? '.' + mode : ''}.${func}()`;
	}

	if ([ 'insert', 'append' ].includes(action)) {
		code.unshift('\n');
	}
	return code.join('');
};
