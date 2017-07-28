<template>
    <Select class="Selects"
            v-model="select"
            size="small"
            @on-change="change">
        <Option :key="" value="" v-text=""></Option>
        <Option  v-for="el in data" :key="el.value" :value="el.ID" v-text="el.CN"></Option>
    </Select>
</template>
<script>
    export default{
        name: "Selects",
        data(){
            return {
                select:undefined,
            }
        },
        mounted(){
            this.select=this.value;
        },
        methods: {
            change(value){
                this.$emit("on-change",value);
            }
        },
        computed: {
        },
      props:["data","value"]

    }
</script>
<style>
    .Selects {
      width: 100px;
    }
</style>
