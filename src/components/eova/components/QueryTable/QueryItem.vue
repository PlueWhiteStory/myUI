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
  import Cascaders from './FormField/Cascaders.vue'
    export default{
        name: "QueryItem",
        data(){
            return {
            }
        },
        methods: {
            onchange(value,field){
                if(field===undefined)
                this.$emit("on-change",value,this.item.field);
                else
                  this.$emit("on-change",value,field);
            }
        },
        computed: {},
      components:{
        Radios,
        Selects,
        Timer,
        TimeTime,
        Inputer,
        Cascaders,
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
