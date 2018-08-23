<style lang="scss" scoped>
  .picker-wrap{
    position: fixed;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    overflow: hidden;
    background: rgba(0,0,0,.5);
  }
  .bg-wrap{
    position: absolute;
    top:50%;
    bottom:0;
    left:0;
    right:0;
    background: #fff;
  }
  .picker-school{
    position: absolute;
    bottom: 0;
    top:50px;
    width:100%;
  }
  .enter{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid #999;
    >div{
      width:60px;
      height:40px;
      font-size: 30px;
      text-align: center;
      padding:15px 30px;
    }
    .green{
      color: #090;
    }
  }
</style>
<template>
<div class="picker-wrap" data-name="zhezhao">
  <div class="bg-wrap">
    <div class="enter">
      <div @click="cancel">取消</div>
      <div class="green" @click="getItems">确定</div>
    </div>
    <picker-view indicator-style="height: 50px;" class="picker-school" :value="value" @change="bindSchoolChange">
      <picker-view-column>
        <div v-for="item in schoolAddress" :key="key" style="line-height: 50px">{{ item.name }}</div>
      </picker-view-column>
    </picker-view>
  </div>
</div>
</template>
<script>
  export default {
    props:{
      schoolAddress:{
        type:Array,
        default:[]
      }
    },
    data(){
      return{
        checkIndex:0
      }
    },
    methods:{
      bindSchoolChange(e){
        let value = e.target.value[0]
        this.checkIndex=value
      },
      getItems(){
        let data = this.schoolAddress[this.checkIndex]
        this.$emit('getItems',data)
        this.$parent.chooseSchool=false
      },
      cancel(e){
        this.$parent.chooseSchool=false
      }
    }
  }
</script>
