<template>
  <section id="puppeteer-domkit-recorder"
           class="puppeteer-domkit-recorder"
           :style="{height: height + 'px'}"
           flex>
    <section class="pdr-category">
      <el-input placeholder="输入关键字进行过滤"
                v-model="filterText">
      </el-input>
      <el-tree ref="tree"
               :data="data"
               accordion
               :props="defaultProps"
               :filter-node-method="filterNode"
               @node-click="handleNodeClick"></el-tree>

    </section>
    <section class="pdr-code">
      <codemirror ref="myCm"
                  :value="code"
                  :options="cmOptions"
                  @ready="onCmReady"
                  @focus="onCmFocus"
                  @input="onCmCodeChange" />
    </section>
    <section class="pdr-tips"></section>

  </section>
</template>

<script>
import * as CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/javascript/javascript'

export default {
    name: 'puppeteer-domkit-recorder',
    data() {
        return {
            filterText: '',
            data: [
                {
                    label: '一级 1',
                    children: [
                        {
                            label: '二级 1-1',
                            children: [
                                {
                                    label: '三级 1-1-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 2',
                    children: [
                        {
                            label: '二级 2-1',
                            children: [
                                {
                                    label: '三级 2-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 2-2',
                            children: [
                                {
                                    label: '三级 2-2-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 3',
                    children: [
                        {
                            label: '二级 3-1',
                            children: [
                                {
                                    label: '三级 3-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 3-2',
                            children: [
                                {
                                    label: '三级 3-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            height: window.innerHeight,
            code: 'const a = 10',
            cmOptions: {
                tabSize: 4,
                mode: 'text/javascript',
                theme: 'monokai',
                lineNumbers: true,
                line: true,
                autofocus: true,
                extraKeys: {
                    'Ctrl-X': 'deleteLine'
                }
            }
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val)
        }
    },
    mounted() {
        this.height = window.innerHeight
        console.log('this is current codemirror object', this.codemirror)
    },
    computed: {
        codemirror() {
            return this.$refs.myCm.codemirror
        }
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        handleNodeClick(data) {
            console.log(data)
        },
        handleClick(e) {
            console.log(e)
        },
        onCmReady(cm) {
            console.log('the editor is readied!', cm)
        },
        onCmFocus(cm) {
            console.log('the editor is focus!', cm)
        },
        onCmCodeChange(newCode) {
            console.log('this is new code', newCode)
            this.code = newCode
        }
    }
}
</script>

<style lang="stylus">
.puppeteer-domkit-recorder
  background-color rgba(0, 0, 0, 0.7)
  max-width 1280px
  height 100%
  &>*
    height 100%
  .pdr-category
    width 20%
    height 100%
  .pdr-code
    width 60%
  .pdr-tips
    width 20%
    height 100%
  .vue-codemirror
    height 100%
  .CodeMirror
    height 100%
  .CodeMirror-scroll
    height 100%
    overflow-y hidden
    overflow-x auto
</style>
