const path = require('path')
const fs = require('fs-extra')
const glob = require('glob')

let nodeUUid = 0
module.exports = {
    read(testPath) {
        const tree = []
        const files = glob.sync(path.join(testPath, '**/*.ts'))
        files.forEach((filePath) => {
            const filePaths = filePath
                .replace(testPath, '')
                .replace(/\\/g, '/')
                .replace(/^\//, '')
            const paths = filePaths.split('/')
            let node = null
            paths.forEach((it, index) => {
                let target
                if (!node) {
                    target = tree.find((item) => item.id === it)
                } else {
                    target = node.children.find((item) => item.id === it)
                }

                if (!target) {
                    const isFile = paths.length - 1 === index
                    target = {
                        id: it,
                        label: it,
                        children: [],
                        isFile,
                        path: path.join(
                            testPath,
                            paths.slice(0, index + 1).join('/')
                        )
                    }
                    if (isFile) {
                        // target.code = fs.readFileSync(filePath, { encoding: 'utf-8' });
                        target.children = readFile(filePath)
                    }
                    ;(node ? node.children : tree).push(target)
                }
                node = target
            })
        })
        return tree
    }
}

module.exports.default = module.exports

function readFile(file) {
    const text = fs.readFileSync(file, { encoding: 'utf-8' })

    const textReg = /it\s?\(\s?[\'\"\`].*?[\'\"\`]\,\s/g
    const blockReg = /it\s?\(\s?[\'\"\`]((?!it\s?\(\s?[\'\"\`])[\s\S])*\}\)/g

    // /\/\*\[CASE\*\/[\S\s]*?it\(.*/

    let res = text.match(textReg) || []
    let codeBlock = text.match(blockReg) || []

    res = res.map((it) =>
        it.replace(/it\s?\(\s?[\'\"\`]/g, '').replace(/[\'\"\`]\,\s/g, '')
    )

    return res.map((it, index) => {
        return {
            id: ++nodeUUid,
            label: it,
            isCase: true,
            code: codeBlock[index]
        }
    })
}
