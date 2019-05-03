export default {
	send(commandType, msg, target) {
		const body = JSON.stringify({ command: commandType, body: msg, from: 'listener', target });
		console.warn('[PASSKEE-COMMAND]', body);
	}
};
