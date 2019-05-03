<template>
  <section class="pdr-helper-network">
    <div class="list">
      <template v-for="(item, i) in networkList">
        <div class="item"
             :key="i"
             @click="clck(item)"
             flex="box:first">
          <div class="icon"
               :style="{'background-color': '#' + (colors[item.resourceType] || '555')}">{{trans[item.resourceType] || '??'}}</div>
          <div class="url"
               :title="item.url">
            <h4><span>{{item.method}}</span> - /{{item.lastPath}}</h4>
            <p>{{item.url}}</p>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
<script>
import codeGenerator from '../util/codeGenerator'
export default {
    data() {
        return {
            networkList: [],
            active: -1,
            trans: {
                document: 'DOC',
                stylesheet: 'CSS',
                image: 'IMG',
                media: 'M',
                font: 'F',
                script: 'JS',
                xhr: 'XHR',
                eventsource: 'ES',
                websocket: 'WS'
            },
            colors: {
                document: '',
                stylesheet: '555',
                image: '666',
                media: '',
                font: '',
                script: '777',
                xhr: '999',
                eventsource: '888',
                websocket: '888'
            }
        }
    },

    mounted() {
        this.networkList = TNK.getState('networkList')
        console.log(`TNK.getState('networkList')`, this.networkList)
        TNK.sub('network-list-change', (list) => {
            console.log(`TNK.sub('network-list-change'`, list)
            this.networkList = list
        })
    },

    methods: {
        clck(req) {
            codeGenerator.insertLine({ type: 'request', options: req })
        }
    }
}
</script>

<style lang="stylus">
.pdr-helper-network
  max-height calc(100% - 30px)
  display inline-block
  overflow auto
  width 100%
  background-color rgba(0, 0, 0, 0.8)
  .list
    width 100%
  .item
    color #eee
    font-size 12px
    user-select auto
    width 100%
    cursor pointer
    border-bottom rgba(255, 255, 255, 0.2) 1px solid
    &:hover
      background-color rgba(255, 255, 255, 0.1)
    &:active
      background-color rgba(255, 255, 255, 0.3)
    .icon
      width 30px
      height 30px
      margin 5px
      color #fff
      line-height 30px
      text-align center
      font-size 12px
      background-color rgba(255, 255, 255, 0.3)
      border-radius 25px
      box-shadow -3px -3px 0px 0px rgba(0, 0, 0, 0.2) inset
    .url
      line-height 1.3
      height 40px
      padding 4px 0
      width calc(100% - 40px)
      h4, p
        padding-right 10px
        padding-left 5px
        display block
        width 100%
        white-space nowrap
        text-overflow ellipsis
        overflow hidden
        span
          color #4782b9
      p
        color #ccc
</style>
