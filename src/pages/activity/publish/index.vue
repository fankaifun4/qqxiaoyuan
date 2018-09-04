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
  height:422px;
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
    margin-left: 165px;
  }
  .detail{
    border:1px solid #c9c9c9;
    width:100%;
    height: 300px;
    margin-top:15px;
    box-sizing: border-box;
    padding: 20px;
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
    justify-content: space-between;
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
  .next{
    width:100%;
    background:#04b00f;
    color:#fff;
  }
  .address-selector{
    flex: 1;
  }
</style>
<template>
<div class="container">
  <div>
    <div class="login-wrap" v-if="setLocaltion" @click="setLocaltion=false">
      <div class="login-body">
        <div>小程序获取地理位置权限</div>
        <button open-type="openSetting" @opensetting="openSetting"  class="getuserinfo" :loading="loading" :disabled="disabled">去设置</button>
      </div>
    </div>
    <div class="public_act" v-if="false" >
      <div class="pre-btn" @click="prevAct">预览</div>
      <div class="pub-btn" @click="publishAct">发布</div>
    </div>
    <div class="pic_log"  @click="addImagePrev" >
      <img class="addpic" src="/static/images/add.png" >
      <img mode="aspectFill" v-if="hasCoverImg" class="cover" :src="activityCover" alt="">
    </div>
    <div class="form-group" >
      <label >活动标题</label>
      <input type="text" maxlength="20" class="form-input" placeholder="不超过20字" v-model="actTitle">
    </div>
    <div class="form-group" >
      <label >活动类型</label>
      <picker mode="selector" class="time-date" value="0" :range="actTypeList" range-key="name"	  @change="bindActTypeChange">
        <view class="picker">{{actType.name?actType.name:'请选择活动类型'}}</view>
      </picker>
    </div>
    <div class="form-group" >
      <label >参与人数</label>
      <input type="number" maxlength="3" class="form-input" placeholder="请输入参与人数" v-model="limitMax">
    </div>
    <div class="form-group">
      <label >主办方</label>
      <input type="text" :value="userInfo.nickName"  class="form-input" disabled>
    </div>
    <div class="form-group" >
      <label >联系方式</label>
      <input type="text" maxlength="30" class="form-input" placeholder="请输入主办方的联系方式" v-model="contactInformation">
    </div>
    <div  class="form-group">
      <label>开始时间</label>
      <picker mode="date" class="time-date" value="startDate" :start="now"  @change="bindStartDateChange">
        <view class="picker">{{startDate}}</view>
      </picker>
      <picker mode="time" value="startTime" start="00:00" end="23:59" @change="bindStartTimeChange">
        <view class="picker">{{startTime}}</view>
      </picker>
    </div>
    <div class="form-group">
      <label >结束时间</label>
      <picker mode="date"  class="time-date" value="endDate" :start="now"  @change="bindEndDateChange">
        <view class="picker">{{endDate}}</view>
      </picker>
      <picker mode="time" value="endTime" start="00:00" end="23:59" @change="bindEndTimeChange">
        <view class="picker">{{endTime}}</view>
      </picker>
    </div>
    <div class="form-group">
      <label for="">活动地点</label>
      <picker mode="selector"  :value="index" :range="type"  range-key="name" @change="changeActivityType">
        <div class="address-selector">{{address.value}}</div>
      </picker>
      <div class="address-name">{{address.name}}</div>
    </div>
    <div class="form-group" v-if="false">
      <label for="">费用</label>
      <input type="text" class="form-input" disabled>
    </div>
    <div class="form-group">
      <button class="next" @click="publishActNext">下一步</button>
    </div>
  </div>
</div>
</template>
<script>
import moment from 'moment'

export default {

  data(){

    return{
      setLocaltion:false,
      startDate: moment().format('YYYY-MM-DD'),
      startTime: '08:00',
      endDate: moment().format('YYYY-MM-DD'),
      endTime: '22:00',
      address:{
        value:"请选择地址"
      },
      type:[
        {
          name:"线上活动",
          value:'xshd'
        },
        {
          name:"线下活动",
          value:"xxhd"
        }
      ],
      userInfo:{},
      ctx:null,
      hasCoverImg:false,
      //海报
      activityCover:"",
      //活动主题
      actTitle:"",
      //活动类型
      actType:"",
      //联系方式
      contactInformation:"",
      //选择的计费策略
      costStrategyId:0,
      //参与人数
      enrollment:0,
      //最大参与人数
      limitMax:10,
      //表单设置
      formSettingId:0,

      actTypeList:[
        {
          name:"招新",
          value:1
        },{
          name:"宣传",
          value:2
        },
        // {
        //   name:"投票",
        //   value:3
        // },
        {
          name:"签到",
          value:4
        },{
          name:"其他",
          value:5
        }
      ]
    }
  },
  mounted(){
    let userInfo = wx.getStorageSync('userInfo')
    this.userInfo = userInfo

    let img = wx.getStorageSync('cutImg')
    if(img){
      this.activityCover = img
      this.hasCoverImg=true
    }

  },
  computed:{
    now(){
      let date = moment().format('YYYY-MM-DD')
      return date
    }
  },
  onLoad(options){
    let src = options.image_cover
    this.activityCover = src
    this.hasCoverImg=true
  },
  methods:{
    addImagePrev(){
      wx.navigateTo({
        url:"/pages/activity/cover/main"
      })
    },
    bindActTypeChange(e){
      let index = e.target.value
      this.actType = this.actTypeList[index]
    },
    bindStartDateChange(e){
      this.startDate =  e.target.value
    },
    bindStartTimeChange(e){
      this.startTime =  e.target.value
    },
    bindEndDateChange(e){
      this.endDate =  e.target.value
    },
    bindEndTimeChange(e){
      this.endTime =  e.target.value
    },
    chooseLocation(){
      wx.chooseLocation({
        success:res=>{
          this.address.value = res.address
          this.address.name = res.name
        }
      })
    },
    getAddress(){
      const _this=this
      wx.getSetting({
        success:res=>{
          if( !res.authSetting['scope.userLocation']){
            wx.authorize({
              scope:'scope.userLocation',
              success(res){
                _this.chooseLocation()
              },
              fail(err){
                _this.setLocaltion=true
              }
            })
          }else{
            _this.chooseLocation()
          }
        }
      })
    },
    changeActivityType(e){
      if( e.target.value==1 ){
        this.getAddress()
      }else{
        this.address.value='线上活动'
        this.address.name=""
      }
    },
    getTime(time){
      let dar = time.split('-')
      let YM =  dar[0]+dar[1]
      let DH = time.split('-')[2].split(' ')
      let day = DH[0]
      let HS = DH[1].split(':')
      let HMS =  HS[0]+HS[1]
      let timeSet =  YM + day + HMS
      return parseInt(timeSet)
    },
    isEpt(val){
      return val.replace(/^\s+|\s+$/ig,'')
    },
    publishActNext(){
      let info = {}
      //海报
      info.placardUrl = this.activityCover

      //活动主题
      info.theme = this.actTitle

      //活动类型
      info.type = this.actType.value

      //参与人数
      info.limitMax = this.limitMax

      //联系方式
      info.contactInformation = this.contactInformation

      //开始时间
      info.startTime = this.startDate+' '+this.startTime+':00'

      //结束时间
      info.endTime = this.endDate+' '+this.endTime+':00'

      //地址
      info.address = (this.address.value=='请选择地址'?"":this.address.value) + "" + (this.address.name||"")

      let seartDate = this.getTime( info.startTime )
      let endDate = this.getTime( info.endTime )
      wx.setStorageSync('storageAct',info)

      if( this.isEpt(info.theme)==''){
        wx.showToast({
          icon:"none",
          title:"活动标题不能为空",
          mask:true
        })
        return
      }
      if(!info.type || info.type == ''){
        wx.showToast({
          icon:"none",
          title:"请选择活动类型",
          mask:true
        })
        return
      }

      if(this.isEpt(info.contactInformation)==''){
        wx.showToast({
          icon:"none",
          title:"主办方的联系方式不能为空",
          mask:true
        })
        return
      }

      if( seartDate> endDate)  {
        wx.showToast({
          icon:"none",
          title:"结束时间不能小于开始时间",
          mask:true
        })
        return
      }

      if( this.isEpt(info.address)==''){
        wx.showToast({
          icon:"none",
          title:"请选择地址",
          mask:true
        })
        return
      }
      if( !info.placardUrl||info.placardUrl==''){
        wx.showToast({
          icon:"none",
          title:"请选择一张满意的海报哦",
          mask:true
        })
        return
      }
      wx.setStorageSync('detailStep1',info)
      wx.navigateTo({
        url:"/pages/activity/publishDetail/main"
      })
    }
  }
}
</script>
