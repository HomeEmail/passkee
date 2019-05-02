module.exports = ({ options: { selector, event, from, tagName, value, type, name }, action }) => {
	const code = [];
	const textInput = [ 'text', 'email', 'url', 'number', 'search', 'password' ];
	const clickInput = [ 'radio', 'checkbox' ];
	if (event === 'change') {
		if (tagName === 'TEXTAREA' || (tagName === 'INPUT' && textInput.includes(type))) {
			code.push(`await $('${selector}').input('${value}')`);
		} else if (tagName !== 'INPUT' || !clickInput.includes(type)) {
			let value;
			if (typeof value === 'string') {
				value = `'${value}'`;
			} else if (typeof value === 'object') {
				value = JSON.stringify(value);
			}
			code.push(`await $('${selector}').val(${value})`);
		}
	} else {
		code.push(`await $('${selector}').${event}()`);
	}

	if (code.length && [ 'insert', 'append' ].includes(action)) {
		code.unshift('\n');
	}

	return code.join('');
};
