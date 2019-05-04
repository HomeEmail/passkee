module.exports = {
    freeze(obj) {
        Object.freeze(obj)
        Object.values(obj).forEach(function(value, index) {
            if (typeof value === 'object') {
                freeze(value)
            }
        })
    },

    walkTree(tree, callback) {
        walk(tree, callback)
    },

    findNodeById(tree, id) {
        let theNode = {}
        walk(tree, (node, index, parents, ctrl) => {
            if (node.id === id) {
                theNode.node = node
                theNode.index = index
                theNode.parents = parents
                ctrl.stop = true
            }
        })
        return theNode
    }
}

/**
 * 树结构遍历函数
 * @param nodeList 节点数组
 * @param callback 遍历节点回调，传入：节点，节点索引，父级节点数组，控制器{stop:设置为true时，可以停止遍历}
 * @param parents 各级父级节点
 * @param ctrl 控制是否停止遍历
 */
function walk(
    nodeList,
    callback,
    parents = [],
    ctrl = {
        stop: false
    }
) {
    if (typeof nodeList === 'object' && nodeList.constructor === Array) {
        for (let i = 0, l = nodeList.length; i < l; i++) {
            callback(nodeList[i], i, parents, ctrl)
            if (!ctrl.stop) {
                const children = nodeList[i].children || nodeList[i].items
                const node = nodeList[i]
                parents.push(node)
                if (children && children.length) {
                    walk(
                        nodeList[i].children || nodeList[i].items,
                        callback,
                        [...parents],
                        ctrl
                    )
                }
                parents.pop()
            } else {
                break
            }
        }
    }
}
