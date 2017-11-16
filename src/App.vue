<template>
  <div id="app">
     <home></home>
  </div>
</template>

<script>
  import home from "./components/eova/components/Home.vue"
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
