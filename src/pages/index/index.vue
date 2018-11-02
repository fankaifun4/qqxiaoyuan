<style scoped lang="scss">
  @import 'static/style/config';
  .banner{
    position: relative;
    overflow: hidden;
    .swiper{
      width:750px;
      height:420px;
    }
    .swiper-item{
      width:750px;
      height:420px;
      overflow: hidden;
      img{
        width:750px;
        height:420px;
        overflow: hidden;
      }
    }
    .dots-wrap{
      position: absolute;
      width:200px;
      height:20px;
      left:50%;
      margin-left:-100px;
      z-index: 3;
      bottom:10px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .dots{
        width:20px;
        height:20px;
        background:rgba(255,255,255,.6);
        margin:0 15px;
        border-radius: 10px;
        transition: width .3s ease;
        flex-shrink: 0;
        &.active{
          width:40px;
          border-radius: 10px;
          background: rgba(255,255,255,.8);
        }
      }
    }
  }
  .tab-name{
    margin-top:20px;
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    .more{
      text-align: right;
      color:rgb(50,135,244);
      font-size: 30px;
      margin:10px 20px;
    }
    .title{
      font-size:32px;
      font-weight: 700;
      text-align: center;
      position: relative;
      width:134px;
      margin:0 auto;
      &::before,&::after{
        content: "";
        position: absolute;
        height:2px;
        top:50%;
        background:$black_txt;
        width:100px;
      }
      &::before{
        left:-110px;
      }
      &::after{
        right:-110px;
      }
    }
  }
  .table-body{
    .table-select{
      background: #fefefe;
      padding:40px 0;
      .list{
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding:30px 20px;
        border-bottom: 1px solid #f1f1f1;
        .icon-left{
          flex-shrink: 0;
          width:300px;
          height:168px;
          border-radius: 10px;
          box-shadow: 0 0 1px 0 rgba(0,0,0,.1);
        }
        .cont-right{
          flex:1;
          margin-left:25px;
          font-size: 26px;
          color: #666;
          >div{
            margin-bottom:15px;
          }
          .baomover{
            color:#ccc;
            font-size: 30px;
          }
          .baom{
            color:#090;
            font-size: 30px;
          }
          .titles{
            color:$black_txt;
            margin-bottom:10px;
          }
        }
      }
    }
  }
  .login-wrap{
    position:fixed;
    top:0;
    bottom:0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.5);
    z-index: 1999;
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
        border-radius: 15px;
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
  .hr{
    background:#efefef;
    height:10px;
  }
</style>
<template>
  <div class="container">
      <div class="banner">
        <swiper class="swiper" :indicator-dots="false"
                :autoplay="true" :interval="5000" :circular="true" @change="changeBanner" >
          <block v-for="item in bannerList" :key="key" >
            <swiper-item class="swiper-item">
              <img mode="aspectFill" :src="item.img" class="slide-image"  />
            </swiper-item>
          </block>
        </swiper>
        <div class="dots-wrap">
          <block v-for="(item,index) in bannerList" :key="key">
            <div class="dots" :class="{active:bannerActive==index}"></div>
          </block>
        </div>
      </div>
      <div class="hr"></div>
      <div class="tab-name">
        <div class="title">最新活动</div>
        <div class="more" @click="goMore">查看更多...</div>
      </div>
    <no-data :nodata="noData"
             title="暂时还没有投票活动哦"
             tips="去创建并邀请好友丰富社区吧"
             btn="现在就去创建" @clickBtn="goPublish"></no-data>
      <div class="table-body">
        <div class="table-select">
          <div class="list" v-for="item in activityList" :key="key"  @click="enrollMain(item)">
            <img class="icon-left" :src="item.placardUrl" alt="">
            <div class="cont-right">
              <div class="fs-b">{{item.theme}}</div>
              <div>人气 {{item.viewTotal}} </div>
              <div v-if="item.isStart!=3">开始结间：{{item.startTime}}</div>
              <div v-if="item.isStart!=3">结束时间：{{item.endTime}}</div>
              <div v-if="item.isStart==1" class="baom" >火热进行中</div>
              <div v-if="item.isStart==2" class="baomover disabled" >活动暂停</div>
              <div v-if="item.isStart==3" class="baomover disabled" >活动已结束</div>
            </div>
          </div>
          <loading v-if="isLoading"></loading>
        </div>
      </div>
      <air-props text="创建活动" @tapEnd="publishAct"></air-props>
      <div class="login-wrap" v-if="noLogin">
        <div class="login-body">
          <img src="/static/images/qiyu_logo.jpg" alt="">
          <button @getuserinfo="getUserInfo"  open-type="getUserInfo" class="getuserinfo" :loading="loading" :disabled="disabled">登录</button>
        </div>
      </div>
  </div>
