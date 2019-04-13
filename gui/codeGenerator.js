export default new class {
	constructor(codeMirror) {
		this.code = '';
	}

	bind(codeMirror) {
		this.codeMirror = codeMirror;
		this.codeMirror.on('change', (cm) => {
			this.code = cm.getValue();
		});
	}

	generate(event, selector) {
		switch (event) {
			case 'click':
				this.code += `await $('${selector}').waitFor.visible()\nawait $('${selector}').${event}()\n`;
		}
		this.syncMirror();
	}

	changeLine(action, sub) {
		const lineNum = this.codeMirror.getCursor().line;
		const line = this.codeMirror.getLine(lineNum);
		const selector = /\$\(.*?[\'\"]\)\./.exec(line)[0];

		console.log(line, this.makeLine(action, selector));
		if (selector) {
			this.codeMirror.replaceRange(
				this.makeLine(action, selector),
				{ line: lineNum, ch: 0 },
				{
					line: lineNum,
					ch: line.length
				}
			);

			setTimeout(() => {
				console.log(this.codeMirror.getCursor().line);
			}, 1000);
			// this.code.replace(
			// 	new RegExp(
			// 		line.replace(/\W/g, function(it) {
			// 			return '\\' + it;
			// 		})
			// 	),
			// 	this.makeLine(action, selector)
			// );
		}
	}

	makeLine(action, ...args) {
		switch (action) {
			case 'click':
				return `await ${args[0]}${action}()`;
		}
	}

	syncMirror() {
		this.codeMirror.setValue(this.code);
	}

	setCode(code) {
		this.code = code;
	}
}();
