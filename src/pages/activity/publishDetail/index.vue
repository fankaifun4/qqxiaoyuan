<style scoped lang="scss">
  .container{
    padding:20px 30px;
    background: #fff;
  }
  .detail-wrap{
    .detail-list{
      border:1px solid #ccc;
      border-radius: 3px;
      width:600px;
      height:337px;
      margin:0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      img.add{
        width:60px;
        height: 60px;
      }
    }
    .add{
      width:80px;
      height:80px;
      border-radius: 50%;
      margin:10px auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
<template>
  <div class="container">
      <div class="detail-wrap">
          <div v-for="(item,index) in formDetail" :key="index" >
            <div v-if="item.type=='image'" class="detail-list">
              <img src="/static/images/public2.png" alt="" class="add">
            </div>
            <div v-else class="detail-list">
              文字
            </div>
            <div class="add" @click="addDetailType">
              <img src="/static/images/public.png" alt="">
            </div>
          </div>
      </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        formDetail:[
          {
            type:"image",
            cont:""
          }
        ]
      }
    },
    mounted(){

    },
    methods:{
      addDetailType(){

      }
    }
  }
</script>
