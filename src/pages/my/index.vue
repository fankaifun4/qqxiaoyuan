<style scoped lang="scss">
.main-wrap{
  background: #fff;
}
.top-banner{
  height: 420px;
  color:#fff;
  position: relative;
  box-sizing: border-box;
  background:  linear-gradient(to bottom, #1c1c1c 10%, #616161 100%);
  &:before{
    position: absolute;
    content:"";
    left:20px;
    top:40px;
    bottom:0px;
    right: 20px;
    background: linear-gradient(to top, #1C23A5, #34BDF3);
    z-index: 1;
    border-radius: 20px 20px 0 0px;
  }
  .userinfo{
    position: absolute;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width:200px;
    height: 300px;
    background: #313131;
    border-radius: 20px;
    right: 40px;
    top:60px;
    .avatar-url{
      width:140px;
      height:140px;
      overflow: hidden;
      border-radius: 10%;
    }
    .nick-name{
      margin-top:35px;
      font-size:28px;
      width: 100%;
      overflow: hidden;
      text-align: center;
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
      <li @click="myActivity">我的创建</li>
      <li @click="participateAct">我的参加</li>
      <li @click="publishAct">创建活动</li>
      <li>关于小数点</li>
      <li @click="clearStorage">退出登录</li>
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
      },
      clearStorage(){
        wx.showModal({
          content:"真的要退出登录吗",
          success:res=>{
            if(res.confirm){
              wx.clearStorage()
              wx.switchTab({
                url:'/pages/index/main'
              })
            }
          }
        })
      }
    }
  }
</script>
