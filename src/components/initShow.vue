<style class="scss">
  .init-show{
    height:600px;
    width:100%;
    font-size: 40px;
    font-weight: 700;
    line-height: 600px;
    text-align: center;
    color:#c2c2c2;
  }
</style>
<template>
<div class="init-show" v-if="show">
  <text>{{text}}</text>
</div>
</template>
<script>
  export default {
    props:{
      text:{
        type:String,
        default:"正在加载..."
      },
      show:{
        type:Boolean,
        default:true
      }
    }
  }
</script>
