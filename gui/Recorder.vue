<template>
  <section id="puppeteer-domkit-recorder"
           class="puppeteer-domkit-recorder"
           :style="{height: height + 'px'}"
           flex="box:justify">
    <PdrCategory></PdrCategory>
    <PdrCode></PdrCode>
    <PdrHelper></PdrHelper>
  </section>
</template>

<script>
import listenDocumentEvent from './listenDocumentEvent'
import PdrCategory from './components/Category.vue'
import PdrCode from './components/Code.vue'
import PdrHelper from './components/Helper.vue'
export default {
    name: 'puppeteer-domkit-recorder',
    components: { PdrCategory, PdrCode, PdrHelper },
    data() {
        return {
            height: 200
        }
    },
    watch: {},
    mounted() {
        listenDocumentEvent.on()
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
  z-index 9000
  &>*
    height 100%
  *
    margin 0
    padding 0
</style>
