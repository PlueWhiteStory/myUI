<template>
  <div class="header">
    <div class="backgroundImg" v-show="false">
        <img class="img"  id="imgLeft"  :src="backgroundImg.left"/>
        <img class="img"  id="imgCenter" :src="backgroundImg.center"/>
        <img class="img"  id="imgRight" :src="backgroundImg.right"/>
    </div>
  </div>
</template>
<script>
    export default{
        name: "Header",
        data(){
            return {
              background:'',
            }
        },
        methods: {
        },
        computed: {
            user(){
                return this.$store.state.user;
            },
          backgroundImg(){
                if(this.header.sys_bg_url===undefined)
            return {

            };
              else{
               return Object.assign(this.header.sys_bg_url);
            }
          }
        },
      props:["header"]
    }
</script>
<style>
  div.header > .backgroundImg {
    height:100%;
    width:100%;
  }
  .header  .img {
    float:left;
    height:100%;
    display: inline-block;
    border: 0px;
    margin: 0px;
    padding: 0px;
  }
  .header #imgLeft{
    width:400px;
  }
  .header #imgCenter{
    width:calc(100% - 700px);
  }
  .header #imgRight{
    width:300px;
  }
  .header{
    height: 60px;
    background: #2d8cf0;
  }
  .layout-head-menu{
    float:right;
  }
</style>
