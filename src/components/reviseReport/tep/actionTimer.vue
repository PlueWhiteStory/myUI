<template>
    <div style="position: relative">
        <div class="add_row">
            <el-button @click="addRow(timerData)" type="success" icon="plus"></el-button>
        </div>
        <el-table
                v-loading.body="loading"
                :data="timerData"
                style="height:500px;">
            <el-table-column type="expand">
                <template scope="props">
                    <my-table :height="300" :record="props.row.children" :nav="nav1"></my-table>
                </template>
            </el-table-column>
            <el-table-column
                    label="本对侧"
                    prop="curSide"
                    :formatter="formatterSide"
                    width="100">
            </el-table-column>
            <el-table-column
                    label="装置">
                <template scope="scope">
                    <select id="deviceSelect" v-model="scope.row.curDevice">
                        <option v-for="el in device" :value="el.value" :key="el.vaule" v-text="el.name"></option>
                    </select>
                </template>
            </el-table-column>
            <el-table-column
                    label="装置型号">
                <template scope="scope">
                    <el-input v-model="scope.row.deviceModel" placeholder="请输入装置型号"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="启动时间">
                <template scope="scope">
                    <el-input :title="scope.row.launchTime" v-model="scope.row.launchTime" placeholder="请输入启动时间"></el-input>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="80px">
                <template scope="scope" >
                   <el-button @click="deleteRow(timerData, scope.$index)" style="color:#fff;border-radius: 50%"
                              size="mini"
                              type="danger"
                              icon="close"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col style="text-align: right">
            <el-button @click="saveData" type="primary">保存</el-button>
            <el-button @click="closeTimer" type="danger">关闭</el-button>
        </el-col>
    </div>
</template>

<script>
    import myTable from "./my-table.vue";
    export default {
        props:["nav1", "timer"],
        data () {
            return {
                device: [
                    {name: "第1套装置", value: 1},
                    {name: "第2套装置", value: 2},
                    {name: "第3套装置", value: 3},
                    {name: "第4套装置", value: 4}
                ],
                timerData:[],
                loading: false,
            }
        },
        mounted() {
            console.log("动作时序修改界面加载完成");
        },
        created () {
            console.log("执行beforeCreate");
            this.timerData = JSON.parse (JSON.stringify (this.timer));
        },
        /*修改引用地址*/
        watch: {
            timer () {
                console.log("发现timer变化，重新赋值");
                this.timerData = JSON.parse (JSON.stringify (this.timer));
            }
        },
        methods: {
            deleteRow (item, index) {
                item.splice (index, 1);
            },
            /*添加一行数据*/
            addRow (item) {
                if (item.length > 0) {
                    let obj = Object.assign ({}, item[item.length - 1]);
                    obj.id = 0;
                    item.push (obj);
                } else {
                    item.push({id:0, curSide: 1, curDevice: 1, deviceModel: "", launchTime: ""});
                }
            },
            saveData () {
                console.info (this.$ajax.defaults.headers);
                console.log(this.timerData);
                this.loading = true;
                let data = { reportId: this.$store.state.id, actionTimer: JSON.stringify(this.timerData)};
                this.$ajax({
                    method: "post",
                    url: "/faultreport/report/saveActionTimer",
                    data: this.$qs.stringify (data),
                }).then (ret => {
                        this.loading = false;
                        if (ret.data) {
                            this.$message ({
                                message: "保存成功",
                                duration: 1500,
                                type: "success"
                            });
                        } else {
                            this.$message ({
                                message: "保存失败",
                                duration: 1500,
                                type: "warning"
                            });
                        }
                    }).catch (err => {
                        this.loading = false;
                    this.$message ({
                        message: "服务异常:请查看控制台日志,分析具体原因！",
                        duration: 1500,
                        type: "error"
                    });
                });
            },
            closeTimer () {
                this.$emit ("close-timer");
            },
            //格式化数据
            formatterSide (row, col) {
              return row[col.property] === 1 ? "对侧" : "本侧";
            }
        },
        components: {
            "my-table": myTable
        }
    }
</script>

<style>
    #deviceSelect {
        width: 90%;
        height: 30px;
        border-radius: 5px;
        border-color: #ddd;
        outline: none;
    }
    /*添加一行数据*/
    .add_row {
        position: absolute;
        z-index: 99;
        right:0;
        padding: 0;
        margin: 0;
        height:30px;
        line-height:30px;
    }

    .add_row .el-button{
        padding:0;
        margin:0;
        height:30px;
        line-height:30px;
        width:30px;
        text-align: center;
    }
</style>
