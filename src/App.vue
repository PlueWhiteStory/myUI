<template>
  <div id="app">
    <!--<report></report>-->
     <home></home>

  </div>
</template>

<script>
//  import report from "./components/reviseReport/report.vue"
//// import main from "./components/eova/Home.vue"
import  home from "./components/faultAll_sd/main/main.vue"
export default {
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  },
  components: {
//      report,
    home,
  }
}
</script>

<style>
.el-button--primary, .ivu-btn-primary {
  background-color: #00706B !important;
  border-color: transparent;
}
body, html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: Helvetica, sans-serif;
}
#app {
  height: 100%;
}
</style>
