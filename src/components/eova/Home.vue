<template>
  <div class="home" :style="winHeight">
  <my-header class="layout-header" :data="header"></my-header>
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
          winHeight:{
              height:window.innerHeight+"px",
          },
        menus:[],
        user:{},
        header:{}
      }
    },
    mounted(){
//        this.getData();
    },
    methods:{
//      getData(){
//        let _this=this;
//        let url=
//        this.$http.get('/toHome',[],function(response){
//          let data=response;
//          _this.$store.commit("user",data.user);
//          _this.$store.commit("menus",data.menus);
//          _this.user=data.user;
//          _this.menus=data.menus;
//          _this.header=data.header;
//        }, function(response){
//          // 响应错误回调
//          _this.$Message.error(response.error);
//        });
//      },
      updateMenu(){
//        // 传统写法
//        this.$http.get('/static/data/menus.json',{},function(response){
//          // 响应成功回调
//          let menus=data;
//          console.log(this.menus);
//        },function(response){
//          // 响应错误回调
//          this.$Message.error(response.error);
//        });
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
  *{
    box-sizing:content-box;/* 伸缩项目自动box-sizing:border-box，所以需调整为content-box */
    margin:0;
    padding:0;
  }

  .home{
    display:flex;
    flex-direction:column;/* 头、中部、脚纵向显示 */
  }
  .home > * {
    display: block;
  }

  layout-header{
    flex:0 0 50px;/* 头、脚尺寸固定，不放大、不缩小 */
  }

  layout-footer{
    flex:0 0 40px;/* 头、脚尺寸固定，不放大、不缩小 */
  }

  .layout-content{
    /*
    横向中间内容区自适应，即使未指定宽度，但会分配宽度
    块级元素未主动设置宽度或未被子元素撑起宽度，浏览器默认为块级元素分配宽度为可使用的全部宽度，比如全屏宽。
    */
    flex:1;
  }


</style>

