<template>
  <div  class="tree-grid-layout">
    <div class="tree  tree-tree">
        <Inputer-tree :param="param"
        @on-node-click="onTreeClick"></Inputer-tree>
    </div>
    <div class="tree  tree-tree-grid" v-cloak>
      <div>
      <keep-alive v-if="!show">
          <component :is="template.templateName"
                      :data="template.data"
                      :param="template.param">
          </component>
        </keep-alive>
      </div>
      <div>
        <keep-alive v-if="show">
          <component :is="template.templateName"
                     :data="template.data"
                     :param="template.param">
          </component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
  import InputerTree from './InputerTree.vue'
  import QueryGrid from  '../QueryTable/QueryGrid.vue'
  import MasterSlaveGrid from  '../MasterSlave/MasterSlaveGrid.vue'
    export default{
        name: "TreeGrid",
        data(){
            return {
              show:true,
              destroy:true,
              template:{

              }
            }
        },
        methods: {
            onTreeClick(node){
            this.template = Object.assign({},node.template);
            this.show = !this.show;
            },
        },
        computed: {

        },
        components: {
          InputerTree,
          MasterSlaveGrid,
          QueryGrid
        },
        props: ["param","data"]
    }
</script>
<style>
  .tree-grid-layout{
    display:flex;
    width: 100%;
    height: 100%;
  }
  .tree{
    margin: 0 3px;
  }

  .tree-tree{
    max-width: 150px;
    min-width: 150px;
    border:1px solid #dddee1;
    box-shadow: 3px 3px 3px #dddee1;
  }

</style>
