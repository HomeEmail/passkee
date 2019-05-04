<template>

  <section class="pdr-helper">
    <header flex>
      <ul flex
          class="left">
        <li :class="[active === 'domkit' ? 'active' : '']"
            @click="active = 'domkit'">TestKit</li>
        <li :class="[active === 'network' ? 'active' : '']"
            @click="active = 'network'">Network</li>
      </ul>
      <ul class="right"></ul>
    </header>
    <section v-if="active === 'domkit'">
      <ul>
        <li class="btn"
            v-for="(item, i) in ['click', 'input', 'focus', 'blur','hover', 'mouseenter', 'mouseleave']"
            :key="i"
            @click="clck({type: 'trigger', options:{event: item}})">
          {{item}}
        </li>
      </ul>
      <div class="dom-func line">
        <span class="group">
          <span :class="['btn', item === domMode ? 'active' : '']"
                v-for="(item, i) in ['waitFor', 'expect', 'get']"
                :key="i"
                @click="domModeChange(item)">{{item}}</span>
        </span>
      </div>
      <ul>
        <li class="btn"
            v-for="(item, i) in dom"
            @click="clck({type: 'dom', options:{mode: domMode, func: item}})"
            :key="i">
          {{item}}
        </li>
      </ul>

      <ul class=" line">
        <li class="btn"
            v-for="(item, i) in bom"
            @click="toInsertLine({type: 'page', options:{func: item}})"
            :key="i">
          {{item}}
        </li>
      </ul>
    </section>
    <Network v-if="active === 'network'" />
  </section>
</template>

<script>
import codeGenerator from '../util/codeGenerator'
import Network from './Network.vue'
import constant from '../../../common/constant'
let dbclickTimer = 0
let clickTimo = 0

export default {
    components: { Network },
    data() {
        return {
            active: 'domkit',
            domMode: 'waitFor',
            dom: [...constant.dom],
            bom: [...constant.bom]
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
            codeGenerator.replaceFocusedLine({
                type: 'dom',
                options: { mode: mode }
            })
        },

        toChangeLine(opts) {
            codeGenerator.replaceFocusedLine(opts)
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
  user-select none
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
  &>section
    max-height calc(100% - 30px)
    overflow auto
    &>ul, .dom-func
      padding 5px
      margin 0
      li
        display inline-block
        margin 5px
        line-height 1
      .group
        display inline-block
        border-radius 3px
        overflow hidden
        &>.btn
          border-radius 0
          border-right 1px solid #ccc
          background-color rgba(255, 255, 255, 0.9)
          &:last-child
            border-right none
      .btn
        display inline-block
        padding 2px 6px
        background-color #ffffff
        color #333
        font-size 13px
        font-weight bold
        border-radius 3px
        font-weight 400
        cursor pointer
        transition all 0.2s
        &:hover
          background-color rgba(255, 255, 255, 0.8)
          color #000
        &:active
          background-color rgba(255, 255, 255, 0.3)
        &.active
          background-color rgba(255, 255, 255, 0.6)
          font-weight bold
  .line
    border-top 1px solid rgba(255, 255, 255, 0.3)
</style>
