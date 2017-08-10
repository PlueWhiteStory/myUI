<template>
  <Menu  theme="dark" width="auto"  @on-open-change="menuclick">
    <div class="layout-logo-left"></div>
    <Submenu v-for="menu in menus" :name="menu.name" :key="menu.name" >
      <template slot="title">
        <Icon :type="menu.icon" :color="menu.iconColor"></Icon>
        {{menu.name}}
    </template>
      <div class="layout-menu-tree">
          <Tree :data="menu.children" @on-select-change="treeclick"></Tree>
    </div>
    </Submenu>
  </Menu>
</template>
<script>
    export default{
      name: "menu",
        data(){
            return {
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
            treeclick(target){
              console.log("tree-click",target);
              this.$emit("treeclick",target);
            }
        },
        computed:{
        },
      components:{

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
