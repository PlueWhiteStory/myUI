<template>
  <div class="header">
          <div class="layout-head-menu">
          <Menu mode="horizontal" theme="dark" active-name="1">
            <Submenu name="3">
              <template slot="title">
                <Icon type="person"></Icon>
                {{user.name}}
            </template>
              <Menu-group title="使用">
                <Menu-item name="3-1">消息</Menu-item>
                <Menu-item name="3-2">修改密码</Menu-item>
                <Menu-item name="3-3">注销用户</Menu-item>
                <Menu-item name="3-4">重新登录</Menu-item>
              </Menu-group>
            </Submenu>
          </Menu>
        </div>
  </div>
</template>
<script>
    export default{
        name: "Header",
        data(){
            return {
                user:{
                    name:"qw42"
                }
            }
        },
        methods: {},
        computed: {},

    }
</script>
<style>
  .header{
    height: 60px;
    background: #5cadff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-head-menu{
    float:right;
  }
</style>
