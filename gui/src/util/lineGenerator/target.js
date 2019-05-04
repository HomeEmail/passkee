module.exports = ({ action, options: { event, url, targetType }, currentLine }) => {
	const code = [];
	if (event === 'targetcreated' && targetType === 'page') {
		code.push(`await $.waitFor.target("${url}")`);
	} else if (event === 'targetdestroyed' && url.indexOf('chrome-extension:') === -1) {
		code.push(`await $.closeTarget("${url}")`);
	}

	return code.join('');
};
