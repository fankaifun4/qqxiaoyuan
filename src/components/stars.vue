<style scoped lang="scss">
  .stars{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .stars-wrap{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img{
        width:27px;
        height:26px;
        margin-right:10px;
      }
    }
  }
</style>
<template>
  <div class="stars">
    <div class="stars-wrap">
      <block  v-for="(item,index) in startsList" :key="index">
        <img :src="item.src"  alt="">
      </block>
    </div>
    <div>{{stars}} </div>
  </div>
</template>
<script>
  export default {
    props:{
      stars:{
        type:Number,
        default:0
      },
      max:{
        type:Number,
        default: 5
      }
    },
    data(){
      return{}
    },
    computed:{
      startsList(){
        let stars = Number(this.stars)
        let max = this.max
        let step = this.max/5
        let arr=[]
        for(let i=0;i<=max; i+=step){
          if(i ==0) continue
          let src = '/static/images/'
          let src_i= stars<i?'kx.png':'mx.png'
          src +=src_i
            arr.push({
            data:i,
            xx:Math.ceil(i/step),
            src:src
          })
        }
        return arr
      }
    },
    methods:{

    }
  }
</script>
