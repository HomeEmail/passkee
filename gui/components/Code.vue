<template>

  <section class="pdr-code">
    <header flex>
      <ul flex
          class="left">
        <li>save</li>
      </ul>
      <ul class="right"></ul>
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
import formating from '../../lib/codeMirror/formating'
formating(CodeMirror)
import finder from '@medv/finder'
import codeGenerator from '../../lib/codeGenerator'

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
        console.log(this.codemirror.getCursor().line)
        codeGenerator.bind(this.codemirror)
    },
    computed: {
        codemirror() {
            return this.$refs.myCm.codemirror
        }
    },
    methods: {}
}
</script>

<style lang="stylus">
.pdr-code
  width 50%
  header
    background-color #666
    height 24px
    ul
      li
        height 24px
        line-height 24px
        color #fff
        font-size 12px
        padding 0 10px
        background-color rgba(255, 255, 255, 0.2)
        cursor pointer
        &:hover
          background-color rgba(255, 255, 255, 0.4)
    ul.left
      li
        border-right 1px solid #666
    ul.right
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
</style>
