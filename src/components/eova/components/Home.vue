<template>
  <div class="home">
  <my-header class="layout-header" :header="header"></my-header>
  <my-content class="layout-content" :menus="menus"></my-content>
  <my-footer class="layout-footer"></my-footer>
  </div>
</template>
<script>
  import header from './Header.vue'
  import footer from './Footer.vue'
  import content from './Content.vue'
  export default {
    data () {
      return {

        menus:[],
        user:{},
        header:{}
      }
    },
    mounted(){
        this.getData();
    },
    methods:{
      getData(){
        let _this=this;
        this.$http.get('/toHome',[],function(response){
          let data=response;
          _this.$store.commit("user",data.user);
          _this.$store.commit("menus",data.menus);
          _this.user=data.user;
          _this.menus=data.menus;
          _this.header=data.header;
        }, function(response){
          // 响应错误回调
          _this.$Message.error(response);
        });
      },
      updateMenu(){
        // 传统写法
        let _this=this;
        this.$http.get('/sideMenus',{},function(response){
          // 响应成功回调
          _this.menus=data;
          console.log(_this.menus);
        },function(response){
          // 响应错误回调
          _this.$Message.error(response.error);
        });
      }
    },
    components:{
      'my-header':header,
      'my-footer':footer,
      'my-content':content,
    }
  }
</script>
<style>
  html,body{
    width: 100%;
    height: 100%;
  }

  .home{
    display:flex;
    height:100%;
    min-height: 500px;
    flex-direction:column;/* 头、中部、脚纵向显示 */
  }
  .home > * {
    display: block;
    box-sizing:content-box;/* 伸缩项目自动box-sizing:border-box，所以需调整为content-box */
  }



</style>

