<template>
  <Row id="manage" :gutter="5">
    <Col span="24">
    <h5>故障录波文件列表:</h5>
    <Table border
           :columns="columns1"
           height="300"
           @on-row-click="showFileInfo"
           :data="data1">

    </Table>
    </Col>
    <Col span='24'>
    <h5>选中故障录波文件的内容:</h5>
    <div>
      <label for="fileType">文件类型:</label>
      <Input v-model="fileType" id="fileType"></Input>
      <label for="fileName">文件名称:</label>
      <Input v-model="fileName" id="fileName"></Input>
    </div>
    <Row style="margin-top:10px;">
      <Col span="5">
      <div class="btn_group">
        <Button type="primary" @click="downLoadFile">下载</Button>
        <Button type="primary">打开</Button>
      </div>
      </Col>
      <Col span="18">
      <Upload
        style="display: inline-block"
        multiple
        :on-success="fileSuccess"
        :on-error="fileError"
        :data="{recordId: this.recordId}"
        action="/faultreport/report/uploadRecordFile">
        <Button style="background: #00706B;color:#fff" type="ghost" icon="ios-cloud-upload-outline">
          上传文件
        </Button>
      </Upload>
      </Col>
    </Row>
    </Col>
  </Row>
</template>

<script>

  export default {
    props: ["recordId"],
    data () {
      return {
        columns1: [
          {title: '序号', key: 'id', width: 80},
          {title: '文件名称', key: 'name'},
        ],
        data1: [],
        fileType: "",
        fileName: ""
      }
    },
    mounted () {
      this.$ajax.get ("/faultreport/report/getRecordFileList", {params: {recordId: this.recordId}})
        .then ((ret) => {
          this.data1 = ret.data;
        }).catch (err => {
        this.$message ({
          message: "服务异常：请查看控制台日志，分析具体原因",
          duration: 1500,
          type: "error"
        })
      });
    },
    methods: {
      /*点击某一行显示文件名称和文件后缀*/
      showFileInfo (row) {
        let name = row.name.split (".");
        this.fileType = name[1];
        this.fileName = row.name;
      },
      downLoadFile () {
        this.$ajax.get ("/faultreport/report/downloadRecordFile", {params: {recordId: this.recordId}})
          .then ((ret) => {
            if (!ret.data.flag) {
              this.$message ({
                message: "生成文件失败",
                duration: 1500,
                type: "error"
              });
            } else {
              console.log(ret.data.fileName);
              window.location = "/faultreport/report/download" + unicode (ret.data.fileName + "-" + 1);
            }
          }).catch ((err) => {
          this.$message ({
            message: "服务异常：请查看控制台日志，分析具体原因",
            duration: 1500,
            type: "error"
          });
        });
      },
      fileSuccess (response, file, fileList) {
        if (response) {
          this.$message ({
            message: "上传成功",
            duration: 1500,
            type: "success"
          });
        } else {
          this.$message ({
            message: "上传失败",
            duration: 1500,
            type: "warning"
          });
        }
      },
      fileError (error, file, fileList) {
        this.$message ({
          message: "服务异常：请查看控制台日志，分析具体原因",
          duration: 1500,
          type: "error"
        });
      }
    }
  }
</script>

<style>
  #manage {
    width: 100%;
    height: 500px;
  }

  #manage .ivu-table td, #manage .ivu-table th {
    height: 30px;
    min-height: 30px;
  }

  #manage .ivu-table th {
    background: linear-gradient(#0A5B59 0%, #C6E3E1 95%) !important;
  }
</style>
