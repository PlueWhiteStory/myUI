<template>
    <Input class="Inputer"
           v-model="str"
           size="small"/>
</template>
<script>
    export default{
        name: "Inputer",
        data(){
            return {
                str:undefined,
            }
        },
        mounted(){
            this.str=this.value;
        },
        methods: {
            change(value){
                this.$emit("on-change",value);
            }
        },
        computed: {},
      props:["value"]
    }
</script>
<style>
    .Inputer {
      width: 150px;

    }
</style>
