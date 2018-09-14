<style scoped lang="scss">
  .voting-list{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background: #fff;
    padding:15px;
    .flex-1{
      flex: 1;
      &:first-child{
        margin-right:20px;
      }
      .voting-item{
        overflow: hidden;
        width:100%;
        padding:20px 10px;
        box-sizing: border-box;
        margin-bottom:25px;
        font-size: 26px;
        border: 1px solid #f2f2f2;
        .avart-img{
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 1px 0 rgba(0,0,0,.1);
        }
        .theme{
          display: flex;
          align-items: center;
          font-weight: 700;
        }
        .describe{
          font-size: 26px;
        }
        >div{
          margin-top:20px;
        }
        .btn-tp{
          margin-top:10px;
          text-align: right;
          font-size: 24px;
          float:right;
        }
      }
    }
  }
</style>
<template>
  <div class="ct_w">
    <div class="ct-b">
      <div class="ct-list">
        <div class="voting-list">
          <div class="flex-1">
            <div class="voting-item" v-for="(item,index) in playerXd" :key="key"  v-if="index%2==0" @click="goDetailPath(item)">
              <img class="avart-img" mode="widthFix" :src="item.placardUrl" alt="">
              <div class="theme"> {{item.theme}}</div>
              <div class="bh" v-if="item.isStart==1">开始：{{item.startTime}}</div>
              <div class="ps"  v-if="item.isStart==1">结束：{{item.endTime}}</div>
              <div class="describe">{{item.introduction}}</div>
              <div  v-if="item.isStart==0" style="color: #aaa">活动已结束</div>
              <div class="btn-tp">人气 {{item.viewTotal}}</div>
            </div>
          </div>
          <div class="flex-1">
            <div class="voting-item" v-for="(item,index) in playerXd" :key="key" v-if="index%2==1" @click="goDetailPath(item)">
              <img class="avart-img" mode="widthFix" :src="item.placardUrl" alt="">
              <div class="theme"> {{item.title}} </div>
              <div class="bh" v-if="item.isStart==1">开始：{{item.startTime}}</div>
              <div class="ps"  v-if="item.isStart==1">结束：{{item.endTime}}</div>
              <div class="describe">{{item.introduction}}</div>
              <div  v-if="item.isStart==0" style="color: #aaa">活动已结束</div>
              <div class="btn-tp">人气 {{item.viewTotal}}</div>
            </div>
          </div>
        </div>
        <loading v-if="isLoading"></loading>
      </div>
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
        hotName:"我的参加",
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
              item['startTime'] = moment(item['startTime']).format('MM月DD hh:mm')
              item['endTime'] = moment(item['endTime']).format('MM月DD hh:mm')
            })
            if(this.page===1 && res.data.list.length>3){
              _this.TOP3 = [
                res.data.list[0],
                res.data.list[1],
                res.data.list[2]
              ]
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
    }
  }
</script>
