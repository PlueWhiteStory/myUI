<template>
    <div class="tree-input-tree-layout">
      <Input class="tree tree-input"
             v-model="inputValue"
             size="small"
      />
     <ZTree
     :treeId="treeId"
     :setting="setting"
     :tree-data="treeData"></ZTree>
    </div>
</template>
<script>

  import ZTree from '../BaseComponents/zTree/zTree'

    export default{
        name: "InputerTree",
        data(){
            return {
              inputValue:'',
              treeData:[],
              timeOutId:undefined,
              treeId:"myTree",
              setting:{
                view: {
                  showLine: true,
                  selectedMulti: false,
                  dblClickExpand: false,
                  nameIsHTML: true
                },
                data: {
                  simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "parent_id",
                    rootPId: 0
                  }
                },
                callback: {
                  onClick:this.nodeClick,
                  onDblClick:this.nodeDbClick,
                }
              },

            }
        },
        mounted(){
            this.getTreeData();
        },
        methods: {
            getTreeData(){
              let _this=this;
              console.log(this.params);
              this.$http.get('/treegrid/getTree',[this.params],function(response){
                let data=response;
                _this.treeData=data;
              }, function(response){
                // 响应错误回调
                console.log(response)
                //_this.$Message.error(response);
              });
            },
          nodeClick:function(event, treeId, treeNode){
            console.log("click",treeNode.name);
            this.$emit("on-node-click",treeNode);
          },
          nodeDbClick:function(event, treeId, treeNode){
            console.log("db",treeNode.name);
          }
        },
        computed: {
            params(){
                return  Object.assign({},this.param,{abbr:this.inputValue});
            }
        },
        components: {
          ZTree,
        },
      watch:{//定时获取数据
        inputValue(newVal,old){
            if(this.timeOutId!==undefined) {
              clearTimeout(this.timeOutId);
              this.timeOutId = undefined;
            }
                let _this = this;
                  this.timeOutId=setTimeout(function(){
                      _this.getTreeData();
                  },500);
        }
      },
        props: ["param"]
    }
</script>
<style>
  .tree-input-tree-layout{
    display: flex;
    height: 100%;
    overflow: auto;
    flex-direction: column;
    align-items: stretch;
  }
  .tree.tree-input{
    height: 18px;
    width: 80%;
    margin:5px 5px 10px 5px;
    }
</style>
