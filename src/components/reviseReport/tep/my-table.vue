<template>
    <div style="position: relative">
        <div class="add_row">
            <el-button @click="addRow(data)" type="success" icon="plus"></el-button>
        </div>
        <el-table
                id="editTable"
                :height="height?height:200"
                :data="data"
                :fit="true"
                border
                style="width: 100%">
            <el-table-column
                    v-for="(item, index) in nav"
                    :key="item.name"
                    :fixed="item.fixed"
                    :label="item.name"
                    :min-width="item.minWidth"
                    :width="item.width">
                <template scope="scope">
                    <p class="tdText"
                       v-if="!item.type||item.type == 'text' "
                       v-text="item.prep?prep(scope.row, item.filed):scope.row[item.filed]"></p>
                    <el-col v-if="item.type==='btn'">
                        <el-button @click="handleClick(scope.row, idx)" :key="item1" type="primary" size="small"
                                   v-for="(item1, idx) in (item.btn)" v-text="item1">
                        </el-button>
                        <el-button @click="deleteRow(data, scope.$index)" style="color:#fff;border-radius:
                        50%"
                                   size="mini"
                                   type="danger"
                                   icon="close"></el-button>
                    </el-col>
                    <div style="position:relative;height:36px;" v-if="item.type=='select'">
                        <span @click="" class="my-select-icon">
                            <i class="my-select-icon-i"></i>
                        </span>
                        <el-input :disabled="item.disabled"
                                  :title="item.prep ? prep(scope.row, item.filed) :scope.row[item.filed]"
                                  class="selectInput"
                                  @blur="setValue($event, scope.row, item.filed)"
                                  :value="item.prep ? prep(scope.row, item.filed) :scope.row[item.filed]"></el-input>
                        <select class="tdSelect"
                                @click="iconRotate($event)"
                                @change="getValue($event, scope.row, item.filed)"
                                placeholder="请选择">
                            <option style="background: #fff;color:#000;" v-for="item1 in (item.options)"
                                    :key="item1.value"
                                    :label="item1.name"
                                    :value="item1.value">
                            </option>
                        </select>
                    </div>
                    <el-input  @blur="setValue($event, scope.row, item.filed)"
                              class="tdInput"
                              v-if="item.type=='input'"
                              :value="scope.row[item.filed]"></el-input>
                    <el-date-picker
                            class="tdTime"
                            v-if="item.type=='time'"
                            size="minis"
                            :title="scope.row[item.filed]"
                            v-model="scope.row[item.filed]"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: ['record', 'nav','height'],
        data () {
            return {
                event: "",
                data: [],
                rotate: false
            }
        },
        mounted () {
            this.$nextTick(() => {

            } );
        },
        watch: {
            record () {
                this.data = JSON.parse (JSON.stringify (this.record));
                console.log (this.data);
                console.log (this.data, "开始调用数据了");
            }
        },
        created () {
            this.data = JSON.parse (JSON.stringify (this.record));
        },
        computed: {},
        methods: {
            handleClick(row, idx) {
                this.$emit ("btn" + (idx + 1), row);
            },
            getValue (event, row, type) {
                let value = $ (event.target).val ();
                if (!isNaN(parseInt(value))) {
                    value = parseInt (value);
                }
                row[type] = value;

            },
            setValue (event, row, type) {
                row[type] = event.target.value;

            },
            prep (row, type) {
                let value = {text: ""};
                this.$emit ("prep", ...[row, type, value]);
                return value.text;
            },
            /*删除一行数据*/
            deleteRow (item, index) {
                item.splice (index, 1);
            },
            /*添加一行数据*/
            addRow (item) {
                let row = {};
                if (item.length > 0) {
                    let obj = Object.assign ({}, item[item.length - 1]);
                    obj.id = 0;
                    item.push (obj);
                } else {
                    item.push (this.createNullData ());
                }
            },
            /*生成一条空数据*/
            createNullData () {
                let row = {};
                for (let i = 0; i < this.nav.length; i++) {
                    if (this.nav[i].filed) {
                        row[this.nav[i].filed] = "";
                    }
                }
                row.id = 0;
                return row;
            },
            //旋转图标
            iconRotate (event) {
               let icon = $(event.target).siblings(".my-select-icon").children(".my-select-icon-i");
               if (icon.is(".icon")) {
                   icon.removeClass("icon");
               } else {
                   icon.addClass("icon");
               }
            },
            /*将修改后的数据传递父组件*/
            getReviseData () {
                return this.data;
            },
        }
    }
</script>

<style>
    #editTable .el-input__inner {
        text-align: center;
    }

    #editTable .el-date-editor .el-input__inner {
        text-align: left;
    }
    #editTable .tdInput {
        border: none;
        background-color: transparent;
    }
    #editTable .tdSelect{
        position: absolute;
        width:100%;
        height:36px ;
        border-radius: 3px;
        vertical-align: middle;
        outline: none;
        z-index:3;
        text-align:center !important;
        color:transparent;
        border-color:#ccc;
        background: transparent;
        cursor: pointer;
    }
    #editTable .el-input__icon {
        display: none;
    }
    #editTable .selectInput .el-input__inner{
        border-top-right-radius: 0 ;
        border-bottom-right-radius: 0 ;
        color:#000;
        border-right: none;
        background:#fff!important;
    }

    #editTable .selectInput {
        position: absolute;
        background: #fff;
        width: calc(100% - 20px);
        z-index: 4;
    }

    .my-select-icon {
        position: absolute;
        width: 20px;
        height: 36px;
        top: 0;
        right: 0;
        cursor: pointer;
        background: #eee;
    }

    .my-select-icon-i {
        width: 12px;
        height: 12px;
        border: 6px solid transparent;
        border-top-color: #bbb;
        position: absolute;
        top: calc(50% - 3px);
        right: 4px;
        border-radius: 3px;
        cursor: pointer;
        transform-origin: 50% calc(50% - 3px);
        transition: all 0.1s linear;
    }
    .icon {
        transform :rotate(180deg);
    }
</style>
