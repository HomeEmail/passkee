<template>
  <section id="puppeteer-domkit-recorder"
           class="puppeteer-domkit-recorder"
           :style="{height: height + 'px'}"
           flex="box:justify">
    <PdrCategory ref='category'></PdrCategory>
    <PdrCode ref='code'></PdrCode>
    <PdrHelper ref='helper'></PdrHelper>
  </section>
</template>

<script>
import PdrCategory from './components/Category.vue'
import PdrCode from './components/Code.vue'
import PdrHelper from './components/Helper.vue'
import codeGenerator from './util/codeGenerator'

export default {
    name: 'puppeteer-domkit-recorder',
    components: { PdrCategory, PdrCode, PdrHelper },
    data() {
        return {
            height: 300
        }
    },
    watch: {},
    created() {},
    beforeMount() {
        console.log(`[pdr-command]ready=1`)
    },
    mounted() {},
    computed: {
        category() {
            return this.$refs.category
        },
        code() {
            return this.$refs.code
        },
        helper() {
            return this.$refs.helper
        }
    }
}
</script>

<style lang="stylus">
.puppeteer-domkit-recorder
  background-color rgba(0, 0, 0, 0.5)
  position fixed
  bottom 0
  left 0
  right 0
  width 100%
  z-index 900000
  &>*
    height 100%
  *
    margin 0
    padding 0
</style>
