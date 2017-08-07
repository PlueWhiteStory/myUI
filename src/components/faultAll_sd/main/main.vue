<template>
  <div id="main">
      <div id="header">
        <my-header></my-header>
      </div>
      <div id="content">

      </div>
      <div id="footer">
        <p style="text-align: center;color:#fff">国网山东省电力调控中心  版本所有  版本号：2.0</p>
      </div>
  </div>
</template>

<script>
    import "@/components/faultAll_sd/css/media.css"
    import  header from "./header/header.vue"

    export default {
        data () {
            return {}
        },
        mounted () {

        },
        methods: {},
        components: {
          "my-header": header
    }
    }
</script>

<style>
  #main {
    width:100%;
    height:100%;
    overflow: hidden;
  }
  #footer {
    position:fixed;
    bottom:0;
    width: 100%;
    height: 30px;
    background-color: #118481;
  }

</style>
