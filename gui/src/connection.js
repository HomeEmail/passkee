const commands = require('./commands');
window.PASSKEE_CONNECTION = {
	send(commandType, args) {
		const body = JSON.stringify({ command: commandType, body: args, from: 'gui' });
		console.warn('[PASSKEE-COMMAND]', body);
	},

	receive(commandType, args) {
		commands(commandType, args);
	}
};

export default window.PASSKEE_CONNECTION;
