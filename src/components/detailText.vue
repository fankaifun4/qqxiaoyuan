<style scoped lang="scss">
  .detail-text{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 99999;
    .shap{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0px;
      background: rgba(0,0,0,.5);
    }
    .text-wrap{
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top:200px;
      background: #fff;
      box-sizing: border-box;
      padding: 30px;
      >textarea{
        border:1px solid #ccc;
        width:100%;
        min-height:200px;
        padding:20px;
        box-sizing: border-box;
        border-radius: 10px;
      }
    }
    .btn{
      margin-top:50px;
      width:100%;
      background:#04b00f;
      color:#fff;
    }
  }

</style>
<template>
  <div class="detail-text" v-if="isopen">
    <div class="shap" @click="cancel"></div>
    <div class="text-wrap">
      <textarea maxlength="100" v-model="text" auto-focus  auto-height placeholder="请输入100字以内的简要说明"></textarea>
      <button class="btn" @click="inputText"> 完成 </button>
    </div>

  </div>
</template>
<script>
  export default{
    props:['isopen','detailtext','tid'],
    data(){
      return{
        text:""
      }
    },
    mounted(){
      this.text=this.detailtext
    },
    methods:{
      inputText(e){
        this.$emit('change',{id:this.tid,text:this.text})
      },
      cancel(){
        this.$emit('cancel',false)
      }
    },
    watch:{
      isopen(to){
        if(to){
          console.log(this.detailtext)
          this.text=this.detailtext
        }
      }
    }
  }
</script>
