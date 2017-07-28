<template>
    <div class="QueryItem">
      <label >{{item.label}} : </label>
      <component  :is="item.template"
                  size="small"
                  :value="item.value"
                  :data="item.data"
                  :param="item.param"
                  @on-change="onchange">
      </component>
    </div>
</template>
<script>
  import Radios from './FormField/Radios.vue'
  import Selects from './FormField/Selects.vue'
  import Timer from './FormField/Timer.vue'
  import TimeTime from './FormField/TimeTime.vue'
  import Inputer from './FormField/Inputer.vue'
    export default{
        name: "QueryItem",
        data(){
            return {

            }
        },
        methods: {
            onchange(value){
                this.$emit("on-change",this.item.field,value);
            }
        },
        computed: {},
      components:{
        Radios,
        Selects,
        Timer,
        TimeTime,
        Inputer
      },
      props:{
            item:{
              type:Object,
            }
      }

    }
</script>
<style>
    .QueryItem {
      display:inline;
      margin: 0px 40px 0px 10px;
    }
</style>
