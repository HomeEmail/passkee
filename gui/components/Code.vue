<template>

  <section class="pdr-code">
    <codemirror ref="myCm"
                :value="code"
                :options="cmOptions"
                @ready="onCmReady"
                @focus="onCmFocus"
                @input="onCmCodeChange" />
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

    mounted() {},
    computed: {
        codemirror() {
            return this.$refs.myCm.codemirror
        }
    },
    methods: {
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
.pdr-code
  width 50%
  .vue-codemirror
    height 100%
  .CodeMirror
    height 100%
  .CodeMirror-scroll
    height 100%
    overflow-y hidden
    overflow-x auto
</style>
