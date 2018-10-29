<style lang="scss" scoped>
  .theader{
    width:750px;
    margin:0 auto;
    height:425px;
    img{
      width:100%;
      height: 100%;
    }
  }
  .search{
    display: flex;
    justify-items: flex-start;
    align-items: center;
    padding:0 30px;
    margin-top:10px;
    margin-bottom:15px;
    .search-icon{
      width:32px;
      height:32px;
      margin-right: 15px;
    }
    .search-input{
      border:none;
      width:700px;
      height:40px;
      line-height: 40px;
    }
  }
  .tab{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:30px;
    >div{
      width:30%;
      text-align:center;
      &:nth-child(2){
        border:1px solid #ccc;
        border-top:none;
        border-bottom:none;
      }
      .weight{
        font-weight: 700;
        margin-bottom:10px;
      }
      .nu{

      }
    }
  }
  .voting-list{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: #f5f5f6;
    padding:15px;
    .flex-1{
      flex: 1;
      &:first-child{
        margin-right: 15px;
      }
      .voting-item{
        background: #fff;
        overflow: hidden;
        box-sizing: border-box;
        margin-bottom:30px;
        font-size: 28px;
        padding:20px;
        .avart-img{
          width: 100%;
          border:1px solid #efefef;
          border-radius: 10px;
        }
        >div{
          margin-bottom:10px;
          padding-left: 15px;
        }
        .avatar{
          font-weight: 700;
          margin-top:10px;
        }
        .describe{
          font-size: 26px;
        }
        .bh{
          margin-top:10px;
        }
        .ps{
          margin-top:5px;
        }
        .btn-tp{
          margin-top:10px;
          text-align: right;
          color:#fff;
          font-size: 32px;
          background:rgb(50,135,244);
          border-radius: 8px;
          display: inline-block;
          padding:15px 30px;
          float:right;
        }
      }
    }
  }
  .btn-share{
    background: #c90915;
    color: #fff;
    height: 60px;
    line-height: 60px;
    font-size: 30px;
  }
</style>
<template>
<div class="container">
  <ini-show :show="initLoader"></ini-show>
  <div v-if="!initLoader">
    <div class="theader">
      <img  mode="aspectFill" :src="(infoData.base&&infoData.base.placardUrl)||''" alt="">
    </div>
    <!--<div class="search">-->
      <!--<img class="search-icon" src="/static/images/search@3x.png" alt="">-->
      <!--<input type="text" class="search-input" maxlength="16" @confirm="searchVoter" confirm-type="search">-->
    <!--</div>-->
    <div class="tab">
      <div>
        <div class="weight">投票项目</div>
        <div class="num">{{infoData.totalItem}}</div>
      </div>
      <div>
        <div class="weight">投票次数</div>
        <div class="num">{{infoData.totalVoteCount}}</div>
      </div>
      <div>
        <div class="weight">累计访问</div>
        <div class="num">{{infoData.totalView}}</div>
      </div>
    </div>
    <div class="voting-list">
      <div class="flex-1">
        <div class="voting-item" v-for="(item,index) in infoData.item" :key="key"  v-if="index%2==0">
          <img class="avart-img" mode="widthFix" :src="item.photoUrl" alt="" @click="previmg(item.photoUrl)">
          <div class="bh">编号：{{item.itemNo}}</div>
          <div class="avatar">{{item.title}} </div>
          <div class="ps">票数：{{item.totalNumber}}</div>
          <div class="describe">{{item.describes}}</div>
          <div class="btn-tp" v-if="infoData.base.isStart"  @click="poll(item)">投票</div>
          <button v-if="isStart==1" class="btn-share" open-type="share" :id="item.itemNo"  >为ta拉票</button>
        </div>
      </div>
      <div class="flex-1">
        <div class="voting-item" v-for="(item,index) in infoData.item" :key="key" v-if="index%2==1">
          <img class="avart-img" mode="widthFix" :src="item.photoUrl" alt="" @click="previmg(item.photoUrl)">
          <div class="bh">编号：{{item.itemNo}}</div>
          <div class="avatar">{{item.title}} </div>
          <div class="ps">票数：{{item.totalNumber}}</div>
          <div class="describe">{{item.describes}}</div>
          <div class="btn-tp"   v-if="isStart==1"  @click="poll(item)">投票</div>
          <div class="btn-tp"   v-if="isStart==2" >活动暂停</div>
          <div class="btn-tp"   v-if="isStart==3" >活动已结束</div>
          <button v-if="isStart==1" class="btn-share"  open-type="share" :id="item.itemNo" >为ta拉票</button>
        </div>
      </div>
    </div>
  </div>
  <air-props text="去报名" @tapEnd="goJoin" :show="canUserCreate"></air-props>
</div>
</template>
<script>
  import {activityDetail,activityVote} from "@/server/index"
  import airProps from '@/components/airgroup'
  import iniShow from '@/components/initShow'
  export default {
    components:{
      airProps,
      iniShow
    },
    data(){
     return{
       initLoader:true,
       Votes: [],
       infoData:{},
       userInfo:{},
       id:'',
       isEnd:false,
       isStart:1,
       canUserCreate:0,
       initShow:false
     }
    },
    mounted(){
    },
    onLoad(option){
      this.id=option.id
      this.userInfo= wx.getStorageSync('userInfo')
      this.getData()
    },
    onShareAppMessage(res){
      let id = res.target.id
      let data = this.infoData.item
      let user = {}
      for(let i=0;i<data.length;i++){
        if( data[i].itemNo == id ){
          user = data[i]
          break
        }
      }
      if(res.from==='button'){
        return {
          title:"为我投上宝贵的一票吧,我的编号是："+ id,
          imageUrl:user.photoUrl,
          path:'/pages/activity/voting/detail/main?id='+this.id
        }
      }else{
        return {
          title:"为我投上宝贵的一票吧",
          path:'/pages/activity/voting/detail/main?id='+this.id
        }
      }

    },
    methods:{
      getData(){
        this.initLoader=true
        activityDetail(this.id,(err,res)=>{
          this.initLoader=false
          if(err){
            wx.showToast({
              icon:'none',
              title:"加载数据失败"
            })
            return
          }
          if(res && res.data && res.data.code==200){
            this.infoData = res.data.data
            this.canUserCreate = this.infoData.info.userCreate
            this.isStart = this.infoData.base.isStart
          }
        })
      },
      searchVoter(e){
        e.detail.value
      },
      poll(model){
        activityVote(model.id,(err,res)=>{
          if(err){
            wx.showModal({
              content:"投票失败",
              showCancel:false
            })
            return
          }
          if( res.data.code==200 ){
            wx.showToast({
              icon:'none',
              title:res.data.msg
            })
            model.totalNumber+=1
          }else{
            wx.showModal({
              content:res.data.msg,
              showCancel:false
            })
          }
        })
      },
      previmg(url){
        wx.previewImage({
          current:url,
          urls:[url]
        })
      },
      goJoin(){
        wx.navigateTo({
          url:"/pages/enroll/main?id="+this.id
        })
      }
    }
  }
</script>
