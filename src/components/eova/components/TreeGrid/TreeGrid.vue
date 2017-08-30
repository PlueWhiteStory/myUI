<template>
  <div class="TreeGrid">
    <Row  style="height:100%" type="flex">
      <i-col span="4">
        <Inputer-tree :param="param"
        @on-select-change="onTreeClick"></Inputer-tree>
      </i-col>
      <i-col span="20">
        <div v-show = "modalShow">
          <component  :is="template.templateName"
                    :data="template.data"
                    :param="template.param">
          </component>
        </div>
        <div v-show = "!modalShow">
          <component  :is="template.templateName"
                      :data="template.data"
                      :param="template.param">
          </component>
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
  import ICol from "../../../../../node_modules/iview/src/components/grid/col";
  import InputerTree from './InputerTree.vue'
  import QueryGrid from  '../QueryTable/QueryGrid.vue'
  import MasterSlaveGrid from  '../MasterSlave/MasterSlaveGrid.vue'
    export default{
        name: "TreeGrid",
        data(){
            return {
              modalShow:true,
              template:{}
            }
        },
        methods: {
            onTreeClick(node){
            this.template = Object.assign({},node[0].template);

            }

        },
        computed: {

        },
        components: {
          ICol,
          InputerTree,
          MasterSlaveGrid,
          QueryGrid
        },
        props: ["param","data"]
    }
</script>
<style>
    .TreeGrid  .tree-layout{
      background: red;
    }
  .TreeGrid .grid-layout{
    background: greenyellow;
  }
</style>
