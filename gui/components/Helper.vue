<template>

  <section class="pdr-helper">
    <header flex>
      <ul flex
          class="left">
        <li :class="[active === 'domkit' ? 'active' : '']"
            @click="active = 'domkit'">DomKit</li>
        <li :class="[active === 'network' ? 'active' : '']"
            @click="active = 'network'">Network</li>
      </ul>
      <ul class="right"></ul>
    </header>
    <section v-if="active === 'domkit'">
      <ul>
        <li v-for="(item, i) in ['click', 'input', 'focus', 'blur','hover', 'mouseenter', 'mouseleave']"
            :key="i">
          <el-button size="mini"
                     @dblclick="clck({type: 'trigger', event: item})"
                     @click="clck({type: 'trigger', event: item})"
                     round>{{item}}</el-button>
        </li>
      </ul>
      <div class="dom-func line">
        <el-button-group>
          <el-button size="mini"
                     v-for="(item, i) in ['waitFor', 'expect', 'get']"
                     :key="i"
                     @click="domModeChange(item)"
                     :type="item === domMode ? 'warning' : 'info'"
                     round>{{item}}</el-button>
        </el-button-group>
      </div>
      <ul>
        <li v-for="(item, i) in func[domMode]"
            :key="i">
          <el-button size="mini"
                     @dblclick="clck({type: 'dom', mode: domMode, func: item})"
                     @click="clck({type: 'dom', mode: domMode, func: item})"
                     round>{{item}}</el-button>
        </li>
      </ul>

      <ul class=" line">
        <li v-for="(item, i) in ['response', 'request', 'waitFor']"
            :key="i">
          <el-button size="mini"
                     @click="toInsertLine({type: 'page', func: item})"
                     round>{{item}}</el-button>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import codeGenerator from '../../lib/codeGenerator'

let dbclickTimer = 0
let clickTimo = 0

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
            active: 'domkit',
            domMode: 'waitFor',
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
        clck() {
            // 支持模拟双击事件
            const args = arguments
            if (dbclickTimer && Date.now() - dbclickTimer < 300) {
                clearTimeout(clickTimo)
                this.toInsertLine.apply(this, args)
                dbclickTimer = 0
                clickTimo = 0
                return
            }
            dbclickTimer = Date.now()
            clickTimo = setTimeout(() => {
                dbclickTimer = 0
                clickTimo = 0
                this.toChangeLine.apply(this, args)
            }, 200)
        },

        domModeChange(mode) {
            this.domMode = mode

            codeGenerator.changeFocusedLine({
                type: 'dom',
                mode: mode
            })
        },

        toChangeLine(opts) {
            codeGenerator.changeFocusedLine(opts)
        },
        toInsertLine(opts) {
            codeGenerator.insertLine(opts)
        }
    }
}
</script>

<style lang="stylus">
.pdr-helper
  width 25% !important
  height 100%
  overflow auto
  background-color rgba(0, 0, 0, 0.5)
  header
    background-color #666
    height 24px
    &>ul
      li
        height 24px
        line-height 24px
        color #fff
        font-size 12px
        padding 0 10px
        background-color rgba(255, 255, 255, 0.2)
        cursor pointer
        &.active
          background-color rgba(0, 0, 0, 0.3)
          &:hover
            background-color rgba(0, 0, 0, 0.3)
        &:hover
          background-color rgba(0, 0, 0, 0.1)
    &>ul.left
      li
        border-right 1px solid #666
    &>ul.right
      li
        border-left 1px solid #666
  .dom-func
    padding-bottom 0
  &>section>ul, .dom-func
    padding 5px
    margin 0
    li
      display inline-block
      padding 5px
      margin 0
    button
      padding 4px 10px !important
  .line
    border-top 1px solid rgba(255, 255, 255, 0.3)
</style>
