<template>
    <div v-loading="loading" :element-loading-text="'拼命加载中'">
        <el-row :gutter="5">
            <el-col :span="24">
                <el-tag>定值来源：</el-tag>
                <el-radio-group size="small" v-model="radio">
                    <el-radio  :label="3">装置</el-radio>
                    <el-radio  :label="6">子站</el-radio>
                </el-radio-group>
                    <el-tag>定值组:</el-tag>
                    <el-select size="small" v-model="selValue" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.groupid"
                                :label="item.groupname"
                                :value="item.groupid">
                        </el-option>
                    </el-select>
                <el-button size="small" type="primary" icon="search" @click="getSettings">召唤</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-table border :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="pointID" width="180" label="编号"></el-table-column>
                <el-table-column prop="pointName" label="名称" width="400"></el-table-column>
                <el-table-column prop="pointValue" label="当前值" ></el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                selValue:"",
                radio:3,
                tableData2:[],
                options:[],
                fromStation:false,
                loading:false
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.loading = true;
                this.$http.get ('/faultall/nansiIce/getGroups',{params:{devId: devId}})
                    .then(function (ret) {
                        this.loading = false;
                        if (ret.body.succees == false){
                            this.$alert (ret.body.data, '提示', {
                                type: "error"
                            });
                        }else{
                            this.options = ret.body.data;
                            console.log(this.options);
                            if (this.options[0]) {
                                this.selValue = this.options[0].groupID
                            }
                        }
                    }, (err) => {
                        this.loading = false;
                    });
            })
        },
        methods: {
            tableRowClassName(row, index) {
                if (index % 2 != 0) {
                    return 'info-row';
                } else {
                    return 'positive-row';
                }
                return '';
            },
            getSettings: function () {
                this.loading = true;
                if (this.radio === 3) {
                    this.fromStation = true;
                } else {
                    this.fromStation = false;
                }
                this.$http.get ('/faultall/nansiIce/getSettings',
                    {params: {devId: devId, fromStation:this.fromStation , groupId: this.selValue}})
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
    .el-table .info-row {
        background: #c9e5f5;
    }

    .el-table .positive-row {
        background: #e2f0e4;
    }
</style>
