<template>
    <div class="InputerTree">
      <Input class=" "
             v-model="inputValue"
             size="small"
      />
      <Tree :data="treeData"  @on-select-change="nodeClick"></Tree>
    </div>
</template>
<script>
    export default{
        name: "InputerTree",
        data(){
            return {
              inputValue:'',
              treeData:[],
              timeOutId:undefined,

            }
        },
        mounted(){
            this.getTreeData();
            console.log(this.treeData);
        },
        methods: {
            getTreeData(){
              let _this=this;
              console.log(this.params);
              this.$http.get('/treegrid/getTree',[this.params],function(response){
                let data=response;
                console.log(data);
                _this.treeData=data;
              }, function(response){
                // 响应错误回调
                console.log(response)
                //_this.$Message.error(response);
              });
            },
          nodeClick(node){
                console.log("click");
                this.$emit("on-select-change",node);
          }
        },
        computed: {
            params(){
                return  Object.assign({},this.param,{abbr:this.inputValue});
            }
        },
        components: {

        },
      watch:{
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
  .InputerTree input.ivu-input-small{
    height: 18px;
    width: 70%;
    }
  .InputerTree  .Inputer{
    margin-left:5px;
  }
  .InputerTree .ivu-tree-title{
    color: black;
  }
  .InputerTree .ivu-tree{
    margin-left:5px;
  }
</style>
