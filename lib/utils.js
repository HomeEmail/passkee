module.exports = {
	freeze(obj) {
		Object.freeze(obj);
		Object.values(obj).forEach(function(value, index) {
			if (typeof value === 'object') {
				freeze(value);
			}
		});
	}
};
