<template>

  <section class="pdr-code">
    <header flex="main:justify">
      <ul flex
          class="left">
        <li title="copy"
            @click="copy"><i class="iconfont icon-copy"></i></li>
      </ul>
      <ul class="right">
        <li title="double click to clear"
            @click="dbclickClear"><i class="iconfont icon-clear"></i></li>
      </ul>
    </header>
    <codemirror ref="myCm"
                :value="code"
                :options="cmOptions" />
  </section>

</template>

<script>
import * as CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/mode/javascript/javascript'
import formating from '../util/codeMirror/formating'
formating(CodeMirror)
import codeGenerator from '../util/codeGenerator'
let dbclickTimer = 0
export default {
    name: 'puppeteer-domkit-recorder',
    data() {
        return {
            code: '',
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

    mounted() {
        codeGenerator.bind(this.codemirror)
    },
    computed: {
        codemirror() {
            return this.$refs.myCm.codemirror
        }
    },
    methods: {
        copy(e) {
            codeGenerator.selectAll()
            const fn = (event) => {
                console.log(event)
                event.clipboardData.setData(
                    'text/plain',
                    this.codemirror.getValue()
                )
                document.removeEventListener('copy', fn, true)
                event.preventDefault()
            }
            document.addEventListener('copy', fn, true)
            document.execCommand('copy')
            setTimeout(() => {
                this.codemirror.focus()
            }, 10)
        },
        dbclickClear() {
            codeGenerator.clear()
            TNK.dispatch('network-list-change', 'networkList', (list) => {
                return [
                    {
                        url: window.parent.location.href,
                        resourceType: 'document',
                        pathname: window.parent.location.pathname,
                        lastPath: window.parent.location.pathname
                            .split('/')
                            .pop(),
                        method: 'GET'
                    }
                ]
            })
            setTimeout(() => {
                this.codemirror.focus()
            }, 10)
            // if (dbclickTimer && Date.now() - dbclickTimer < 300) {
            //     codeGenerator.clear()
            //     dbclickTimer = 0
            //     return
            // }
            // dbclickTimer = Date.now()
        }
    }
}
</script>

<style lang="stylus">
.pdr-code
  width 50%
  header
    background-color #666
    height 24px
    user-select none
    ul
      li
        height 24px
        line-height 24px
        color #fff
        font-size 12px
        padding 0 7px
        cursor pointer
        position relative
        &:hover
          background-color rgba(255, 255, 255, 0.2)
        &:active
          background-color rgba(255, 255, 255, 0.4)
    ul.left
      padding-left 5px
      li
        border-right 1px solid #666
    ul.right
      padding-right 5px
      li
        border-left 1px solid #666
  .vue-codemirror
    height 100%
  .CodeMirror
    height 100%
    line-height 1.5
    font-size 12px
    padding 10px 0
  .CodeMirror-scroll
    height 100%
    overflow-y hidden
    overflow-x auto
  .CodeMirror-line
    padding-left 10px
</style>
