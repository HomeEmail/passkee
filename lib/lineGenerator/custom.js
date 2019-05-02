module.exports = ({ options: { func }, action }) => {
	const code = [ `${func}` ];

	if ([ 'insert', 'append' ].includes(action)) {
		code.unshift('\n');
	}
	return code.join('');
};
