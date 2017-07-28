<template>
    <div style="height:95%;">
        <el-row style="height:100%" v-loading.body="loading">
            <el-col :sm="24" :md="24" style="height:330px;overflow-y:auto;overflow-x:hidden">
                <el-steps :space="'10%'" :active="1" center>
                    <el-step title="送审" icon="setting"></el-step>
                    <el-step title="送对侧" icon="upload"></el-step>
                    <el-step title="评分" icon="edit"></el-step>
                    <el-step title="审核" icon="check"></el-step>
                    <el-button @click="save" size="mini" type="primary">保存</el-button>
                    <el-button size="mini" type="primary">审核</el-button>
                    <el-button size="mini" type="primary">评分</el-button>
                    <el-button size="mini" type="primary">退回</el-button>
                    <el-button size="mini" type="primary">退回省调</el-button>
                    <el-button size="mini" type="primary">评价笔记</el-button>
                    <el-button size="mini" type="primary">异常报告</el-button>
                </el-steps>
                <fault-info ref="info" style="padding:0 15px;" :info="info" :action="actionTimer" :label="label"></fault-info>
            </el-col>
            <el-col :sm="24" :md="24" style="height:calc(100% - 330px);padding: 0 15px;">
                <el-row id="table" style="height:100%;">
                    <el-col style="">
                        <el-tag><b></b>档案装置信息</el-tag>
                        <my-table ref="relay" @prep="prep" :record="relay" :nav="nav"></my-table>
                    </el-col>
                    <el-col style="margin-top:10px;height: 50%;">
                        <el-tag><b></b>档案装置录波</el-tag>
                        <my-table ref="record" @prep="prep"
                                  @btn1="manageFile"
                                  :text_prep="prep"
                                  :record="record"
                                  :nav="nav1"></my-table>
                        <Modal v-model="modal" title="管理文件" width="800">
                            <file-manage></file-manage>
                        </Modal>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import faultInfo from './tep/faultInfo.vue'
    import myTable from './tep/my-table.vue'
    import manageFile from "./tep/fileManage/manageFile.vue"

    export default {
        data () {
            return {
                info: {},
                record: [],
                relay: [],
                actionTimer: {},
                /*详情下拉框所对应的数据属性名称*/
                belong: [],//所属单位下拉列表数据
                factory: [],//厂站名称数据
                deviceType: [],//设备属性
                voltage: [],//电压等级
                dispatch: [],//调度名称
                value: 1,
                modal: false, /*管理文件弹窗的显示*/
                options: [{
                    value: 0,
                    name: '本侧'
                }, {
                    value: 1,
                    name: '对侧'
                }],
                nav: [
                    {name: '本对策', disabled:true, prep: true, filed: 'side', type: 'select', fixed: true, width: 120,
                        options: []
                    },
                    {name: '所属单位', filed: 'belongUnit', type: 'select', minWidth: 120,
                        options: []
                    },
                    {name: '厂站名称', filed: 'station', type: 'input', minWidth: 120},
                    {
                        name: '不正确动作原因', filed: 'errorType', type: 'select', minWidth: 140,
                        options: []
                    },
                    {
                        name: '不正确动作负责部门', filed: 'dept', type: 'select', minWidth: 160,
                        options: []
                    },
                    {name: '保护/自动装置型号', filed: 'relay', type: 'input', minWidth: 200},
                    {name: '装置厂站', filed: 'factory', type: 'select', minWidth: 150,
                        options: []
                    },
                    {
                        name: '线路保护通道', filed: 'channel', type: 'select', minWidth: 120,
                        options: []
                    },
                    {name: '装置由于时间', filed: 'runDate', type: 'time', minWidth: 150,
                        options: []
                    },
                    {
                        name: '动作行为评价', disabled: true, prep: true, filed: 'actionOk', type: 'select', minWidth: 120,
                        options: [
                            {name: "正确", value: 1},
                            {name: "异常", value: 0}
                        ]
                    },
                    {name: '重合闸方式', filed: 'reswitchType', type: 'select', minWidth: 120,
                        options: []
                    },
                    {
                        name: '重合闸动作行为评价', disabled: true, prep: true, filed: 'reswitchOk', type: 'select', minWidth: 160,
                        options: [
                            {name: "/", value: "/"},
                            {name: "正确", value: 1},
                            {name: "异常", value: 0}
                        ]
                    },
                    {name: '操作', type: 'btn', fixed: 'right', width: 120, btn: []}
                ],
                nav1: [
                    {name: '本对侧', prep: true, disabled: true, filed: 'side', type: 'select', fixed: true, width: 120, options: []},
                    {name: '变电站', filed: 'station', type: 'input', fixed: false, minWidth: 120},
                    {name: '记录装置', filed: 'model', type: 'select', fixed: false, minWidth: 120},
                    {name: '测距(kM)', filed: 'distance', type: 'input', fixed: false, minWidth: 120},
                    {name: '故障电流(kA)', filed: 'faultA', type: 'input', fixed: false, minWidth: 120},
                    {name: '故障切除时间(ms)', filed: 'faultRemoveTime', type: 'input', fixed: false, minWidth: 140},
                    {name: '文件列表', filed: 'fileLists', type: 'text', prep: true, fixed: false, minWidth: 200},
                    {name: '操作', type: 'btn', fixed: 'right', width: 260, btn: ["管理文件", "打开波形"]}
                ],
                /*详情下拉选框数据*/
                label: [
                    {id: 1, label: '天气情况', filed: 'weather', type: "select"},
                    {id: 2, label: '设备属性', filed: 'deviceType', type: "select"},
                    {id: 3, label: '电压等级', filed: 'voltage', type: "select"},
                    {id: 4, label: '调度名称', filed: 'deviceName', type: "input"},
                    {id: 5, label: '事件评价', filed: 'actionAssess', type: "select"},
                    {id: 6, label: '故障类型', filed: 'faultType', type: "select"},
                    {id: 7, label: '延时消缺', filed: 'is', type: "select"},
                    {id: 8, label: '复杂故障', filed: 'faultType', type: "select"},
                    {id: 7, label: '是否隐藏', filed: 'faultType', type: "select"}
                ],
                /*加载层的显示*/
                loading: false,
            }
        },
        created () {
            this._init ();
        },
        methods: {
            /*初始化获取数据*/
            _init () {
                console.log(parent.vm);
                console.log(parent.layer);
                this.$http.get ('/faultreport/report/getReportInfo', {params: {reportId: this.$store.state.id}})
                    .then ((ret) => {
                        console.log (ret.body, "请求故障数据完成");
                        this.info = ret.body.info;
                        this.record = ret.body.record;
                        this.relay = ret.body.relay;
                        this.actionTimer = ret.body.actionTimer;
                        this.setSelectData (ret.body.selectData);
                    }, (err) => {

                    })
            },
            /*给select赋对应数据*/
            setSelectData (data) {
                /*为表格的下拉框添加数据列表
                为详情下拉框添加数据列表*/
                let table = ['nav', 'nav1', 'label'];
                for (let a = 0; a < table.length; a++) {
                    let arr = this[table[a]];
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].filed === 'side') {
                            arr[i].options = this.options;
                        } else if (arr[i].filed !== "deviceName") {
                            if (data[arr[i].filed]) {
                                if (arr[i].filed === "actionAssess") {
                                    let selData = data[arr[i].filed];
                                    for (let b = 0; b < selData.length; b++) {
                                        selData[b].value = parseInt (selData[b].value);
                                    }
                                }
                                arr[i].options = data[arr[i].filed];
                            } else {
                                if (table[a] === 'label') {
                                    arr[i].options = [{value: 0, name: "否"}, {value: 1, name: "是"}]
                                }
                            }
                        }
                    }
                }
            },
            /*预处理表格数据*/
            prep (row, type, value) {
                switch (type) {
                    case "fileLists":
                        value.text = this.prepObj (row.fileLists);
                        break;
                    case "side":
                        value.text = row.side === 1 ? "本侧" : "对侧";
                        break;
                    case "actionOk":
                        value.text = row.actionOk === 1? "正确" : "异常";
                        break;
                    case "reswitchOk":
                        value.text = row.reswitchOk === "/" ? "/" : row.reswitchOk === 1 ? "正确" : "异常";
                        break;
                }
            },
            /*处理表格数据是对象属性*/
            prepObj (arr) {
                let text = "";
                for (let i = 0; i < arr.length; i++) {
                    text += arr[i].name + "\n";
                }
                return text;
            },
            /*档案装置录波管理文件功能*/
            manageFile (item) {
                console.log(item);
                this.modal = true;
            },
            /*保存*/
            save () {
                this.loading = true;
                let info = this.$refs.info.getReviseData ();
                let relay = this.$refs.relay.getReviseData ();
                let record = this.$refs.record.getReviseData();
                this.$ajax.post ("/faultreport/report/saveReport",
                    this.$qs.stringify({reportId: this.$store.state.id, info: JSON.stringify(info),
                    relay: JSON.stringify(relay), record: JSON.stringify(record)}))
                    .then(ret => {
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
                                type:"warning"
                            });
                        }
                    }).catch(err => {
                        this.loading = false;
                        this.$message ({
                            message: "服务异常：请查看控制台日志，分析具体原因",
                            duration: 1500,
                            type: "error"
                        });
                });
            }
        },
        components: {
            "fault-info": faultInfo,
            "my-table": myTable,
            "file-manage": manageFile,
        }
    }
