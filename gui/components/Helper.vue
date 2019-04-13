<template>

  <section class="pdr-helper">

    <ul>
      <li v-for="(item, i) in ['click', 'input', 'focus', 'blur','hover', 'mouseenter', 'mouseleave']"
          :key="i">
        <el-button size="mini"
                   @click="handleChangeLine(item)"
                   round>{{item}}</el-button>
      </li>
    </ul>
    <div class="dom-func">
      <el-button-group>
        <el-button size="mini"
                   v-for="(item, i) in ['waitFor', 'expect', 'get']"
                   :key="i"
                   @click="active2 = item"
                   :type=" item === active2 ? 'warning' : 'info'"
                   round>{{item}}</el-button>
      </el-button-group>
    </div>
    <ul>
      <li v-for="(item, i) in func[active2]"
          :key="i">
        <el-button size="mini"
                   round>{{item}}</el-button>
      </li>
    </ul>

  </section>

</template>

<script>
import codeGenerator from '../codeGenerator'
export default {
    data() {
        const oneParam = [
            'text',
            'html',
            'height',
            'width',
            'offset',
            'offsetParent',
            'position',
            'val',
            'index',
            'scrollTop'
        ]

        const twoParams = ['css', 'attr', 'prop', 'data', 'is', 'hasClass']

        return {
            active: 'trigger',
            active2: 'waitFor',
            actions: ['trigger', 'waitFor', 'expect'],
            func: {
                get: [...oneParam, ...twoParams],
                waitFor: [...oneParam, ...twoParams],
                expect: [...oneParam, ...twoParams]
            }
        }
    },

    mounted() {},

    methods: {
        handleChangeLine(item) {
            codeGenerator.changeLine(item)
        }
    }
}
</script>

<style lang="stylus">
.pdr-helper
  width 25% !important
  height 100%
  overflow auto
  .dom-func
    border-top 1px solid rgba(255, 255, 255, 0.3)
    padding-bottom 0
  ul, .dom-func
    padding 5px
    margin 0
    li
      display inline-block
      padding 1px
      margin 0
    button
      padding 3px 6px !important
</style>
