<template>
    <div v-loading="loading"
         :element-loading-text="'拼命加载中'">
        <el-row :gutter="5">
            <el-col align="left" :span="24">
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
                        placeholder="选择日期"
                        :picker-options="pickerOptions1">
                </el-date-picker>
                <template>
                    <el-select size="small" v-model="value" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                <el-button size="small" type="primary" icon="menu" @click="getHistoryEvents">召唤</el-button>
            </el-col>
        </el-row>
        <el-row style="margin-top:20px">
            <table class="el_table">
                <thead>
                <tr>
                    <th v-for="item in tableData2.columns" v-text="item"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in tableData2.events" :class="(index%2)==0?'':'info-row'">
                    <td v-for="el in item" v-text="el"></td>
                </tr>
                </tbody>
            </table>
        </el-row>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                //时间选框数据
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
                        if (date < new Date()) {
                            return false;
                        }
                        return true;
                    }
                },
                start: new Date ().getTime()-(86400000*7),
                end: new Date(),
                //下拉选框数据
                options: [{
                    value: '保护动作',
                    label: '保护动作'
                }, {
                    value: '保护告警',
                    label: '保护告警'
                }, {
                    value: '保护录波',
                    label: '保护录波'
                }, {
                    value: '一般事件',
                    label: '一般事件'
                }, {
                    value: '其他事件',
                    label: '其他事件'
                }],
                value: '保护动作',
                //表格数据
                tableData2: {
                    columns: ['故障类型', '故障时间', '微秒值', '事件信息'],
                    events: []
                },
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
            getHistoryEvents() {
                if (this.start && this.end) {
                    this.loading = true;
                    var start = this.getNowFormatDate (this.start, 0);
                    var end = this.getNowFormatDate (this.end, 0);
                    this.$http.get ('/faultall/nansiIce/getHistoryEvents', {
                        params: {
                            devId: devId, tmBegin: start, tmEnd: end, type:this.value
                        }
                    })
                        .then (function (ret) {
                            this.loading = false;
                            if (ret.body.succees == false) {
                                this.$alert (ret.body.data, '提示',{
                                    type:"error"
                                });
                            } else {
                                this.tableData2 = ret.body;
                                console.log(this.tableData2);
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
            }
        }
    }
</script>

<style>
    .el_table .info-row {
        background: #c9e5f5;
    }

    .el_table tbody tr:hover {
        background: #eef1f6;
    }
    .el_table{
        border:1px solid #aaa;
        border-collapse: collapse;
        width:100%;
    }

    .el_table thead tr th,td,tr{
        border: 1px solid #aaa;
    }
    .el_table thead tr{
      background: linear-gradient(#0a5b59 0,#c6e3e1 95%);
    }

    .el_table thead tr th:first-child{
        width:100px;
    }
    .el_table tbody td{
        text-align:center;
    }
    td,th{
        height:30px;
        line-height: 30px;
    }
</style>
