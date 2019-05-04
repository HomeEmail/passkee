module.exports = ({ options: { func }, action, currentLine }) => {
	const code = [ `${func}` ];
	return code.join('');
};
