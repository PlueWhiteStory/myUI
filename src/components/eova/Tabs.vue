<template>
  <Tabs type="card" :animated="false"  :value="activeTab.name">
    <Tab-pane  label="查询">
      <Query-grid></Query-grid>
    </Tab-pane>
    <Tab-pane v-for="tab in TabDefault" :key="tab.tabId" :icon="tab.tabIcon" :label="tab.tabName">{{tab.tabName}}</Tab-pane>
    <Tab-pane v-for="tab in tabs" :key="tab.tabId" :icon="tab.tabIcon" :closable="true" @on-tab-remove="handleTabRemove" :label="tab.tabName">
      <template
      :is="tab.template"
      :param="tab.param">
      </template>
    </Tab-pane>
  </Tabs>
</template>
<script>
import QueryGrid from './QueryTable/QueryGrid.vue'
  export default {
    data () {
      return {

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
      handleTabRemove(){
          let tabName='测试1Tab';
          this.$store.commit("removeTab",{tabName});
      },
      handleTabsAdd () {
          let tab={
          };
          tab.tabName='测试'+this.tabs.length;
          this.$store.commit("openTab",tab);
          console.log(this.tabs);
      }
    },

    props:['tabs'],
    components:{
        QueryGrid
    }
  }
</script>

<style>
  .ivu-tabs {
    box-sizing: border-box;
    position: relative;
    overflow-x: visible;
    overflow-y: hidden;
    color: #495060;
    zoom: 1;
  }
</style>





