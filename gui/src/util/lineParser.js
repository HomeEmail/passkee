module.exports = {
	parseBasedSelector(line) {
		line = line || '';
		const matchs = /\$\([\'\"](.*?)[\'\"]\)\.(waitFor\.|expect\.)?(\w+)\(\s?(.*?)\s?\)\s?$/.exec(line);
		if (!matchs) return null;
		const selector = matchs[1] || '';
		const mode = (matchs[2] || '').replace(/\./, '');
		const func = matchs[3] || '';
		const params = matchs[4] || '';
		return {
			selector,
			mode,
			func,
			params
		};
	},
	parseBom(line) {
		line = line || '';
		const matchs = /\$\.(waitFor\.|expect\.)?(\w+)\(\s?(.*?)\s?\)\s?$/.exec(line);
		if (!matchs[0]) return null;
		const mode = (matchs[1] || '').replace(/\./, '');
		const func = matchs[2] || '';
		const params = matchs[3] || '';
		return {
			mode,
			func,
			params
		};
	}
};
