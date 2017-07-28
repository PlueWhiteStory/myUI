<template>
    <div v-loading="loading"
         :element-loading-text="'拼命加载中'">
        <el-row :gutter="5">
            <el-col :span="24">
                <el-radio-group size="small"  v-model="radio">
                    <el-radio  :label="3">从装置</el-radio>
                    <el-radio :label="6">从子站</el-radio>
                </el-radio-group>
                <el-button size="small" type="primary" icon="menu" @click="getDataList">召唤</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-table border :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="timestamp" label="名称" width="180"></el-table-column>
                <el-table-column prop="name" label="状态" width="180"></el-table-column>
                <el-table-column prop="value" label="值"></el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>

    export default {
        props:['url'],
        data () {
            return {
                radio:3,
                tableData2:[
                    {timestamp: 1495787574, name: "信号复归", value: 1}
                ],
                fromDev:true,
                loading:false
            }
        },
        mounted() {

        },
        methods: {
            tableRowClassName(row, index) {
                if (index % 2 != 0) {
                    return 'info-row';
                }
                return '';
            },
            getDataList:function () {
                this.loading = true;
                if (this.radio === 3) {
                    this.fromDev = true;
                } else {
                    this.fromDev = false;
                }
                this.$http.get ('/faultall/nansiIce/'+this.url, {
                    params: {
                        devId: devId, fromDev:this.fromDev
                    }
                })
                    .then (function (ret) {
                        this.loading = false;
                        if (ret.body.succees == false) {
                            this.$alert (ret.body.data, '提示', {
                                type: "error"
                            });
                        } else {
                            this.tableData2 = ret.body.data;
                            console.log(this.tableData2);
                        }
                    }, (err) => {
                        this.loading = false;
                    });
            }
        }
    }
</script>

<style>

</style>
