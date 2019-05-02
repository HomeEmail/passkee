module.exports = ({ options: { func }, action }) => {
	const code = [ `await $.page.${func}()` ];

	if ([ 'insert', 'append' ].includes(action)) {
		code.unshift('\n');
	}
	return code.join('');
};
