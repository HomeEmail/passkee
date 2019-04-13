<template>
  <section class="pdr-category">
    <el-input placeholder="输入关键字进行过滤"
              size="small"
              v-model="filterText">
    </el-input>
    <el-tree ref="tree"
             :data="data"
             :highlight-current="true"
             :props="defaultProps"
             :filter-node-method="filterNode"
             @node-click="handleNodeClick"></el-tree>
  </section>
</template>

<script>
export default {
    data() {
        return {
            filterText: '',
            data: [
                {
                    label: '一级 1',
                    children: [
                        {
                            label:
                                '二级 1-1二级 1-1二级 1-1二级 1-1二级 1-1二级 1-1二级 1-1',
                            children: [
                                {
                                    label: '三级 1-1-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 2',
                    children: [
                        {
                            label: '二级 2-1',
                            children: [
                                {
                                    label: '三级 2-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 2-2',
                            children: [
                                {
                                    label: '三级 2-2-1'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: '一级 3',
                    children: [
                        {
                            label: '二级 3-1',
                            children: [
                                {
                                    label: '三级 3-1-1'
                                }
                            ]
                        },
                        {
                            label: '二级 3-2',
                            children: [
                                {
                                    label: '三级 3-2-1'
                                }
                            ]
                        }
                    ]
                }
            ],
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
            console.log(data)
        }
    }
}
</script>

<style lang="stylus">
.pdr-category
  width 25%
  height 100%
  .el-input__inner
    border-radius 0
    background-color rgba(255, 255, 255, 0.1)
    border none
    color #ccc
  .el-tree
    background-color transparent
    color #eee
    .el-tree-node
      &.is-current
        &>.el-tree-node__content
          background-color rgba(255, 255, 255, 0.3)
    .el-tree-node__content:hover
      background-color rgba(255, 255, 255, 0.1)
</style>
