<template>
    <el-row id="table" style="height:100%;">
        <el-col style="">
            <el-tag><b></b>档案装置信息</el-tag>
            <el-table
                    height="200"
                    :data="relay"
                    :fit="true"
                    border
                    id="deptInfo"
                    style="width: 100%">
                <el-table-column
                        size="mini"
                        v-for="(item, index) in nav"
                        :key="item.name"
                        :fixed="item.fixed ? true : false"
                        :label="item.name"
                        :min-width="item.minWidth"
                        :width="item.width">
                    <template scope="scope">
                        <p class="tdText"
                           @click="getValue()"
                           v-text="typeof (scope.row[item.filed])=='number'?item.filed=='side'?scope.row[item.filed]==0?'本侧':'对侧':scope.row[item.filed]==1?'正确':'异常':scope.row[item.filed]"></p>
                        <el-select class="tdSelect" v-if="item.type=='select'" @change="setValue"
                                   v-model="scope.row[item.filed]"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input @blur="setValue" class="tdInput" v-if="item.type=='input'"
                                  v-model="scope.row[item.filed]"></el-input>
                        <el-date-picker
                                class="tdTime"
                                v-if="item.type=='time'"
                                size="minis"
                                v-model="scope.row[item.filed]"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        class="addAndDelete"
                        width="150">
                    <template scope="scope">
                        <el-button @click="handleClick" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col style="margin-top:10px;height: 50%;">
            <el-tag><b></b>档案装置录波</el-tag>
            <el-table
                    height="200"
                    :data="record"
                    :fit="true"
                    border
                    style="width: 100%">
                <el-table-column
                        v-for="(item, index) in nav1"
                        :key="item.name"
                        :fixed="item.fixed"
                        :label="item.name"
                        :min-width="item.minWidth"
                        :width="item.width">
                    <template scope="scope">
                        <p class="tdText"
                           @click="getValue()"
                           v-text="item.filed=='side'?scope.row[item.filed]==0?'本侧':'对侧':scope.row[item.filed]"></p>
                        <el-select class="tdSelect" v-if="item.type=='select'" @change="setValue"
                                   v-model="scope.row[item.filed]"
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input @blur="setValue" class="tdInput" v-if="item.type=='input'"
                                  v-model="scope.row[item.filed]"></el-input>
                        <el-date-picker
                                class="tdTime"
                                v-if="item.type=='time'"
                                size="minis"
                                v-model="scope.row[item.filed]"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="文件列表"
                        min-width="300"
                        prop="deviceName">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template scope="scope">
                        <el-button @click="handleClick" type="primary" size="small">管理文件</el-button>
                        <el-button type="primary" size="small">打开波形</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>

    export default {
        props: ['record', 'relay'],
        mounted () {
            this.$nextTick (() => {
                let td = $ ("#deptInfo .el-table__body tbody .el-table__row:first-child").children ();
                td.last ().attr ("rowspan", 10);
                for (let i = 0; i < td.length; i++) {
                    if (arr[i] !== td.last ()) {

                    }
                }
            })
        },
        methods: {
            handleClick() {
                console.log (1);
            },
            getValue () {
                if (this.event) {
                    this.setValue ();
                }
                this.event = $ (event.target);
                this.event[0].style.display = "none";
                if (this.event.siblings ('.tdSelect')[0]) {
                    this.event.siblings ('.tdSelect')[0].style.display = "block";
                } else if (this.event.siblings ('.tdInput')[0]) {
                    this.event.siblings ('.tdInput')[0].style.display = "block"
                } else {
                    this.event.siblings ('.tdTime')[0].style.display = "block"
                }
            },
            setValue () {
                this.event[0].style.display = "block";
                if (this.event.siblings ('.tdSelect')[0]) {
                    this.event.siblings ('.tdSelect')[0].style.display = "none";
                } else if (this.event.siblings ('.tdInput')[0]) {
                    this.event.siblings ('.tdInput')[0].style.display = "none"
                } else {
                    this.event.siblings ('.tdTime')[0].style.display = "none"
                }
            }
        },

        data() {
            return {
                event: "",
                nav: [
                    {name: '本对策', filed: 'side', type: 'select', fixed: true, width: 120},
                    {name: '所属单位', filed: 'belongUnit', type: 'select', minWidth: 120},
                    {name: '厂站名称', filed: 'factory', type: 'input', minWidth: 120},
                    {name: '不正确动作原因', filed: 'errorType', type: 'select', minWidth: 140},
                    {name: '不正确动作负责部门', filed: 'dept', type: 'select', minWidth: 160},
                    {name: '保护/自动装置型号', filed: 'relay', type: 'select', minWidth: 200},
                    {name: '线路保护通道', filed: 'channel', type: 'select', minWidth: 120},
                    {name: '装置由于时间', filed: 'runDate', type: 'time', minWidth: 120},
                    {name: '动作行为评价', filed: 'actionOk', type: 'select', minWidth: 120},
                    {name: '重合闸方式', filed: 'reswitchType', type: 'select', minWidth: 120},
                    {name: '重合闸动作行为评价', filed: 'reswitchOk', type: 'select', minWidth: 160}
                ],
                nav1: [
                    {name: '本对侧', filed: 'side', type: 'select', fixed: true, width: 120},
                    {name: '变电站', filed: 'station', type: 'input', fixed: false, minWidth: 120},
                    {name: '记录装置', filed: 'model', type: 'select', fixed: false, minWidth: 120},
                    {name: '测距(kM)', filed: 'distance', type: 'input', fixed: false, minWidth: 120},
                    {name: '故障电流(kA)', filed: 'faultA', type: 'input', fixed: false, minWidth: 120},
                    {name: '故障切除时间(ms)', filed: 'faultRemoveTime', type: 'input', fixed: false, minWidth: 140}
                ],
                belong: [],//所属单位下拉列表数据
                factory: [],//厂站名称数据
                deviceType: [],//设备属性
                voltage: [],//电压等级
                dispatch: [],//调度名称
                options: [{
                    value: 0,
                    label: '本侧'
                }, {
                    value: 1,
                    label: '对侧'
                }],
                value: 1
            }
        }
    }
</script>

<style>
    .el-table__header th {
        height: 20px !important;
        max-height: 20px !important;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }

    .el-table__header th > div {
        padding: 0 5px !important;
        text-align: center;
        margin: 0;
        line-height: 0;
        overflow: hidden !important;
        background: linear-gradient(#0A5B59 0%, #C6E3E1 95%);
    }

    p {
        cursor: pointer;
        padding: 0;
        margin: 0;
        text-align: center;
    }

    #table .tdSelect, #table .tdInput, #table .tdTime {
        display: none;
    }
</style>
