<style scoped lang="scss">
  @import "static/style/lists.scss";
  .top-banner{
    width:100%;
    height: 100%;
    overflow: hidden;
    background: #ffe14f;
    >img{
      width:100%;
      height: 100%;
    }
  }
  .nav-wrap{
    padding:15px;
    background: #fff;
  }
  .nav-top{
    width:100%;
    .top1{
      width:100%;
      height:300px;
      overflow: hidden;
      .text{
        margin-top:10px;
      }
      .img{
        width:100%;
        height:250px;
        img{
          width:100%;
          height:250px;
          overflow: hidden;
          border-radius: 10px;
        }
      }

    }
    .top23{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .nav-item{
        flex: 1;
        margin-top:10px;
        &:first-child{
          margin-right: 20px;
        }
        .text{
          margin-top:10px;
        }
        .img{
          width:100%;
          height:180px;
          border-radius: 10px;
          overflow: hidden;
          img{
            width:100%;
            height:180px;
          }
        }
      }
    }
  }
  .table-body{
    margin-bottom:100px;
    .table-select{
      .list{
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding:30px 20px;
        border-bottom:1px solid #f1f1f1;
        .icon-left{
          flex-shrink: 0;
          width:300px;
          height:168px;
          border-radius: 10px;
          box-shadow: 0 0 1px 0 rgba(0,0,0,.1);
        }
        .cont-right{
          flex:1;
          margin-left:15px;
          font-size: 26px;
          >div{
            margin-bottom:15px;
          }
          .theme{
            font-weight: 700;
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
            color:#333;
            margin-bottom:10px;
          }
        }
      }
    }
  }
  .publish-wrap{
    position: fixed;
    width:120px;
    height:120px;
    bottom:50px;
    right: 10px;
    background: #1296db;
    border-radius: 100%;
    text-align: center;
    color: #fff;
    font-size: 24px;
    z-index: 1000;
    img{
      display: block;
      width:60px;
      height: 60px;
      margin:0 auto;
    }
  }
</style>
<template>
  <div class="ct_w">
    <div class="ct-b">
      <div class="ct-list">
        <div class="ct-list-header">
          <img mode="aspectFit" class="icon" src="https://lg-5awlljfq-1257134625.cos.ap-shanghai.myqcloud.com/jingxuan.png" alt=""> {{ hotName }}
        </div>
        <div class="nav-wrap">
          <div class="nav-top">
            <div class="top1" @click="goDetailPath(TOP3[0])">
                <div class="img"><img mode="aspectFill" :src="TOP3[0].placardUrl||''" alt=""></div>
                <div class="text">{{TOP3[0].theme||''}}. {{ TOP3[0].describes||''}}</div>
            </div>
            <div class="top23" v-if="TOP3[1]&&TOP3[2]">
              <div class="nav-item" v-for="(item,index) in TOP3" v-if="index>0" :key="index" @click="goDetailPath(item)">
                <div class="img"><img mode="aspectFill" :src="item.placardUrl||''" alt=""></div>
                <div class="text">{{item.theme||''}}. {{item.describes||''}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="hr"></div>
      </div>
      <div class="table-body">
        <div class="table-select">
          <div class="list" v-for="item in playerXd" :key="key"  @click="goDetailPath(item)">
            <img class="icon-left" :src="item.placardUrl" alt="">
            <div class="cont-right">
              <div class="theme">{{item.theme}}</div>
              <div>人气 {{item.viewTotal}} </div>
              <div v-if="item.isStart==1">开始结间：{{item.startTime}}</div>
              <div v-if="item.isStart==1">结束时间：{{item.endTime}}</div>
              <div v-if="item.isStart==0" class="baomover disabled" >已结束</div>
              <div v-else class="baom">火热进行中</div>
            </div>
          </div>
        </div>
        <loading v-if="isLoading"></loading>
      </div>
    </div>
    <div class="publish-wrap" @tap="publishAct">
      <img src="/static/images/publish.png" alt="">
      <view>去发布</view>
    </div>
  </div>
</template>
<script>
  import { getActivity } from  '@/server/index'
  import loading from '@/components/loading'
  import moment from 'moment'
  export default {
    components:{
      loading
    },
    data(){
      return{
        banner:"https://nie.res.netease.com/r/pic/20180620/1f73d859-6f6e-4d46-a2c5-e7716f54df31.jpg",
        TOP3:[{}],
        playerXd:[],
        hotName:"TOP",
        playListName:"投票列表",
        pageSize:10,
        page:1,
        listOver:false,
        isLoading:false
      }
    },

    mounted(){
      this.getData()
    },
    methods:{
      publishAct(){
        wx.navigateTo({
          url:"/pages/activity/publishVoting/main"
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
        getActivity({
          currentPage:this.page,
          pageSize:this.pageSize,
          search:{
            type:1
          }
        },(err,res)=>{
          if(err) return
          if( res.data && res.data.list  ){
            res.data.list.forEach(item=>{
              let startTime = moment(item['startTime']).format('MM月DD hh:mm')
              let endTime = moment(item['endTime']).format('MM月DD hh:mm')
              item['startTime'] = startTime
              item['endTime'] = endTime
            })
            if(this.page===1  ){
              if( res.data.list.length>=3 ){
                _this.TOP3 = [
                  res.data.list[0],
                  res.data.list[1],
                  res.data.list[2]
                ]
              }else{
                if( res.data.list.length===1 ){
                  _this.TOP3 = [
                    res.data.list[0]
                  ]
                }
                if( res.data.list.length===2  ){
                  _this.TOP3 = [
                    res.data.list[0],
                    res.data.list[1]
                  ]
                }
              }
            }
            if(  res.data.list.length < _this.pageSize){
              _this.isLoading=false
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
            },500)
          }
        })
      },
      lookoutImg(cur,images){
        wx.previewImage({
          current:cur,
          urls:images
        })
      },
      goDetailPath(item){
        wx.navigateTo({
          url:"/pages/activity/voting/detail/main?id="+item.id
        })
      }
    },
    onReachBottom(){
      if(this.isLoading) return
      this.getData()
    },
    onPullDownRefresh(){
      if(this.isLoading) return
      this.listOver=false
      this.page=1
      const _this = this
      getActivity({
        currentPage:1,
        pageSize:this.pageSize,
        search:{
          type:1
        }
      },(err,res)=>{
        wx.stopPullDownRefresh()
        if(err) return
        if( res.data && res.data.list  ){
          res.data.list.forEach(item=>{
            let startTime = moment(item['startTime']).format('MM月DD hh:mm')
            let endTime = moment(item['endTime']).format('MM月DD hh:mm')
            item['startTime'] = startTime
            item['endTime'] = endTime
          })
          if( res.data.list.length>=3 ){
            _this.TOP3 = [
              res.data.list[0],
              res.data.list[1],
              res.data.list[2]
            ]
          }else{
            if( res.data.list.length===1 ){
              _this.TOP3 = [
                res.data.list[0]
              ]
            }
            if( res.data.list.length===2  ){
              _this.TOP3 = [
                res.data.list[0],
                res.data.list[1]
              ]
            }
          }
          _this.playerXd = res.data.list
          _this.page+=1
          if(  res.data.list.length < _this.pageSize){
            _this.listOver=true
          }else{
            _this.listOver=false
          }
          setTimeout(()=>{_this.isLoading=false},500)
        }else{
          setTimeout(()=>{
            _this.isLoading=false
          },500)
        }
      })
    }
  }
</script>
