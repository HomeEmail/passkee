<template>

  <section class="pdr-code">
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
  .vue-codemirror
    height 100%
  .CodeMirror
    height 100%
    line-height 1.2
    font-size 12px
  .CodeMirror-scroll
    height 100%
    overflow-y hidden
    overflow-x auto
</style>
