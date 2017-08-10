<template>
    <div class="QueryTable">
      <Table
        class="layout-table"
        :columns="columns"
        :data="data.data"
        stripe
        border
        highlight-row
        height="400px"
        @on-row-click="rowClick"
        @on-current-change="currentChange"
        size="small"></Table>
      <div v-show="pagination.isShowPagination">
      <Page class="layout-table"
            :total="data.total"
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
              defaultPagination:{
                isShowPagination:true,
                currentPage:1,
                pageSize:10,
                pageSizeOpts:[10,30,50,100,500]
              }
            }
        },
        mounted(){
            console.log("grid data",this.data);
          console.log("grid column",this.columns);
          this.initPagination(this.pagination);
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
          initPagination(pagination){
              if(pagination.isShowPagination==undefined)
                pagination.isShowPagination=this.defaultPagination.isShowPagination;
                if(pagination.currentPage==undefined)
                  pagination.currentPage=this.defaultPagination.currentPage;
                if(pagination.pageSize==undefined)
                    pagination.pageSize==this.defaultPagination.pageSize;
                if(pagination.pageSizeOpt==undefined)
                    pagination.pageSizeOpt=this.defaultPagination.pageSizeOpt;
          }
        },
        watch:{
          data(){
              console.log("data is change");

          }
        },
        computed: {},
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
