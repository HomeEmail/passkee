const lineGenerator = require('./lineGenerator')
module.exports = new class {
    constructor(codeMirror) {
        this.code = ''
    }

    bind(codeMirror) {
        this.codeMirror = codeMirror
        this.codeMirror.on('change', (cm) => {
            this.code = cm.getValue()
        })
    }

    insertLine(opts) {
        opts.insert = true
        opts.selector = ''
        const code = this.makeLine(opts)
        const cursor = this.codeMirror.getCursor()
        this.codeMirror.replaceRange(
            code,
            { line: cursor.line, ch: cursor.ch },
            {
                line: cursor.line,
                ch: cursor.ch
            }
        )
    }

    changeFocusedLine(opts) {
        const line = this.getFocusedLine()
        const selector = this.getSelectorFromLine(line)
        opts.selector = selector
        this.replaceLine(this.codeMirror.getCursor().line, this.makeLine(opts))
    }

    appendLine(opts) {
        const line = this.makeLine(opts)
        this.code += line
        this.syncMirror()
    }

    replaceLine(lineNum, code) {
        const line = this.codeMirror.getLine(lineNum)
        this.codeMirror.replaceRange(
            code,
            { line: lineNum, ch: 0 },
            {
                line: lineNum,
                ch: line.length
            }
        )
    }

    getFocusedLine() {
        const lineNum = this.codeMirror.getCursor().line
        return this.codeMirror.getLine(lineNum)
    }

    makeLine(opts) {
        return lineGenerator(opts)
    }

    getSelectorFromLine(line) {
        if (line) {
            const selector = /\$\(.*?[\'\"]\)\./.exec(line)[0]
            return (selector || '')
                .replace(/\$\([\'\"]/, '')
                .replace(/[\'\"]\)\./, '')
        }
    }

    syncMirror() {
        this.codeMirror.setValue(this.code)
    }

    setCode(code) {
        this.code = code
    }
}()

module.exports.default = module.exports
