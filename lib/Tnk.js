const DEFAULT_DATA_ERR_MSG = '[tnk] you should define the root keys of store by default data before you use then';
const UNDEFINED_ERR_MSG = '[tnk] you should define the root keys of store by default data before you use then';

export default class Tnk {
	constructor(defaultData) {
		this.connects = {};
		if (!defaultData) throw DEFAULT_DATA_ERR_MSG;
		this.store = clone(defaultData);
	}
	getState(path) {
		const state = this.findNodeByPath(path).state;
		return clone(state);
	}
	dispatch(actionName, path, setAction) {
		if (typeof setAction !== 'function') throw '[tnk] you can only update store by action function ';

		const res = setAction(this.getState(path));
		if (typeof res === 'undefined') throw UNDEFINED_ERR_MSG;
		if (res && res.then) {
			res.then((res) => {
				if (typeof res === 'undefined') throw UNDEFINED_ERR_MSG;
				set.call(this, res);
			});
		} else {
			set.call(this, res);
		}
		function set(res) {
			const parentNode = this.findNodeByPath(path, true, true);
			const parentData = parentNode.state;
			let data = clone(res);
			if (parentData && parentData.constructor === Array) {
				parentData[parseInt(parentNode.path[parentNode.path.length - 1])] = data;
			} else {
				parentData[parentNode.path[parentNode.path.length - 1]] = data;
			}
			const connect = this.connects[actionName];
			if (!connect || !connect.length) return;
			let i = connect.length;
			while (i--) connect[i](clone(data));
		}
	}
	pub(actionName, data) {
		const connect = this.connects[actionName];
		if (!connect || !connect.length) return;
		let i = connect.length;
		while (i--) connect[i](data);
	}
	sub(actionName, callback) {
		const connect = (this.connects[actionName] = this.connects[actionName] || []);
		connect.push(callback);
	}

	findNodeByPath(path, notUndefined, parent) {
		if (!this.store) throw '[tnk] the tnk was destroyed ';
		if (typeof path === 'string') path = path.split('.');
		else if (!path || path.constructor !== Array) throw '[tnk]:wrong argument of getState';
		if (path.length === 1 && parent) {
			return { state: this.store, path };
		}
		let state = this.store[path[0]];
		if (state === 'undefined') throw DEFAULT_DATA_ERR_MSG;
		for (var i = 1, l = path.length - (parent ? 1 : 0); i < l; i++) {
			if (path[i] && typeof state === 'object') {
				state = isNaN(path[i]) ? state[path[i]] : state[parseInt(path[i])] || state[path[i]];
			} else if (notUndefined) throw '[tnk] undefined in path';
		}
		return { state, path };
	}

	destroy() {
		this.store = null;
		this.connects = null;
	}
}

function clone(obj) {
	if (obj && typeof obj === 'object') {
		return JSON.parse(JSON.stringify(obj));
	} else return obj;
}
