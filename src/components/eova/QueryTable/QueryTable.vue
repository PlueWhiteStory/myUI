<template>
    <div class="QueryTable">
      <Table :columns="columns"
             :data="data"
             stripe
             border
             height="400px"
             size="small"></Table>
      <div v-show="pagination.isShowPagination">
      <Page :total="data.total"
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
          this.initPagination(this.pagination);
        },
        methods: {
            pageChange(value){
                console.log(value);
              this.$emit("on--page-change",value);
            },
            pageSizeChange(value){
                this.$emit("on-page-size-change",value);
            },
          initPagination(pagination){
            if(pagination==undefined){
              pagination=this.defaultPagination;
              console.log("initpagination",pagination);
              return;
            }
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
        computed: {},
      props:["data","columns","pagination"]

    }
</script>
<style>
    .QueryTable {
    }
</style>
