<style scoped>
  .layout{
    background: #f5f7f9;
    position: relative;
  }
  .layout-content{
    height:calc(100%);
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    margin: 10px;
  }
  .layout-menu-left{
    background: #464c5b;
  }


</style>
<template>
  <div class="layout-content">
    <Row style="height:100%" type="flex">
      <i-col span="3" class="layout-menu-left ">
        <my-menu :menus="menus" @treeclick="treeclick"></my-menu>
      </i-col>
      <i-col span="21">
        <div class="layout-content">
          <my-tabs class="layout-content-main" :tabs="tabs"></my-tabs>
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
  import menu from './Menu.vue'
  import tabs from  './Tabs.vue'
  export default{
    name: "Content",
    data(){
      return {
      }
    },
    mounted(){
    },
    methods:{
      treeclick(node){
          let tab = {};
        tab.tabId=node[0].id;
        tab.tabName =node[0].name;
        tab.tabIcon=node[0].icon;
        tab.template=node[0].template;
        tab.show=true;
        this.$store.commit("openTab",tab);
      },
      menu_filter(menus){
          return menus;

      }
    },
    computed:{
      tabs(){
        return   this.$store.state.tabs;
      }
    },
    components:{
       'my-menu':menu,
      'my-tabs':tabs,
    },
    props:['menus']

  }
</script>


