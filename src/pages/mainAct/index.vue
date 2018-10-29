<style scoped lang="scss">
  .voting-list{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding:15px;
    .flex-1{
      flex: 1;
      &:first-child{
        margin-right:20px;
      }
      .voting-item{
        border:1px solid #f2f2f2;
        overflow: hidden;
        width:100%;
        padding:20px;
        box-sizing: border-box;
        margin-bottom:25px;
        font-size: 26px;
        >div{
          margin-top:20px;
        }
        .avart-img{
          width: 100%;
          border-radius: 8x;
          overflow: hidden;
          box-shadow: 0 0 1px 0 rgba(0,0,0,.1);
        }
        .avatar{
          font-weight: 700;
        }
        .describe{
          font-size: 26px;
        }
        .mannage{
          overflow: hidden;
        }
        .mannage-btn{
          float: left;
          height:60px;
          line-height: 60px;
          width:120px;
          color:#fff;
          background:rgb(50,135,244);
          text-align: center;
          align-items: center;
          border-radius: 10px;
        }
        .btn-tp{
          margin-top:10px;
          text-align: right;
          font-size: 24px;
          display: inline-block;
          float:right;
        }
      }
    }
  }
  .nav-back{
    height:80px;
    background:#3287f4;
    color:#fff;
    text-align: center;
    line-height: 80px;
  }
</style>
<template>
    <div class="">
      <div class="nav-back" @click="goHome" v-if="ispublish">返回首页</div>
      <no-data :nodata="noData"
              title="您还没有创建过活动哦"
              tips="马上去创建并邀请好友参加吧"
              btn="马上去创建" @clickBtn="goPublish"></no-data>
      <div class="voting-list">
        <div class="flex-1">
          <div class="voting-item" v-for="(item,index) in playerXd" :key="key"  v-if="index%2==0">
            <img class="avart-img" mode="widthFix" :src="item.placardUrl" alt="">
            <div class="avatar">{{item.theme}}</div>
            <div class="describe">{{item.introduction}}</div>
            <div class="bh">开始：{{item.startTime}}</div>
            <div class="ps">结束：{{item.endTime}}</div>
            <div  v-if="item.isStart==0" style="color: #aaa">活动已结束</div>
            <div class="mannage">
              <div class="mannage-btn"  @click="mannageAct(item)">管理</div>
              <div class="btn-tp">人气 {{item.viewTotal}}</div>
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div class="voting-item" v-for="(item,index) in playerXd" :key="key" v-if="index%2==1">
            <img class="avart-img" mode="widthFix" :src="item.placardUrl" alt="">
            <div class="avatar">{{item.title}} </div>
            <div class="describe">{{item.introduction}}</div>
            <div class="bh">开始：{{item.startTime}}</div>
            <div class="ps">结束：{{item.endTime}}</div>
            <div  v-if="item.isStart==0" style="color: #aaa">活动已结束</div>
            <div class="mannage">
              <div class="mannage-btn" @click="mannageAct(item)">管理</div>
              <div class="btn-tp">人气 {{item.viewTotal}}</div>
            </div>
          </div>
        </div>
      </div>
      <loading v-if="isLoading"></loading>
    </div>
</template>
<script>
  import { getMyActivity } from  '@/server/index'
  import loading from '@/components/loading'
  import noData from '@/components/nodata'
  import moment from 'moment'
  export default {
    components:{
      loading,
      noData
    },
    data(){
      return{
        playerXd:[],
        hotName:"我的活动",
        pageSize:20,
        page:1,
        listOver:false,
        isLoading:false,
        ispublish:false,
        noData:false
      }
    },
    onLoad(option){
      this.ispublish = option.publish||''
    },
    onShow(){
      this.listOver=false
      this.playerXd=[]
      this.getData()
    },
    methods:{
      goHome(){
        wx.reLaunch({
          url:"/pages/index/main"
        })
      },
      getData(){
        if(this.listOver){
          wx.showToast({
            icon:"none",
            title:'已加载全部...'
          })
          return
        }
        this.isLoading=true
        const _this=this
        let memberId = wx.getStorageSync('memberId')
        getMyActivity({
          currentPage:this.page,
          pageSize:this.pageSize,
          search:{
            memberId:memberId
          }
        },(err,res)=>{
          _this.isLoading=false
          if(err) return
          if( res.data && res.data.list  ){
            if( this.page==1 && res.data.list.length<1 ){
              this.noData=true
              return
            }
            this.noData=false
            res.data.list.forEach(item=>{
              item['startTime'] = moment(item['startTime']).format('MM月DD hh:mm')
              item['endTime'] = moment(item['endTime']).format('MM月DD hh:mm')
            })
            if(  res.data.list.length < _this.pageSize){

              _this.playerXd = this.playerXd.concat( res.data.list )
              _this.listOver=true
              return
            }else{
              setTimeout(()=>{
                _this.isLoading=false
                _this.playerXd = _this.playerXd.concat( res.data.list )
                if( _this.page == res.data.lastPage ) {
                  _this.listOver=true
                  return
                }
                _this.page+=1
              },500)
            }
          }else{
            setTimeout(()=>{
              _this.isLoading=false
              this.noData=true
            },500)
          }
        })
      },
      mannageAct(model){
        wx.navigateTo({
          url:"/pages/updateVote/update/main?id="+model.id
        })
      },
      goPublish(){
        wx.navigateTo({
          url:"/pages/activity/publishVoting/main"
        })
      }
    },
    onReachBottom(){
      if(this.isLoading) return
      this.getData()
    }
  }
</script>
