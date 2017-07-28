<template>
    <div class="QueryGrid">
      <Query-bar
        :items="items"
        @param-change="paramChange"
        @button-click="getData">
      </Query-bar>
<Query-table
  :columns="column"
  :data="data"
  @page-change=""
  @on-page-size-change=""
  :pagination="pagination"
>
</Query-table>
    </div>
</template>
<script>
  import QueryBar from './QueryBar.vue'
  import QueryTable from './QueryTable.vue'

    export default{
        name: "QueryGrid",
        data(){
            return {
              params:{},
              pagination:{},
              data:[],
              column:[{}],
              items:[],
            }
        },
        mounted(){
//          this.getConfig();
        },
        methods: {
            paramChange(field,value){
                this.params[field]=value;
                console.log(this.params);
            },
            pageChange(){
                this.getData();
            },
            pageSizeChange(){
                this.getData();
            },
            getData(){
                console.log(this.params);
                let _this=this;
              let url = "xx/xx"+this.param;
              this.$http.get('/static/data/querygrid.json',this.params, function (res) {
                _this.data=res.data;
                }, function (res) {
                _this.$Message.error(res);
              });
            },
            initParams(arr){
                arr.forEach(el=>{
                    if(el.value!=="undefined")
                    {
                        this.params[el.field]=el.value;
                    }
                });
            },
          getParams(params){


          },
          getConfig(){
            let _this=this;
            this.$http.get('/static/data/querygrid.json',[],
              function (res) {
                console.log("grid",res);
                _this.pagination=res.pagination;
                _this.column=res.column;
                _this.items=res.queryfield;
                _this.initParams(_this.items);
                _this.getData();
              },
              function(res){
                _this.$Message.error(res);
              }
            );
          }

        },
      computed: {
      },
      props:["param"],
      components:{
        QueryBar,
        QueryTable
      }

    }
</script>
<style>
    .QueryGrid {
    }
</style>