</script>

<style>

    .el-tag {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        position: relative;
        vertical-align: middle;
        background: #00706B;
        margin-right: 1em;
    }

    .el-tag:after {
        content: '';
        width: 4px;
        height: 4px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, .3);
        position: absolute;
        right: 0;
        top: calc(50% - 2px);
    }

    .el-tag > b {
        width: 0;
        height: 0;
        position: absolute;
        top: -1px;
        right: -25.3px;
        border: 12.2px solid transparent;
        border-left-color: #00706B;

    }

    #faultInfo .el-tag.tagA, #faultInfo .tagB, #table .el-tag {
        border-radius: 4px;
    }

    #table .el-tag {
        margin-bottom: 12px;
    }

    #faultInfo .tagA:after, #table .el-tag:after {
        left: calc(50% - 2px);
        top: 20px;
    }

    #faultInfo .el-tag.tagA > b, #table .el-tag > b {
        top: 23px;
        left: calc(50% - 12px);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-top-color: #00706B;
        border-left-color: transparent;
    }

    #faultInfo .el-tag.tagB > b {
        top: calc(50% - 12px);
    }

    .el-step__head.is-finish, .el-step__title.is-finish {
        color: #00706B !important;
        border-color: #00706B !important;
    }

    .el-steps {
        background-color: #ddd;
    }

    .el-steps .el-button {
        margin-top: 10px !important;
        margin-left: 30px;
    }

    .el-table__header tr {
        background: linear-gradient(#0A5B59 0%, #C6E3E1 95%) !important;
        line-height: 20px;
    }

    .el-table__header tr th, .el-table__header .cell {
        background-color: transparent;
        line-height: 20px;
    }

    .el-table__header tr th {
        height: 20px;
    }

    p {
        cursor: pointer;
        padding: 0;
        margin: 0;
        text-align: center;
    }

</style>
