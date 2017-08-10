<template>
    <Cascader
      class="Cascaders"
      size="small"
      :data="data"
      v-model="values"
      clearable
      transfer
      filterable
      change-on-select
      @on-change="onSelect"
    >
  </Cascader>
</template>
<script>
    export default{
        name: "Cascaders",
        data(){
            return {
              values:[],
                items:[],
            }
        },
        mounted(){
            this.value.forEach(value=>{
                this.values.push(value.value);
            });
        },
        methods: {
          onSelect(value,selected){
                  this.items.forEach(item=>{
                      this.$emit("on-change","",item);
                  });
                  selected.forEach(value=>{
                    this.items.push(value.field);
                    this.$emit("on-change",value.value,value.field);
                  });
          }
        },
        computed: {},
      props:['value','data','param']

    }
</script>
<style>
    .Cascaders {
      width:180px;
      display: inline-block;
    }
</style>
