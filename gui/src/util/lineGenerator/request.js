module.exports = ({ action, options: { resouceType, url }, currentLine }) => {
	console.log('let code ');
	let code = [ `await $.waitFor.request("${url}")` ];

	return code.join('');
};
