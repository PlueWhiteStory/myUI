<template>
    <div class="QueryBar">
      <Query-item
            :key="item.name" name="item"
            v-for="item in items"
            :item="item"
            @on-change="onchange"
      >
      </Query-item >
      <Button type="info" size="small" @click="buttonclick">查询</Button>
    </div>
</template>
<script>
  import QueryItem from './QueryItem.vue'
    export default{
        name: "QueryBar",
        data(){
            return {}
        },
        methods: {
            onchange(field,value){
                console.log(field,value);
                this.$emit("param-change",field,value);
            },
          buttonclick(){
                this.$emit("button-click");
          }
        },
        computed: {},
      components:{
            QueryItem,
      },
      props:["items"]
    }
</script>
<style>
    .QueryBar query-bar-layout{
      display:inline  ;

    }
  .QueryBar{
    margin:5px 0px 10px 0px;
  }
</style>
