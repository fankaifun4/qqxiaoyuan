<style scoped lang="scss">
.main-wrap{
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.top-banner{
  height: 420px;
  color:#fff;
  background:#0186ef ;
  .userinfo{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    .avatar-url{
      width:140px;
      height:140px;
      overflow: hidden;
      border-radius: 100%;
    }
    .nick-name{
      margin-top:15px;
      font-size:28px;
    }
  }
}
.my-cont{
    ul>li{
      color:#363636;
      list-style: none;
      padding:25px;
      background: #fff;
      border-top: 1px solid #efefef;
    }
  }
</style>
<template>
<div class="main-wrap">
  <div class="top-banner">
    <div class="userinfo">
      <img class="avatar-url" :src="userInfo.avatarUrl" alt="">
      <div class="nick-name">{{userInfo.nickName}}</div>
    </div>
  </div>
  <div class="my-cont">
    <ul>
      <li @click="myActivity">我的活动</li>
      <li @click="participateAct">我的参加</li>
      <li @click="publishAct">发布</li>
      <li>@关于小数点</li>
      <li>版本号1.0.0</li>
    </ul>
  </div>
</div>
</template>
<script>
  export default {
    data(){
      return{
        userInfo:{}
      }
    },
    onShow(){
      this.checkLogin()
    },
    mounted(){
      const userInfo = wx.getStorageSync('userInfo')
      this.userInfo = userInfo
    },
    methods:{
      checkLogin(){
        const _this = this
        const token = wx.getStorageSync( 'token' )
        const memberId = wx.getStorageSync('memberId')
        if( !token || !memberId ){
          wx.switchTab({
            url:'/pages/index/main'
          })
        }
      },
      publishAct(){
        wx.navigateTo({
          url:"/pages/activity/publishVoting/main?init=1"
        })
      },
      participateAct(){
        wx.navigateTo({
          url:"/pages/actList/main"
        })
      },
      myActivity(){
        wx.navigateTo({
          url:"/pages/mainAct/main"
        })
      }
    }
  }
</script>
