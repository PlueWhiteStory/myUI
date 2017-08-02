<template>
    <el-row id="faultInfo" :gutter="3">
        <el-col :sm="12" :md="12">
            <el-row id="select">
                <el-col  :md="12" :lg="12">
                    <el-tag><b></b>故障时间</el-tag>
                    <el-date-picker size="small" v-model="faultInfo.actionTime" type="datetime"></el-date-picker>
                </el-col>
                <el-col  :md="12" :lg="12">
                    <el-tag><b></b>提交时间</el-tag>
                    <el-input size="small" :disabled="true" v-model="faultInfo.submitTime"
                              type="text"></el-input>
                </el-col>
                <el-col  :md="8" v-for="el in label" :key="el.id">
                    <el-tag ><b></b>{{el.label}}</el-tag>
                    <el-select class="_select" v-if="el.type==='select'"  v-model="faultInfo[el.filed]"
                              placeholder="请选择">
                        <el-option
                                v-for="item in el.options"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input v-else v-model="faultInfo[el.filed]"></el-input>
                </el-col>
                <el-col :span="24">
                    <el-tag class="tagB" style="width: 60px;height:auto;"><b></b>动作事件<br/>情况简述</el-tag>
                    <el-input
                            style="width: calc(100% - 90px);height:100%;vertical-align: top"
                            type="textarea"
                            :autosize="{minRows: 2, maxRows: 4}"
                            placeholder="请输入内容"
                            v-model="faultInfo.actionInfo">
                    </el-input>
                </el-col>
            </el-row>
        </el-col>
        <el-col :sm="12" :md="12">
            <el-row>
                <el-col :span="24">
                    <el-tag class="tagA"><b></b>本侧动作时序</el-tag>
                    <el-tag v-if="action.thatTimer" style="margin-left:calc(50% - 50px);" class="tagA"><b></b>对侧动作时序</el-tag>
                    <div class="action_div">
                        <dl @click="setTimer(0)">
                            <dt></dt>
                            <dd v-html=" action.thisTimer"></dd>
                        </dl>
                        <dl @click="setTimer(1)" v-if="action.thatTimer">
                            <dt></dt>
                            <dd v-html="action.thatTimer"></dd>
                        </dl>
                        <el-dialog title="动作时序"
                                   :visible.sync="dialog">
                             <action-timer :nav1="nav1"
                                           :timer="isTimerOne? oneTimer : twoTimer"
                                           @close-timer="closeTimer"></action-timer>
                        </el-dialog>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
    import actionTimer from "./actionTimer.vue";

    export default {
        props: ["info", "action", "label"],
        data () {
            return {
                faultTime: 0,//故障时间
                deviceAttr: '',//选中的故障属性值
                textarea:'',//动作事件情况简述的文本
                dialog: false,//对侧动作时序弹窗显示
                oneTimer: [],//动作时序本侧详情数据
                twoTimer: [],//动作时序对侧详情数距
                isTimerOne: false,//判断点击动作时序时是对侧还是本侧
                faultInfo: {},
                nav1: [
                    {name: '相对时间', filed: 'relativeTime', type: 'input', width: 120},
                    {
                        name: '动作元件', filed: 'actionComponent', type: 'select',
                        options: [
                            {name: "保护动作", value: "保护动作"},
                            {name: "C相跳闸动作：动作", value: "C相跳闸动作：动作"},
                            {name: "保护动作：动作", value: "保护动作：动作"},
                            {name: "重合闸动作：动作", value: "重合闸动作：动作"},
                            {name: "A相跳闸动作：动作", value: "A相跳闸动作：动作"},
                        ]
                    },
                    {
                        name: '动作相别', filed: 'actionType', type: 'select', width: 120,
                        options: [
                            {name: "A", value: "A"},
                            {name: "B", value: "B"},
                            {name: "C", value: "C"},
                            {name: "N", value: "N"},
                            {name: "AB", value: "AB"}
                        ]
                    },
                    {name: "操作", filed: "", type: "btn", width: 100, btn: []}

                ],
            }
        },
        created () {
            this.$ajax.get ("/faultreport/report/getReportActionTimer", {params: {reportId: this.$store.state.id}})
                .then ((ret) => {
                    console.log (ret.data, "请求动作时序修改数据完成");
                    let data = ret.data;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].curSide) {
                            this.twoTimer.push (data[i]);
                        } else {
                            this.oneTimer.push (data[i]);
                        }
                    }
                }).catch (err => {
                    this.$message ({
                        message: "服务异常：请查看控制台日志，分析具体原因",
                        duration: 1500,
                        type: "error"
                    });
            });
        },
        mounted () {
            this.faultInfo = JSON.parse (JSON.stringify (this.info));
        },
        watch: {
            info () {
                this.faultInfo = JSON.parse (JSON.stringify (this.info));
            }
        },
        methods: {
            setTimer (side) {
                this.isTimerOne = side ? false : true;
                this.dialog = true;
            },
            closeTimer () {
                this.dialog = false;
            },
            /*将修改后的数据传递给父组件*/
            getReviseData () {
                return this.faultInfo;
            },
            /*修改动作时序页面点击保存时触发该方法*/
            save (data) {

            }
        },
        components:{
            "action-timer": actionTimer
        }
    }
</script>

<style>
    #faultInfo .el-col {
        height:40px;
        line-height:40px;
    }
    #faultInfo .el-col #select > .el-col > div{
        width:60%;
    }
    #select ._select{
        width:60%;
        height:30px;
        border-radius: 5px;
        border-color:#ddd;
    }
    .action_div{
        margin: 0;
        padding: 0;
        border: 3px dotted #ddd;
        overflow: hidden;
        display: grid;
        grid-template-columns: repeat(2, 49%);
        grid-column-gap: 10px;
    }
    dl {
        margin: 0;
        padding: 0 5px;
        min-height: 200px;
        overflow-y: auto;
        max-height: 200px;
        cursor:pointer;
    }

    .action_div dl:last-child{
        border-left: 3px dotted #ddd;
    }
    dt,dd{
        float:left;
        line-height:20px;
    }
    dt{
        width:5em;
        text-align: right;
        font-size:80%;
    }
    dd{
        width:calc(100% - 5em);
        margin:0;
        font-size: 80%;
    }
    /*自定义弹窗样式*/
    #faultInfo .el-dialog__header {
        padding-top:0;
        background: linear-gradient(#0A5B59 0%, #C6E3E1 95%);
        line-height:35px;

    }
    .el-dialog__close {
        color: #8f0509;
    }
</style>
