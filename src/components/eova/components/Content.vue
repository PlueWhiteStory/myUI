<style scoped>
  .layout-content{
    height:inherit;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
  }



  .content.content-menu{
    width:200px;
    margin-right: 2px;
  }
  .content.content-tab{
    width:calc(100% - 200px);
  }


</style>
<template>
  <div class="layout-content">
      <div class="content content-menu">
        <my-menu :menus="menus" @treeclick="treeclick"></my-menu>
      </div>
        <div class="content content-tab">
          <my-tabs :tabs="tabs"></my-tabs>
        </div>
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
        tab.tabId=node.id;
        tab.tabName =node.name;
        tab.tabIcon=node.icon;
        tab.template=node.template;
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


