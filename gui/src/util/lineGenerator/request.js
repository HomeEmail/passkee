module.exports = ({ action, options: { resouceType, url } }) => {
	console.log('let code ');
	let code = [ `await $.waitFor.request("${url}")` ];

	if ([ 'insert', 'append' ].includes(action)) {
		code.unshift('\n');
	}
	return code.join('');
};