</template>
<script>
import {getActivity } from  '@/server/index'
import loginCtrl  from '@/utils/login'
import loading from '@/components/loading'
import moment from 'moment'
import noData from '@/components/nodata'
import airProps from '@/components/airgroup'
export default {
  data () {
    return {
      isLoading:true,
      disabled:false,
      userInfo: {},
      bannerActive:0,
      selectDesc:false,
      noLogin:false,
      bannerList:[
        {
          img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533929898443&di=18231a741e86d7077b916b069d5a67ce&imgtype=0&src=http%3A%2F%2Fpic.feizl.com%2Fupload%2Fallimg%2F180126%2F291186uuwuygmswlt.png",
          target:''
        },{
          img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533929968543&di=6d8820ff9cde1abd824a7ccb8dbfab22&imgtype=0&src=http%3A%2F%2Fimg1.ph.126.net%2FEG-bITL3HiaIykIjaqXWnA%3D%3D%2F1157425104335035471.jpg",
          target:''
        },{
          img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533930018725&di=32aab3485c236e04c0f1d020c50e6d19&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3D6e7db2342d9759ee5e5d688bdb83267a%2F242dd42a2834349b65bcb8bcc2ea15ce36d3be55.jpg",
          target:''
        },{
          img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533930052651&di=181cf1ce6a483f9fa338a92c774826e2&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F94o3dSag_xI4khGko9WTAnF6hhy%2Flvpics%2Fh%3D800%2Fsign%3Db8aaa1c7eb24b899c13c74385e071d59%2F500fd9f9d72a6059b5bf6add2a34349b023bba4e.jpg",
          target:''
        }
      ],
      activityList:[],
      page:1,
      listOver:false,
      longStart:null,
      noData:false
    }
  },
  components:{
    loading,
    noData,
    airProps
  },
  onShow(){
    this.checkLogin()
    // 调用应用实例的方法获取全局数据
    this.listOver=false
    this.activityList=[]
    this.page=1
    this.getData()
  },
  onPullDownRefresh(){
    this.checkLogin()
    this.listOver=false
    this.page=1
    this.getUpload()
  },
  onShareAppMessage(res){
    return {
      title:"小数点投票，分享每一份荣誉和快乐",
      url:"/pages/index/main"
    }
  },
  methods: {
    goPublish(){
      wx.navigateTo({
        url:"/pages/activity/publishVoting/main"
      })
    },
    getUpload(){
      this.isLoading = true
      getActivity({
        currentPage:this.page,
        pageSize:5,
        search:{
          type:1
        }
      },(er,res)=>{
        wx.stopPullDownRefresh()
        this.isLoading=false
        if(er) return
        if( res.data && res.data.list  ){
          res.data.list.forEach(item=>{
            let startTime = moment(item['startTime']).format('MM月DD hh:mm')
            let endTime = moment(item['endTime']).format('MM月DD hh:mm')
            item['startTime'] = startTime
            item['endTime'] = endTime
          })
          if(  res.data.list.length < 5){
            this.activityList =  res.data.list
            this.listOver=true
          }
        }else{
          setTimeout(()=>{
            this.isLoading=false
          },500)
        }
      })
    },
    //获取活动数据
    getData(){
      if(this.listOver) {
        wx.showToast({
          icon:"none",
          title:"已加载全部"
        })
        return
      }
      this.isLoading = true
      getActivity({
        currentPage:this.page,
        pageSize:5,
        search:{
          type:1
        }
      },(er,res)=>{
        this.isLoading=false
        if(er) return
        if( res.data && res.data.list  ){
          if( this.page==1 && res.data.list.length<1 ){
            this.noData=true
            return
          }
          this.noData=false
          res.data.list.forEach(item=>{
            let startTime = moment(item['startTime']).format('MM月DD hh:mm')
            let endTime = moment(item['endTime']).format('MM月DD hh:mm')
            item['startTime'] = startTime
            item['endTime'] = endTime
          })
          if(  res.data.list.length < 5){

            this.activityList = this.activityList.concat( res.data.list )
            this.listOver=true
            return
          }else{
            setTimeout(()=>{
              this.isLoading=false
              this.activityList = this.activityList.concat( res.data.list )
              if( this.page == res.data.lastPage ) {
                this.listOver=true
                return
              }
              this.page+=1
            },500)
          }
        }else{
            setTimeout(()=>{
              this.isLoading=false
              this.noData=true
            },500)
        }

      })
    },
    //登录
    getUserInfo () {
      this.loading=true
      this.disabled=true
      const _this=this
      wx.getUserInfo({
        success:res=>{
          wx.setStorageSync('userInfo',res.userInfo)
        },
        fail(err){
          wx.showModal({
            content:"登录失败",
            showCancel:false,
            success:function(res){
              _this.loading=false
              _this.disabled=false
              _this.noLogin=true
            }
          })
        }
      })
      loginCtrl.login((err,res)=>{
        this.loading=false
        this.disabled=false
        if(err) {
          wx.showModal({
            content:"登录失败",
            showCancel:false,
            success(){
              _this.loading=false
              _this.disabled=false
              _this.noLogin=true
            }
          })
          return
        }
        this.getData()
        this.noLogin=false
      })
    },
    //轮播图
    changeBanner(e){
      let cur = e.target.current
      this.bannerActive = cur
    },
    //首页路由
    enrollMain(model){
      wx.navigateTo({
        url:`/pages/activity/voting/detail/main?id=${model.id}`
      })
    },
    //检测登录状态
    checkLogin(){
      const _this = this
      const token = wx.getStorageSync( 'token' )
      const memberId = wx.getStorageSync('memberId')
      if( token && memberId ){
        _this.noLogin=false
      }else{
        _this.noLogin=true
      }
    },
    //去投票列表
    goMore(){
      wx.navigateTo({
        url:"/pages/activity/voting/lists/main"
      })
    },
    publishAct(){
      wx.navigateTo({
        url:"/pages/activity/publishVoting/main"
      })
    }
  },
  onReachBottom(){
    if(this.data.isLoading) return
    if(!this.data.userInfo) return
    this.getData()
  }
}
</script>


