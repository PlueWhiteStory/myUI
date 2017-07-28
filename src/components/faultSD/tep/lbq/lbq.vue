<template>
    <div v-loading="loading" :element-loading-text="'拼命加载中'">
        <el-row :gutter="5">
            <el-col :span="24">
                <span class="demonstration">从</span>
                <el-date-picker
                        size="small"
                        v-model="start"
                        align="right"
                        type="datetime"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1">
                </el-date-picker>
                <span class="demonstration">到</span>
                <el-date-picker
                        size="small"
                        v-model="end"
                        align="right"
                        type="datetime"
                        min="new Date()"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1">
                </el-date-picker>
                <el-popover
                        ref="popover5"
                        placement="top"
                        width="160"
                        v-model="visible">
                    <p>请选择时间</p>
                    <div style="text-align: right; margin: 0">
                        <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                    </div>
                </el-popover>
                <el-button @click="getWaveList" size="small" type="primary" icon="menu">召唤</el-button>
                <el-button size="small" type="primary" icon="search">下载</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <el-table :row-class-name="tableRowClassName" border :data="tableData2" style="width: 100%">
                <el-table-column type="index" label="编号" width="80"></el-table-column>
                <el-table-column prop="cpuid" label="CPU" width="180"></el-table-column>
                <el-table-column prop="timestamp" label="录波时间"></el-table-column>
                <el-table-column prop="ms" label="毫秒"></el-table-column>
                <el-table-column :formatter="isCoincide" prop="rcdpi" label="是否重合"></el-table-column>
                <el-table-column prop="rcms" label="重合时间"></el-table-column>
                <el-table-column prop="fpt" label="故障类型"></el-table-column>
                <el-table-column prop="jpt" label="跳闸类型"></el-table-column>
                <el-table-column prop="fscl" label="故障测距"></el-table-column>
                <el-table-column prop="filename" label="文件名称"></el-table-column>
                <el-table-column prop="filelen" label="长度"></el-table-column>
                <el-table-column :formatter="isAvailable" prop="available" label="可用"></el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit ('pick', new Date ());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date ();
                            date.setTime (date.getTime () - 3600 * 1000 * 24);
                            picker.$emit ('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date ();
                            date.setTime (date.getTime () - 3600 * 1000 * 24 * 7);
                            picker.$emit ('pick', date);
                        }
                    }],
                    disabledDate (date) {
                        if (date < new Date ()) {
                            return false;
                        }
                        return true;
                    }
                },
                start: new Date().getTime() - ((86400000 * 7)),
                end: new Date(),
                visible:false,
                tableData2: [],
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
            /**/
            isCoincide: function (row, column) {
                return row.rcdpi === 1 ? '无重合' : row.rcDPI === 2 ? '重合' : '无定义';
            },
            isAvailable: function (row, column) {
                return row.available ? '可用' : '不可用';
            },
            /**/
            getWaveList: function () {
                if (this.start && this.end) {
                    this.loading = true;
                    var start = this.getNowFormatDate (this.start, 0);
                    var end = this.getNowFormatDate (this.end, 0);
                    this.$http.get ('/faultall/nansiIce/getWaveList', {
                        params: {
                            devId: devId, tmBegin: start, tmEnd: end
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
                                console.log(ret.body);
                            }
                        }, (err) => {
                            this.loading = false;
                        });
                } else {
                    this.visible = true;
                }
            },
            getNowFormatDate: function (start, day) {
                var date = "";
                if (day || day === 0) {
                    var now = new Date (start);
                    date = new Date (now.getTime () + day * 24 * 3600 * 1000);
                } else {
                    date = new Date ();
                }
                var seperator1 = "-";
                var seperator2 = ":";
                var month = date.getMonth () + 1;
                var strDate = date.getDate ();
                var minute = date.getMinutes ();
                var second = date.getSeconds ();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (minute <= 9) {
                    minute = "0" + minute;
                }
                if (second <= 9) {
                    second = "0" + second;
                }
                var currentdate = date.getFullYear () + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours () + seperator2 + minute
                    + seperator2 + second;
                return currentdate;
            },
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
