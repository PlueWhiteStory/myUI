<template>
    <div class="MasterSlaveGrid">
      <Query-grid
        :param="masterParam"
      @on-set-data="onGetMasterData"></Query-grid>
      <Tabs class="Tabs" type="card" :animated="false"   :value="tabValue">
        <Tab-pane v-for="tab in slaveParams" :key="tab.objectCode"  :label="tab.label" :name="tab.objectCode">
          <query-table
            :data="slaveDatas[tab.objectCode]"
            :columns="slaveColumns[tab.objectCode]"
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
              slaveParams:[//子表数据参数
//                {
//                    field:"n_station_id"
//                    objectCode:"lbq_ob"
//                    label:"录波器"
//                }
              ],
              pagination:{
              },
              slaveDatas:{//子表数据存放的对象
                 //   xl_ob:{
                //      total:0,
                //      data:[]
                //    }
              },
              slaveColumns:{//子表列配置的存放对象
              },
            }
        },
      mounted(){
        this.getSlaveParams();
        this.tabValue=this.slaveParams[0].objectCode;//设置默认选择第一个Tab,
        this.getSlavesConfig();  //获取表格配置项
        console.log("mounted master");
        console.log(this.slaveParams);
      },
        methods: {
          getSlavesConfig(){
            let _this=this;
            this.$http.get('/masterslavegrid/config',[this.slaveParams],function(res){
                _this.slaveParams.forEach(slave=>{
                  _this.slaveColumns[slave.objectCode]=res.slaveColumn[slave.objectCode];
                  _this.slaveColumns=Object.assign({},_this.slaveColumns);
                });
              console.log("config",_this.slaveColumns);
            });
          },
          onGetMasterData(data){
              this.masterData=data;
              //设置第一行被选中
            let masterKey = this.masterData.data[0][this.masterField];
            this.getSlaveData(masterKey);
//            console.log("slaveParam",this.slaveParams);
          },
          getSlaveData(key){// 获取子表内容
              this.slaveParams.forEach(slaveParam=>{
                slaveParam.param[slaveParam.field]=key;
                      let _this = this;
                this.$http.get('/singlegrid/list',[slaveParam.param],
                  function (res) {
                    _this.slaveDatas[slaveParam.objectCode]=res;
                    _this.slaveDatas=Object.assign({},_this.slaveDatas);
                  });
              });

          },
          getSlaveParams(){// 获取子表配置属性
              let arr=this.slaveParams;
              this.slaveParams.splice(0,this.slaveParams.length);
            if(this.param.slaver!=undefined&&this.param.slaver.length!=0){
              this.param.slaver.forEach(o=>{
                o.param={};
                arr.push(o);
              });
            }
          },
          currentChange(){

          },
          pageSizeChange(){

          },
          pageChange(){

          },
          rowClick(){

          },
          getColumns(code){
              console.log(code,"col do");
            if(this.slaveColumns[code]===undefined)
            {
                return [{}];
            }else
                return this.slaveColumns[code]
          },
          getData(code){
            console.log(code,"data do");
            if(this.slaveDatas[code]===undefined)
            {
              return {
                  total:0,
                data:[]
              };
            }else
              return this.slaveDatas[code]
          }
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
      border: 1px #57c5f7 solid;

    }
</style>
