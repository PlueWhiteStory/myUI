<template>
  <ul :id="treeId" class="ztree"></ul>
</template>
<script>
  require("./zTree/jquery-1.4.4.min.js");
  require("./zTree/zTreeStyle/zTreeStyle.css");
  require("./zTree/jquery.ztree.all.min.js");
    export default{
        name: "ZTree",
        data(){
            return {
              zTreeObj:null,
            }
        },
      mounted(){
//        var zt = $.fn.zTree,
//          view = zt._z.view;
//
//        // 重写ICON处理
//        view.makeNodeIcoClass = function(setting, node) {
//          var icon = node.iconSkin;
//          if (!icon) {
//            icon = 'icon-application';
//          }
//          var icoCss = [icon];
//          if (!node.isAjaxing) {
//            if (node.isParent) {
//              icoCss.push("tree-folder");
//              // icoCss.push(node.open ? consts.folder.OPEN : consts.folder.CLOSE);
//            } else {
//              icoCss.push("tree-file");
//            }
//          }
//          return "tree-icon " + icoCss.join(' ');
//        };
        this.zTreeObj =  $.fn.zTree.init($("#"+this.treeId), this.setting,this.treeData);
      },
      watch:{//配置发生变化后销毁树，重新初始化
        treeData:function (newVale) {
          $.fn.zTree.destroy("#"+this.treeId);
          this.zTreeObj =  $.fn.zTree.init($("#"+this.treeId), this.setting,newVale);
        },
        setting:function (newValue) {
          $.fn.zTree.destroy("#"+this.treeId);
          this.zTreeObj =  $.fn.zTree.init($("#"+this.treeId),newVale,this.treeData);
        }
      },
        methods:{

        },
      props:{
        "treeId":{
          type:String,
          default:"treeId"
          },
        "setting":{
          type:Object,
          default:{}
        },
        "treeData":{
          type:[Object,Array],
          default:[]
        }
      }
    }
</script>
<style>
  .ztree{
  }
</style>
