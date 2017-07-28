<template>
      <Radio-group class="Radios" v-model="label" @on-change="change">
        <Radio  v-for="radio in radios" :label="radio.label" :value="radio.selected" :key="radio.value"></Radio>
      </Radio-group>
</template>
<script>
    export default{
        name: "Radios",
        data(){
            return {
                label:'',
                key:undefined,
            }
        },
        methods: {
            change(label){
                this.data.forEach(radio=>{
                    if(radio.label===label)
                      this.$emit("on-change",radio.value);
                });

            }
        },
        computed: {
            radios(){
                this.data.forEach(radio=>{
                    if(this.value==undefined||this.value!=radio.value)
                        radio.selected=false;
                      else
                    {
                        radio.selected=true;
                        this.label=radio.label;
                        this.key=radio.value;
                    }
                });
                return this.data;
            }

        },
      props:["data","value"]

    }
</script>
<style>
    .Radios {
    }
</style>
