<template>
  <Date-picker
    class="Timer"
    :value="value"
    size="small"
    type="datetime"
    :option="option"
    @on-change="handleChange">
  </Date-picker>
</template>
<script>
    export default{
        name: "Timer",
        data(){
            return {
              time: '',
            }
        },
        mounted(){
          this.time=this.value;
        },
        methods: {
            handleClick () {
          this.open = !this.open;
        },
          handleChange (date) {
            this.value = date;
            this.$emit("on-change",date);
          }},
        computed: {
            option(){
//              console.log(this.param);
              return {
                disabledDate (date) {
                  if (this.param) {
                    const maxDate = this.param.maxDate;
                    const minDate = this.param.minDate;
                    if (maxDate != undefined)
                      return date && date.valueOf() > new Date(maxDate).getTime();
                    if (minDate != undefined)
                      return date && date.valueOf() < new Date(minDate).getTime();
                  }else{
                    return false;
                  }
                }
              }
            }
        },
      components:{

      },
      props:['value','param']

    }
</script>
<style>
    .Timer {
      width:100px;
    }
</style>
