const $ = require('puppeteer-domkit');
const commands = require('./commands');

module.exports = {
	listen() {
		$.page.on('console', (msg) => {
			const args = msg.args().map((item) => {
				return item.toString().replace(/JSHandle\:/, '');
			});

			const type = msg.type();

			if (type === 'warning' && args[0] === '[PASSKEE-COMMAND]') {
				args[1] = JSON.parse(args[1].trim());
				console.log(`console msg`, args[1]);
				const { command, body, target } = args[1];

				if (target === 'gui') {
					this.sendToGui(command, body);
					return;
				}
				commands(command, body);
			}
		});
	},

	sendToGui(command, args) {
		$.gui.evaluate(
			(command, args) => {
				args.from = 'serve';
				window.PASSKEE_CONNECTION.receive(command, args);
			},
			command,
			args
		);
	}
};
