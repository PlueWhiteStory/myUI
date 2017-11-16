<template>
  <Tabs class="Tabs" type="card" :animated="false"  :value="activeTab.tabName" @on-tab-remove="handleTabRemove">
    <Tab-pane v-for="tab in TabDefault" :key="tab.tabId" :icon="tab.tabIcon" :label="tab.tabName">{{tab.tabName}}</Tab-pane>
    <Tab-pane v-for="tab in tabs"
              :name="tab.tabName"
              :key="tab.tabId"
              :icon="tab.tabIcon"
              :closable="true"
              :label="tab.tabName"
              v-if="tab.show">
      <component  :is="tab.template.templateName"
                  :data="tab.template.data"
                  :param="tab.template.param">
      </component>
    </Tab-pane>
  </Tabs>
</template>
<script>
import QueryGrid from './QueryTable/QueryGrid.vue'
import MasterSlaveGrid from './MasterSlave/MasterSlaveGrid.vue'
import TreeGrid from './TreeGrid/TreeGrid.vue'
  export default {
    data () {
      return {
          param:{
            url:"/lbq",
            objectCode:'lbq_ob'
          },
        TabDefault:[{
            tabId:'1',
            tabName:'测试1Tab',
            tabIcon:'pin',
            data:{},
            template:{
            templateName:"",
            param:{}
          }
        },{
          tabId:'2',
          tabName:'测试2Tab',
          tabIcon:'pin',
          data:{},
          template:{},
        }],
      }
    },
    computed:{
        activeTab(){
          return this.$store.state.activeTab;
        }
    },
    methods: {
      handleTabRemove(tabName){
          this.$store.commit("removeTab",{tabName});
      },
      handleTabsAdd () {
      }
    },

    props:['tabs'],
    components:{
      QueryGrid,
      MasterSlaveGrid,
      TreeGrid
    }
  }
</script>

<style>
  .Tabs.ivu-tabs {
    box-sizing: border-box;
    position: relative;
    overflow-x: visible;
    overflow-y: hidden;
    color: #495060;
    zoom: 1;
  }
  .Tabs{
    height:100%;
    width: 100%;
  }
  .Tabs .ivu-tabs-bar{
    margin-bottom:6px;
  }
  .Tabs .ivu-tabs-content{
    height: 100%;
  }
  .Tabs .ivu-tabs-tabpane{
    width: 100%;
    height: calc(100% - 39px);
  }
</style>





