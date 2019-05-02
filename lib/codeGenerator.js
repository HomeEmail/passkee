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
		codeMirror.setValue(this.code);

		this.codeMirror.on('change', (cm) => {
			this.code = cm.getValue();
			this.store(this.code);
		});

		this.codeMirror.on('cursorActivity', (e) => {
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
			console.log('cursorActivity', this.currentLine);
		});
	}

	insertLine(lineOpts) {
		lineOpts.action = 'insert';
		const code = this.makeLine(lineOpts);
		if (!code.trim()) return;
		const cursor = this.codeMirror.getCursor();

		this.codeMirror.replaceRange(
			code,
			{ line: cursor.line, ch: cursor.ch },
			{
				line: cursor.line,
				ch: cursor.ch
			}
		);
	}

	replaceFocusedLine(lineOpts) {
		lineOpts.action = 'replace';
		const line = this.getFocusedLine();
		const selector = this.getSelectorFromLine(line);
		lineOpts.options.selector = selector;
		const code = this.makeLine(lineOpts);
		if (!code.trim()) return;
		this.replaceLine(this.codeMirror.getCursor().line, code);
	}

	appendLine(lineOpts) {
		lineOpts.action = 'append';
		const code = this.makeLine(lineOpts);
		if (!code.trim()) return;
		this.code += code;
		this.syncMirror();
		$Z('.CodeMirror-scroll').scrollTop($Z('.CodeMirror-sizer').height());
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
		return lineGenerator(lineOpts);
	}

	getSelectorFromLine(line) {
		if (line) {
			const selector = /\$\(.*?[\'\"]\)\./.exec(line)[0];
			return (selector || '').replace(/\$\([\'\"]/, '').replace(/[\'\"]\)\./, '');
		}
	}

	syncMirror() {
		this.codeMirror.setValue(this.code);
		// setTimeout(() => {
		// 	this.format();
		// }, 100);
	}

	setCode(code) {
		this.code = code;
	}

	format() {
		this.codeMirror.autoFormatRange({ line: 0, ch: 0 }, { line: this.codeMirror.lineCount() });
	}

	selectAll() {
		this.codeMirror.setSelection({ line: 0, ch: 0 }, { line: 1000, ch: 1000000 });
	}

	clear() {
		this.codeMirror.setValue('');
	}

	store(code) {
		window.sessionStorage.PASSKEE_CODE = code;
	}
}();

module.exports.default = module.exports;
