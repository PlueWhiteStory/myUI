<template>
    <div class="my-select">
        <input v-model="value" class="my-select-input" type="text"/>
        <span @click="openList($event)" class="my-select-icon">
            <i class="my-select-icon-i"></i>
        </span>
        <ul class="my-select-option">
            <li class="my-select-list"
                v-for="item in options"
                v-text="item.name"
                @click="optionChange"
                :value="item.value"></li>
        </ul>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                value: "",
                options:[
                    {name: "上海市", value: 1},
                    {name: "天津市", value: 2},
                    {name: "北京市", value: 3},
                    {name: "深圳市", value: 4}
                ]
            }
        },
        mounted() {

        },
        methods: {
            /*点击图标显示下拉菜单*/
            openList (event) {
               $(".my-select-icon").addClass("clickIcon");
            },
            /*下拉菜单被选中*/
            optionChange () {

            }
        }
    }
</script>

<style>
    .my-select {
        width: 100%;
        position: relative;
    }

    .my-select-dom {
        position: relative;
    }

    .my-select-input {
        width: 100%;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #bbb;
        outline: none;
    }

    .my-select-icon{
        position: absolute;
        width:30px;
        height:30px;
        top:0;
        right:0;
        cursor: pointer;
        transition: all 0.5s linear;
    }
    .my-select-icon-i {
        width: 15px;
        height: 15px;
        border: 7px solid transparent;
        border-top-color: #999;
        position: absolute;
        top: calc(50% - 3px);
        right: 4px;
        border-radius: 3px;
        cursor: pointer;
    }

    .my-select-option {
        position: absolute;
        top: 35px;
        width:100%;
        border-radius:2px;
        border:1px solid #ddd;
        z-index: 9;
        padding:5px 0;
    }
    .my-select-list{
        line-height:25px;
        height:25px;
        padding:0 5px;
    }

    .my-select-list:hover {
        background-color: #0A5755;
        color:#fff;
    }
    .clickIcon {
        transform: rotate(180deg);
    }

</style>
