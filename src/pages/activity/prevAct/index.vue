<style lang="scss" scoped>
  @import "static/style/config.scss";
  .login-wrap{
    position:fixed;
    top:0;
    bottom:0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-body{
      width:500px;
      height:400px;
      background: #fff;
      border-radius:5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img{
        width:260px;
        height:200px;
        display: block;
        margin:0 auto;
        overflow: hidden;
      }
      .getuserinfo{
        margin-top:50px;
        width:210px;
        height:60px;
        line-height: 60px;
        font-size: 30px;
        background:#1aad19;
        color:#fff;
      }
    }
  }
  .container{
    background:#f5f5f6 ;
  }
  .pic_log{
    width:750px;
    height:400px;
    background: #efeeff;
    position: relative;
    .addpic{
      position: absolute;
      width: 122px;
      height: 120px;
      margin: auto;
      left: 0px;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
    }
    .cover{
      position: absolute;
      width:100%;
      height: 100%;
      z-index: 2;
    }
  }
  .form-group{
    background: #fff;
    margin-top:20px;
    padding:20px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    label{
      padding-right: 15px;
      width:150px;
    }
    .form-input{
      height: 35px;
      flex: 1;
    }
    .time-date{
      margin-right: 20px;
    }
    .address-name{
      flex: 1;
    }
    .detail{
      width:700px;
      margin:0 auto;
      box-sizing: border-box;
      padding: 20px;
      color:#333;
      overflow: hidden;
      .detail-wrap{
         width:660px;
        .images{
          width:660px;
          img{
            width:660px;
            height:370px;
            border-radius: 15px;
          }
        }
        .text{
          width:680px;
        }
      }
    }
  }

  .public_act{
    background: #fff;
    display: flex;
    justify-content: flex-end;
    text-align: center;
    line-height: 80px;
    padding:15px 20px;
    .pub-btn,.pre-btn{
      padding:0 30px;
      height: 80px;
      color:#fff;
    }
    .pre-btn{
      background: #FF4500;
      margin-right: 20px;
    }
    .pub-btn{
      background: $blue;
    }
  }


  .cropper-block{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 9999;
  }
  .cropper-wrapper{

  }

  .cropper-buttons{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 106px;
    line-height: 50px;
  }

  .cropper-buttons .upload, .cropper-buttons .getCropperImage{
    width: 50%;
    text-align: center;
  }

  .cropper{
    position: absolute;
    top: 0;
    left: 0;
  }
  .cropper-buttons{
    background-color: rgba(0, 0, 0, 0.95);
    color: #04b00f;
  }
  .prev-wrap{
    height: 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom:2px solid #f5f5f6;
    margin-bottom:10px;
    .btn{
      height: 80px;
      padding:0 30px;
      width:150px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .prev{
      background:#f90;
      color:#fff;
      margin-right: 50px;
    }
    .publish{
      color:#fff;
      background:#090;
    }
  }
</style>
<template>
<div class="container">
  <div class="prev-wrap">
    <div class="btn publish" @click="publish">发布</div>
  </div>
  <div>
    <div class="pic_log" >
      <img mode="aspectFill"  class="cover" :src="data.activityCover" alt="">
    </div>
    <div class="form-group" >
      <label >活动标题</label>
      <div class="form-input" >{{data.actTitle}}</div>
    </div>
    <div class="form-group">
      <label >主办方</label>
      <div  class="form-input" >{{userInfo.nickName}}</div>
    </div>
    <div  class="form-group">
      <label>开始时间</label>
      <div class="time-date">{{data.startDate}}</div>
      <div class="time-date">{{data.startTime}}</div>
    </div>
    <div class="form-group">
      <label >结束时间</label>
      <div class="time-date">{{data.endDate}}</div>
      <div class="time-date">{{data.endTime}}</div>
    </div>
    <div class="form-group">
      <label for="">活动地点</label>
      <div class="address-name">{{data.address}}</div>
    </div>
    <div class="form-group">
      <label for="">详情描述</label>
      <div  class="detail">
        <div v-for="item in  detail" :key="key" class="detail-wrap">
            <div v-if="item.type=='image'" class="images">
              <img :src="item.cont" alt="">
            </div>
            <div v-if="item.type=='text'" class="text">
              {{item.cont}}
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import {publisDetail} from  '../../../server/index'
export default {
  data(){
    return{
      userInfo:{},
      data:{},
      detail:[],
      hasCoverImg:false,
      detailCompleted:null
    }
  },
  mounted(){
    let userInfo = wx.getStorageSync('userInfo')
    let detailCompleted = wx.getStorageSync('detailCompleted')
    this.userInfo = userInfo
    this.data = detailCompleted.info
    this.detail = detailCompleted.detail
    this.detailCompleted = detailCompleted
  },
  methods:{
    publish(){
      publisDetail({
        info:this.detailCompleted
      },(er,res)=>{
        console.log(  res )
      })
    }
  }
}
</script>
