<template>
  <section class="pdr-category">
    <el-input placeholder="输入关键字进行过滤"
              size="small"
              v-model="filterText">
    </el-input>
    <div class="tree-wrapper">
      <el-tree ref="tree"
               :data="data"
               :highlight-current="true"
               :props="defaultProps"
               :filter-node-method="filterNode"
               @current-change="handleNodeClick"></el-tree>
    </div>
  </section>
</template>

<script>
import codeGenerator from '../../lib/codeGenerator'

export default {
    data() {
        return {
            filterText: '',
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val)
        }
    },
    mounted() {},

    methods: {
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        handleNodeClick(data) {
            if (data.code) {
                codeGenerator.setCode(data.code)
                codeGenerator.syncMirror()
            }
        }
    }
}
</script>

<style lang="stylus">
.pdr-category
  width 20% !important
  height 100%
  background-color rgba(0, 0, 0, 0.8)
  overflow hidden
  .tree-wrapper
    height calc(100% - 30px)
    overflow-y auto
  .el-input__inner
    border-radius 0
    background-color rgba(255, 255, 255, 0.1)
    border none
    color #ccc
  .el-tree
    background-color transparent
    color #eee
    .el-tree-node__label
      font-size 12px
    .el-tree-node
      &.is-current, &.is-focusable.is-current
        &>.el-tree-node__content
          background-color rgba(255, 255, 255, 0.3) !important
    .el-tree-node__content
      background-color rgba(255, 255, 255, 0) !important
      &:hover, &:focus
        background-color rgba(255, 255, 255, 0.1) !important
</style>
