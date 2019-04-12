const path = require('path')
const fs = require('fs-extra')

module.exports = {
    fileReplace(filePath, obj) {
        const readme = fs.readFileSync(filePath, 'utf8')
        fs.outputFileSync(
            filePath,
            readme.replace(/\$(.*?)\$/g, (it, $1) => {
                return obj[$1]
            })
        )
    },
    version: {
        valid(ver) {
            return /(\d+\.\d+)|(\d+\.\d+\.\d+)/.test(ver)
        },
        trim(ver) {
            const vers = ver.split('.').map((it) => parseInt(it.trim() || '0'))
            if (vers.length === 2) {
                vers.push(0)
            }
            return vers.join('.')
        },
        up(ver, up) {
            const vers = this.trim(ver)
                .split('.')
                .map((it) => parseInt(it.trim() || '0'))
            const ups = this.trim(up)
                .split('.')
                .map((it) => parseInt(it.trim() || '0'))
            return vers.map((it, i) => it + ups[i]).join('.')
        },
        gt(ver1, ver2) {
            const ver1Arr = this.trim(ver1).split('.')
            const ver2Arr = this.trim(ver2).split('.')
            if (ver1 === ver2) {
                return false
            }
            for (let i = 0; i < 3; i++) {
                if (parseInt(ver1Arr[i]) > parseInt(ver2Arr[i])) {
                    return true
                } else if (parseInt(ver1Arr[i]) < parseInt(ver2Arr[i])) {
                    return false
                }
            }
            return false
        },
        lt(ver1, ver2) {
            const ver1Arr = this.trim(ver1).split('.')
            const ver2Arr = this.trim(ver2).split('.')
            if (ver1 === ver2) {
                return false
            }
            for (let i = 0; i < 3; i++) {
                if (parseInt(ver1Arr[i]) < parseInt(ver2Arr[i])) {
                    return true
                } else if (parseInt(ver1Arr[i]) > parseInt(ver2Arr[i])) {
                    return false
                }
            }
            return false
        },
        eq(ver1, ver2) {
            const ver1Arr = this.trim(ver1).split('.')
            const ver2Arr = this.trim(ver2).split('.')
            return ver1Arr.join('') === ver2Arr.join('')
        }
    }
}
