<style scoped lang="scss">
  @import 'static/style/config';
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size:30px;
    overflow: hidden;
    font-weight: 700;
    padding:30px;
    .address{
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      transition: width .5s linear;
      .radis{
        width:19px;
        height:24px;
        flex-shrink: 0;
      }
      .text{
        margin-left:12px;
        margin-right:12px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        background: transparent;
        flex: 1;
        border:0;
        font-size: 30px;
        &::after{
          border:none;

        }
      }
      .act{
        width:8px;
        height:16px;
        flex-shrink: 0;
      }

    }
    .search{
      width:370px;
      height:60px;
      background:$gray_q;
      border-radius: 30px ;
      flex-shrink: 1;
      margin-left:20px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding:0 20px;
      .search-input{
        display: block;
        margin-left:5px;
        font-size: 30px;
      }
      .icon-search{
        width:26px;
        height: 26px;
        flex-shrink: 0;
      }
    }
  }
  .nav-wrap{
    margin-top:40px;
    padding:0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    .nav-list{
      width:25%;
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: $black_q;
      img{
        width:96px;
        height: 96px;
      }
      .text{
        margin-top:20px;
        text-align: center;
      }
    }
  }
  .banner{
    width:690px;
    height:260px;
    margin: 50px auto auto;
    position: relative;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .swiper-item{
      overflow: hidden;
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
  .broad-inner-wrap{
    height:40px;
    margin-top:20px;
    .broad-scroll{
      width:100%;
      transition: transform .5s linear;
    }
    .scroll-view-item{
      height:40px;
      color:$gray_time;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .icon-broad{
        width:36px;
        height:30px;
        margin-left:20px;
        margin-right:20px;
      }
      .text{
        flex: 1;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }

  }
  .tab-name{
    margin-top:40px;
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
  .table-header{
    position:relative;
    margin-top:30px;
    padding:0 30px;
    height:82px;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .table-switch{
    height:40px;
    flex: 1;
    text-align: center;
    .select{
      height: 40px;
    }
    .selection{
      background: rgba(200,200,200,.5);
      z-index: 300;
     .options{
       padding:10px 0;
     }
    }
  }
  .table-body{
    margin-bottom:200px;
    .table-select{
      padding:0 30px;
      .list{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:20px 0;
        .icon-left{
          flex-shrink: 0;
          width:160px;
          height:120px;
        }
        .cont-right{
          width:500px;
          .cont-title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .baom{
              width:160px;
              height:60px;
              font-size: 30px;
              line-height: 60px;
              background:#fff;
              border:1px solid $blue;
              border-radius: 30px;
              color:$blue;
              &.disabled{
                border:1px solid #ccc;
                color:#ccc;
                background:#f5f5f5;
              }
            }

            .titles{
              font-size: 32px;
              color:$black_txt;
            }
          }
          .cont-btn{
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 24px;
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
  .publish{
    height:150px;
    width:100%;
    position: fixed;
    bottom:0;
    z-index: 200;
    background:transparent;
    .banner_publish{
      width:100%;
      position: absolute;
      height: 150px;
      background: #fff;
      box-shadow: 0 0 15px 0 rgba(0,0,0,.5);
      .btn{
        position: absolute;
        width:120px;
        height:120px;
        background:#fff;
        border-radius: 50%;
        top:-17px;
        left:50%;
        margin-left:-60px;
        z-index: -1;
        box-shadow: 0 0 15px 0 rgba(0,0,0,.5);
      }
      .add_publish{
        position: absolute;
        width:120px;
        height: 120px;
        margin-left:-60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        left:50%;
        top:-17px;
        img{
          width:100px;
          height: 100px;
        }
      }
      .add_text{
        position:absolute;
        width:100px;
        height:40px;
        bottom:10px;
        line-height: 40px;
        font-size: 35px;
        left:50%;
        margin-left:-50px;
        text-align: center;
        color:#999;
      }
    }
  }
</style>
<template>
  <div class="container">
      <div class="header">
        <div class="address" >
          <img mode="aspectFill" class="radis" src="/static/images/address@3x.png" alt="">
          <button @click="getAddress" class="text"  >{{schoolIndex.name}}</button>
          <img mode="aspectFill"  class="act" src="/static/images/back.png@3x.png" alt="">
        </div>
        <div class="search">
          <img class="icon-search" src="/static/images/search@3x.png" alt="">
          <input class="search-input"
                 maxlength="15"
                 type="text"
                 v-model.layer="searchType"
                 :placeholder="placeholder"
                 confirm-type="search"  @confirm="getAddress" >
        </div>
      </div>
      <div class="nav-wrap">
        <div class="nav-list" v-for="(item,index) in navList" :key="key" @click="goGroupPath(item)">
          <img :src="item.img" alt="">
          <div class="text" >{{item.text}}</div>
        </div>
      </div>
      <div class="banner">
        <swiper :indicator-dots="false"
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
      <div class="broad">
        <scroll-view  class="broad-inner-wrap" >
          <div class="broad-scroll" :style="{transform:translateTop}">
            <div v-for="(item,index) in broadList" :key="index" class="scroll-view-item bc_green">
              <img class="icon-broad" src="/static/images/guangbo@2x.png@3x.png" alt="">
              <div class="text">{{ item.text }}</div>
            </div>
          </div>
        </scroll-view>
      </div>
      <div class="tab-name">
        <div class="title">学生活动</div>
      </div>
      <div class="table-header">
        <div class="table-switch paixu desc">
          <div class="select" @click="openDesc">综合排序</div>
          <div class="selection" v-show="selectDesc">
            <div class="options"  @click="sortTable(1)">1</div>
            <div class="options"  @click="sortTable(2)">2</div>
            <div class="options"  @click="sortTable(3)">3</div>
          </div>
        </div>
        <div class="table-switch">最热活动</div>
        <div class="table-switch">校外活动</div>
      </div>
      <div class="table-body">
        <div class="table-select">
          <div class="list" v-for="item in activityList" :key="key">
            <img class="icon-left" :src="item.placardUrl" alt="">
            <div class="cont-right">
              <div class="cont-title">
                <div>
                  <div class="titles">{{item.orgName}}{{item.theme}}</div>
                  <stars :stars="item.stars" :max="5"></stars>
                </div>
                <div>
                  <button v-if="item.active" class="baom disabled" >已报名</button>
                  <button v-else class="baom" @click="enrollMain(item)">报名</button>
                </div>
              </div>
              <div class="cont-btn">
                <div>报名人数 {{item.enroll}} 人</div>
                <div>结束时间：{{item.endTime}}</div>
              </div>
            </div>
          </div>
        </div>
        <loading v-if="isLoading"></loading>
      </div>
      <div class="login-wrap" v-if="noLogin">
        <div class="login-body">
          <img src="/static/images/icon_1.png" alt="">
          <button @getuserinfo="getUserInfo"  open-type="getUserInfo" class="getuserinfo" :loading="loading" :disabled="disabled">登录</button>
        </div>
      </div>
      <div class="login-wrap" v-if="setLocaltion" @click="setLocaltion=false">
        <div class="login-body">
          <div>小程序获取地理位置权限</div>
          <button open-type="openSetting" @opensetting="openSetting"  class="getuserinfo" :loading="loading" :disabled="disabled">去设置</button>
        </div>
      </div>
      <school-picker v-if="chooseSchool" :schoolAddress="schoolList" @getItems="getAddressItem"></school-picker>
      <div class="publish">
        <div class="banner_publish">
          <div class="btn"></div>
          <div class="add_publish" @click="publishPath">
            <img src="/static/images/public2.png" alt="">
          </div>
          <div class="add_text">发布</div>
        </div>
      </div>
  </div>
</template>
<script>
import store from '../../store/index'
import stars from '@/components/stars'
import { getSchool,getActivity } from  '@/server/index'
import loginCtrl  from '@/utils/login'
import schoolPicker from '@/components/schoolpicker'
import loading from '@/components/loading'
import {getAddressInfo} from '@/utils/getAddress'

const QQMapWX = require('../../../static/libs/qqmap-wx-jssdk.min')
export default {
  data () {
    return {
      isLoading:true,
      disabled:false,
      userInfo: {},
      searchType:'',
      placeholder:'搜索',
      schoolList:[],
      schoolIndex:{
        title:"请选择学校"
      },
      bannerActive:0,
      translateTop:'',
      selectDesc:false,
      noLogin:false,
      setLocaltion:false,
      chooseSchool:false,
      qqmapwx:null,
      navList:[
        {
          img:'/static/images/banner1@3x.png',
          text:'宣传',
          path:'/pages/activity/advertise/main'
        },{
          img:'/static/images/banner2@3x.png',
          text:'投票',
          path:'/pages/activity/voting/lists/main'
        },{
          img:'/static/images/banner3@3x.png',
          text:'招新',
          path:'/pages/activity/list/main'
        },{
          img:'/static/images/banner4@3x.png',
          text:'宅基地'
        }
      ],
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
      broadList:[
        {
          text:"广播1广播1广播1广播1广播1广播1广播1广播1广播1广播1广播1广播1广播1",
          target:''
        },{
          text:"广播2广播2广播2",
          target:''
        },{
          text:"广播3广播3广播3广播3广播3广播3广播3广播3广播3广播3广播3",
          target:''
        },{
          text:"广播4广播4广播4广播4广播4广播4广播4广播4广播4广播4广播4广播4广播4广播4广播4",
          target:''
        },{
          text:"广播5广播5广播5广播5广播5广播5广播5广播5广播5广播5广播5广播5广播5广播5广播5",
          target:''
        }
      ],
      activityList:[],
      page:1,
    }
  },
  components:{
    stars,
    schoolPicker,
    loading
  },
  methods: {
    //获取活动数据
    getData(){
      this.isLoading = true
      getActivity({
        currentPage:this.page,
        pageSize:5,
        search:{
          type:1
        }
      },(er,res)=>{
        if(er) return
        if( res.data && res.data.list.length  ){
          if(  res.data.list.length < 5){
            this.isLoading=false
            this.activityList = this.activityList.concat( res.data.list )
            return
          }else{
            setTimeout(()=>{
              this.isLoading=false
              this.activityList = this.activityList.concat( res.data.list )
              this.page+=1
            },1500)
          }
        }else{
            setTimeout(()=>{
              this.isLoading=false
            },1500)
        }

      })
    },
    //首页导航
    goGroupPath(model){
      let path = model.path
      if(!path){
        wx.showToast({
          icon:'none',
          title: '正在建设中...',
        })
        return
      }
      wx.navigateTo({
        url:path
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
          _this.loading=false
          _this.disabled=false
          _this.noLogin=true
        }
      })
      loginCtrl.login((err,res)=>{
        this.loading=false
        this.disabled=false
        if(err) {
          wx.showModal({
            title: '提示',
            content:'登录失败',
            success: function(res) {
              if (res.confirm) {
                _this.loading=false
                _this.disabled=false
                _this.noLogin=false
              } else if (res.cancel) {
                _this.loading=false
                _this.disabled=false
                _this.noLogin=false
              }
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
    //轮播公告
    changeBroad(){
        let max = this.broadList.length-1
        let start= 0
        setInterval(()=>{
          let index = -start*40
          this.translateTop=`translateY(${index}rpx)`
          start=start>=max?0:start+1
        },3000)
    },
    //首页路由
    enrollMain(model){
      switch (model.type){
        case 1:{
          //报名
          wx.navigateTo({
            url:'/pages/activity/detail/main?actid='+model.actid
          })
          break
        }
        //投票
        case 2:{
          wx.navigateTo({
            url:'/pages/activity/voting/detail/main?actid='+model.actid
          })
          break
        }
        //宣传
        case 3:{
          wx.navigateTo({
            url:'/pages/activity/advertise/main?actid='+model.actid
          })
          break
        }
        default :
          wx.navigateTo({
            url:'/pages/activity/advertise/main?actid='+model.actid
          })
          break
      }

    },
    //打开table排序
    openDesc(){
      this.selectDesc=!this.selectDesc
    },
    //点击table排序
    sortTable(sort){
      this.selectDesc=false
    },
    //检测登录状态
    checkLogin(){
      const _this = this
      const token = wx.getStorageSync( 'token' )
      if( token ){
        _this.noLogin=false
      }else{
        _this.noLogin=true
      }
    },
    //获取地理位置
    getLoaction(){
      const _this= this
      getAddressInfo(this.searchType,res=>{
        this.chooseSchool=true
      })
      setTimeout(()=>{
        wx.hideLoading()
      },5000)
    },
    //获取地理位置权限
    getAddress(){
      const _this=this
      wx.getSetting({
        success:res=>{
          if( !res.authSetting['scope.userLocation']){
            wx.authorize({
              scope:'scope.userLocation',
              success(res){
                _this.getLoaction()
              },
              fail(err){
                _this.setLocaltion=true
              }
            })
          }else{
            _this.getLoaction()
          }
        }
      })
    },
    //打开权限控制
    openSetting(e){
      let target = e.target
      let authSetting= target.authSetting
      this.setLocaltion=false
    },
    //选择地图元素确认
    getAddressItem(model){
      this.schoolIndex= model
      wx.setStorageSync('schoolIndex',model)
    },
    //检查学校
    checkSchool(){
      let school = wx.getStorageSync('schoolIndex')
      if(school){
        this.schoolIndex = school
      }else{
        this.schoolIndex = {
          name:"请选择学校"
        }
      }
    },
    publishPath(){
      wx.navigateTo({
        url:"/pages/activity/publish/main"
      })
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.changeBroad()
    this.checkLogin()
    this.checkSchool()
    this.getData()
    this.qqmapwx =  new QQMapWX({
      key:"ICYBZ-3YVKU-S52VW-BKGEF-2JOWT-N5FVQ"
    })
  },
  onReachBottom(){
    if(this.isLoading) return
    this.getData()
  }
}
</script>


