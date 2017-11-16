<template>
    <div class="QueryGrid">
      <Query-bar
        :items="items"
        @param-change="paramChange"
        @button-click="getData">
      </Query-bar>
<Query-table
  :columns="columns"
  :data="data"
  @on-page-change="pageChange"
  @on-page-size-change="pageSizeChange"
  @on-current-change="currentChange"
  @on-row-click="rowClick"
  :pagination="pagination"
>
</Query-table>
    </div>
</template>
<script>
  import QueryBar from './QueryBar.vue'
  import QueryTable from './QueryTable.vue'
  import $ from 'jquery'

    export default{
        name: "QueryGrid",
        data(){
            return {
              params:{},//用于传递到后台的查询数据。
              pagination:undefined,
              data:[],
              columns:[{}],
              items:[],
            }
        },
        mounted(){
          this.getConfig();
          this.$nextTick(function () {
              this.firstRowClick();

          });
        },
        methods: {
            paramChange(value,field){
                this.params[field]=value;
            },
            pageChange(page){
              this.paramChange("page",page);
              this.getData();
            },
            pageSizeChange(pageSize){
              this.paramChange("pageSize",pageSize);
              this.pagination.currentPage=1;
            },
            rowClick(row){
                //this.$on("on-row-click");
                this.$emit("on-row-click",row);
            },
            currentChange(currentRow,oldCurrentRow){
                this.$emit("on-current-change",currentRow,oldCurrentRow);
            },
            getData(){
              let _this=this;
              let url = this.param.url;
              console.log("params",_this.params);
              this.$http.get("/singlegrid/list",_this.params,function (res) {
                _this.data=res;
                _this.$emit("on-set-data",_this.data);
                }, function (res) {
                  console.log(res);
               _this.$Message.error(res);
              });
            },
            firstRowClick(){
               let firstrow=   $(".ivu-table-row");
               console.log("firstRow",firstrow);
            },
            initParams(arr){
                if(this.param!==undefined)  //把param的传入数据，放入到params中
                    this.params=Object.assign(this.param);
                arr.forEach(el=>{   //初始化查询条件，value可能是值可能是数组。
                    if(el.value!==undefined)
                    {
                        if(el.value instanceof Array)
                        {
                            el.value.forEach(val=>{
                                this.params[val.field]=val.value;
                            });
                        }else {
                            if(el.value instanceof  Object)
                                return;
                          this.params[el.field]=el.value;
                        }
                    }
                });
            },
          getParams(params){


          },
          getConfig(){
            let _this=this;
            this.$http.get('/singlegrid/config',[_this.param],
              function (res) {
                _this.pagination=res.pagination;
                _this.columns=res.column;
                _this.items=res.queryfield;
                _this.initParams(_this.items);
                _this.getData();
              },
              function(res){
                //_this.$Message.error(res);
                console.log(res);
              }
            );
          }

        },
      watch:{
        destroy:function(){
            this.$destroy();
        }
      },
      computed: {
      },
      props:["param","destroy"],
      components:{
        QueryBar,
        QueryTable
      }

    }
</script>
<style>

</style>
