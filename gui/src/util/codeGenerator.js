const lineGenerator = require('./lineGenerator');
module.exports = new class {
	constructor(codeMirror) {
		this.code = window.sessionStorage.PASSKEE_CODE || '';
		this.currentLine = {
			line: 0,
			ch: 0,
			code: ''
		};
	}

	bind(codeMirror) {
		this.codeMirror = codeMirror;

		this.setCode(this.code);

		this.codeMirror.on('change', (cm) => {
			this.code = cm.getValue();
			this.store(this.code);
		});

		this.codeMirror.setSelection({
			line: 1000,
			ch: 100000
		});

		this.getCurrentLine();

		this.codeMirror.on('cursorActivity', (e) => {
			this.getCurrentLine();
			TNK.dispatch('cursor-change', 'currentLine', (line) => {
				return this.currentLine;
			});
		});

		// setInterval(() => {
		// 	this.codeMirror.focus();
		// }, 100);
	}

	commandExec(opts) {
		const func = {
			append: this.appendLine,
			insert: this.insertLine,
			replace: this.replaceFocusedLine
		}[opts.action];
		if (func) {
			func.call(this, opts);
		}
	}

	insertLine(lineOpts) {
		lineOpts.action = 'insert';
		lineOpts.currentLine = this.currentLine;
		const code = this.makeLine(lineOpts);
		if (!code.trim()) return;
		this.codeMirror.setSelection({
			line: this.currentLine.line,
			ch: this.currentLine.length
		});
		this.codeMirror.replaceRange(
			code,
			{
				line: this.currentLine.line,
				ch: this.currentLine.length
			},
			{
				line: this.currentLine.line,
				ch: this.currentLine.length
			}
		);
	}

	replaceFocusedLine(lineOpts) {
		lineOpts.action = 'replace';
		lineOpts.currentLine = this.currentLine;
		const code = this.makeLine(lineOpts);
		if (!code.trim()) return;
		this.replaceLine(this.codeMirror.getCursor().line, code);
	}

	appendLine(lineOpts) {
		lineOpts.action = 'append';
		lineOpts.currentLine = this.currentLine;
		const code = this.makeLine(lineOpts);
		if (!code.trim()) return;
		this.code += code;
		this.syncMirror();
		$Z('.CodeMirror-scroll').scrollTop($Z('.CodeMirror-sizer').height());
		this.codeMirror.setSelection({
			line: 1000,
			ch: 100000
		});
	}

	replaceLine(lineNum, code) {
		const line = this.codeMirror.getLine(lineNum);
		this.codeMirror.replaceRange(
			code,
			{ line: lineNum, ch: 0 },
			{
				line: lineNum,
				ch: line.length
			}
		);
	}

	getFocusedLine() {
		const lineNum = this.codeMirror.getCursor().line;
		return this.codeMirror.getLine(lineNum);
	}

	makeLine(lineOpts) {
		return this.addBr(lineGenerator(lineOpts), lineOpts.action);
	}

	syncMirror() {
		this.codeMirror.setValue(this.code);
	}

	setCode(code) {
		this.code = code;
		this.syncMirror();
	}

	addBr(line, type) {
		const cl = this.currentLine;
		if (type === 'insert') {
			if (cl.length && cl.ch === 0) {
				return line + `\n`;
			} else if (!cl.length) {
				return line;
			} else {
				return `\n` + line;
			}
		} else if (type === 'append') {
			if (!cl.length) {
				return line;
			} else {
				return `\n` + line;
			}
		}
		return line;
	}

	format() {
		this.codeMirror.autoFormatRange({ line: 0, ch: 0 }, { line: this.codeMirror.lineCount() });
	}

	selectAll() {
		this.codeMirror.setSelection({ line: 0, ch: 0 }, { line: 1000, ch: 1000000 });
	}

	clear() {
		this.setCode('');
	}

	focus() {
		setTimeout(() => {
			this.codeMirror.focus();
		}, 10);
	}

	store(code) {
		window.sessionStorage.PASSKEE_CODE = code;
	}

	getCurrentLine() {
		const cursor = this.codeMirror.getCursor();
		const lineCode = this.codeMirror.getLine(cursor.line);
		this.currentLine = {
			line: cursor.line,
			ch: cursor.ch,
			code: lineCode,
			length: lineCode.length,
			isEmpty: !lineCode.length,
			isAtTheEnd: cursor.ch === lineCode.length
		};
	}
}();

module.exports.default = module.exports;
