<template>
    <div class="MasterSlaveGrid">
      <Query-grid
        :param="masterParam"
      @on-set-data="onGetMasterData"></Query-grid>
      <Tabs class="Tabs" type="card" :animated="false"   :value="tabValue">
        <Tab-pane v-for="tab in slaveParams" :key="tab.objectCode"  :label="tab.label" :name="tab.objectCode">
          <query-table
            :data="tab.data"
            :columns="tab.columns"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
            @on-row-click="rowClick"
            @on-current-change="currentChange"
          ></query-table>
        </Tab-pane>
      </Tabs>
    </div>
</template>
<script>
  import QueryGrid from '../QueryTable/QueryGrid.vue'
  import QueryTable from '../QueryTable/QueryTable.vue'
    export default{
        name: "MasterSlaveGrid",
        data(){
            return {
              tabValue:'',
              masterData:[],
              masterSelectRow:{},
              slaveParams:[],
              pagination:{

              }
            }
        },
      mounted(){
        this.getSlaveParams();
        console.log("mounted master",this.slaveParams[0]);
        this.tabValue=this.slaveParams[0].objectCode;//设置默认选择第一个Tab,
        this.getSlavesConfig();  //获取表格配置项
      },
        methods: {
          getSlavesConfig(){
            let _this=this;
            this.$http.get('/masterslavegrid/config',[this.slaveParams],function(res){
                _this.slaveParams.forEach(slave=>{
                  slave.colnums=res.slaveColumn[slave.objectCode];
                });
            });
            console.log("config",this.slaveParams);
          },
          onGetMasterData(data){
              this.masterData=data;
              //设置第一行被选中
            let masterKey = this.masterData.data[0][this.masterField];
            this.getSlaveData(masterKey);
            console.log("slaveParam",this.slaveParams);
          },
          getSlaveData(key){
              this.slaveParams.forEach(slaveParam=>{
                console.log(slaveParam);
                slaveParam.param[slaveParam.field]=key;
                      let _this = this;
                this.$http.get('/singlegrid/list',[slaveParam.param],
                  function (res) {
                    slaveParam.data.total=res.total;
                    slaveParam.data.data.splice(0,res.total,res.data);

                  });
              });
          },
          getSlaveParams(){
              let arr=this.slaveParams;
              this.slaveParams.splice(0,this.slaveParams.length);
            if(this.param.slaver!=undefined&&this.param.slaver.length!=0){
              this.param.slaver.forEach(o=>{
                o.param={};
                o.data={
                  total:0,
                  data:[{mock:"asdasf"}]
                };
                arr.push(o);
              });
            }
            console.log("slave",arr);
          },
          currentChange(){

          },
          pageSizeChange(){

          },
          pageChange(){

          },
          rowClick(){

          },
        },
        computed: {
          masterField(){
                return this.param.field;
            },
          masterParam(){
                return {
                    objectCode:this.param.objectCode
                }
            },
        },
        props:['param','data'],
        components:{
        QueryTable,
        QueryGrid
      }
      //param默认结构｛
      // field:[],
      // objectCode:'',
      //slaver:[{
      //field:
      //object:
      //label:
      // }]

      // ｝
    }
</script>
<style>
    .MasterSlaveGrid {

    }
</style>
