<template>
    <el-tabs type="border-card">
        <el-tab-pane label="动作事件">
            <action></action>
        </el-tab-pane>
        <el-tab-pane label="录波记录">
            <lbq></lbq>
        </el-tab-pane>
        <el-tab-pane label="开关量">
            <staChn :url="url1"></staChn>
        </el-tab-pane>
        <el-tab-pane label="定值">
            <constant></constant>
        </el-tab-pane>
        <el-tab-pane label="模拟量">
            <staChn :url="url2"></staChn>
        </el-tab-pane>
        <el-tab-pane label="软压板">
            <staChn :url="url3"></staChn>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import action from './tep/action/action.vue'
    import lbq from './tep/lbq/lbq.vue'
    import staChn from './tep/staChn/staChn.vue'
    import constant from './tep/constant/constant.vue'
    export default {
        data () {
            return {
                url1:'getDigitals',
                url2:'getAnalogs',
                url3:'getRybs'
            }
        },
        mounted() {

        },
        methods: {},
        components: {
            action,
            lbq,
            staChn,
            constant
        }
    }
</script>

<style>
    .el-table__header thead tr th div {
        background: linear-gradient(#0a5b59 0, #c6e3e1 95%);
    }

    .el-table__header thead tr th{
        height:30px;
        line-height: 30px;
    }
</style>
