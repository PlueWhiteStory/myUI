<template>
    <div class="QueryTable">
      <Table
        class="layout-table"
        :columns="columns"
        :data="_data"
        stripe
        border
        highlight-row
        height="400px"
        @on-row-click="rowClick"
        @on-current-change="currentChange"
        size="small"></Table>
      <div v-show="pagination.isShowPagination">
      <Page class="layout-table"
            :total="total"
            size="small"
            :current="pagination.currentPage"
            :pageSize="pagination.pageSize"
            :page-size-opts="pagination.pageSizeOpt"
            show-sizer
            show-elevator
            @on-change="pageChange"
            @on-page-size-change="pageSizeChange"></Page>
      </div>
    </div>
</template>
<script>
  import $ from 'jquery'
    export default{
        name: "QueryTable",
        data(){
            return {
                total:0,
              defaultPagination:{
                isShowPagination:true,
                currentPage:1,
                pageSize:10,
                pageSizeOpts:[10,30,50,100,500]
              }
            }
        },
        mounted(){
          console.log("grid data", this.data);
          console.log("grid columns", this.columns);
          this.total = 0;
          this.initPagination();
        },
        methods: {
            pageChange(value){
              this.$emit("on-page-change",value);
            },
            pageSizeChange(value){
                this.$emit("on-page-size-change",value);
            },
          rowClick(row){
                console.log(row);
                this.$emit("on-row-click",row);
          },
          currentChange(currentRow,oldCurrentRow){
            this.$emit("on-current-change",currentRow,oldCurrentRow);

          },
          initPagination(){

              if(this.pagination===undefined)
              {
                this.pagination=this.defaultPagination;
                return ;
              }
          }
        },
        watch:{
          data(){
              console.log("data is change");
          },
          columns(){
              console.log("columns is  change")
          }
        },
        computed: {
            _data:{
              set:function(data){

              },
              get:function(){
                if (this.data === undefined || this.data.data == undefined) {
                  return []
                } else
                  return this.data.data;
              }
            }
        },
      props:{
          data:{
//              default:function(){
//                  return  {
//                    total:0,
//                    data:[]
//                  }
//              }
          },
          columns:{
              type:Array,
            default:function(){
                return [{}]
            }
          },
          pagination:{
            type:Object,
            default:function(){
                return {
                  isShowPagination:true,
                  pageSize:10,
                  pageSizeOpts:[10,30,50,100,500]
                }
            }
          }
      }


    }
</script>
<style>
    .QueryTable .ivu-table-row-highlight{
      background-color: #2db7f5;
    }
</style>
