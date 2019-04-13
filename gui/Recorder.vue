<template>
  <section id="puppeteer-domkit-recorder"
           class="puppeteer-domkit-recorder"
           :style="{height: height + 'px'}"
           flex>
    <PdrCategory></PdrCategory>
    <PdrCode></PdrCode>
    <section class="pdr-tips"></section>
  </section>
</template>

<script>
import PdrCategory from './components/Category.vue'
import PdrCode from './components/Code.vue'
export default {
    name: 'puppeteer-domkit-recorder',
    components: { PdrCategory, PdrCode },
    data() {
        return {
            height: window.innerHeight
        }
    },
    watch: {},
    mounted() {
        this.height = window.innerHeight
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
</style>
