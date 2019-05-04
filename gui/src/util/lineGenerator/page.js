module.exports = ({ options: { func }, action, currentLine }) => {
	const code = [ `await $.page.${func}()` ];

	return code.join('');
};
