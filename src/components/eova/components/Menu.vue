<template>
  <Menu style="height:-webkit-fill-available;" theme="dark" width="auto"  @on-open-change="menuclick">
    <div class="layout-logo-left"></div>
    <Submenu v-for="menu in menus" :name="menu.name" :key="menu.name" >
      <template slot="title">
        <Icon :type="menu.icon" :color="menu.iconColor"></Icon>
        {{menu.name}}
    </template>
      <div class="layout-menu-tree">
          <ZTree :treeId="menu.id" :tree-data="menu.children" :setting="setting"></ZTree>

    </div>
    </Submenu>
  </Menu>
</template>
<script>
  import ZTree from './BaseComponents/zTree/zTree.vue'
    export default{
      name: "menu",
        data(){
            return {
                setting:{
                    callback:{
                        onClick:this.treeclick
                    },
                    view:{
                      fontCss:{
                          color:'#2d8cf0',
                        fontSize:"26px",
                      }
                    }
                },

            }
        },
        methods: {
            menuclick(name){
                let temp ;
                this.menus.forEach(menu=>{
                    if(name==menu.name)
                    {
                        temp = menu;
                    }
                });
                console.log("menu-open",temp);
                this.$emit("menuopen",temp);
            },
            treeclick(event,treeid,node){
              console.log("tree-click",node);
              let tab = {};
              tab.id=node.tId;
              tab.name =node.name;
              tab.template=node.template;
              tab.show=true;
              this.$emit("treeclick",tab);
            }
        },
        computed:{
        },
      components:{
            ZTree

      },
      props:["menus"]

    }
</script>
<style>
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .ul{
      background-color: #9ea7b4;
  }
  ivu-tree-arrow ivu-tree-arrow-open{

  }
  .layout-menu-tree{
    margin-left:30px;
  }
  .ivu-menu-submenu-title{
    font-size: large;

  }
  .ivu-tree-title{
    font-size: large;
  }
  .ivu-tree-title:hover{
    background-color: #2d8cf0;
  }
  .ivu-tree-title-selected{
    background-color: #2d8cf0;
  }
  .ivu-tree-title-selected:hover {
    background-color: #2d8cf0;
  }
  .ivu-tree-title{
    color: #fff;
  }
</style>
