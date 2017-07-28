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
                        <Button type="primary">下载</Button>
                        <Button type="primary">打开</Button>
                    </div>
                </Col>
                <Col span="18">
                    <Upload
                            style="display: inline-block"
                            multiple
                            action="//jsonplaceholder.typicode.com/posts/">
                        <Button style="background: #00706B;color:#fff" type="ghost" icon="ios-cloud-upload-outline">
                            上传文件</Button>
                    </Upload>
                </Col>
            </Row>
        </Col>
    </Row>
</template>

<script>

    export default {
        data () {
            return {
                columns1: [
                    {title: '序号', key: 'id', width:80},
                    {title: '文件名称', key: 'fileName'},
                    {title: '更新时间', key: 'update', sortable: true}
                ],
                data1: [
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'},
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'},
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'},
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'},
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'},
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'},
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'},
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'},
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'},
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'},
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'},
                    {id: 1, fileName: '文件.dat', update: '2017-07-15'}
                ],
                fileType:"",
                fileName:""
            }
        },
        mounted() {

        },
        methods: {
            /*点击某一行显示文件名称和文件后缀*/
            showFileInfo (row) {
                let name = row.fileName.split(".");
                this.fileType = name[1];
                this.fileName = row.fileName;

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
        height:30px;
        min-height:30px;
    }

    #manage .ivu-table th {
        background: linear-gradient(#0A5B59 0%, #C6E3E1 95%) !important;
    }
</style>
