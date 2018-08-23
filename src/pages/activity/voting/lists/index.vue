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
    padding:15rpx;
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
  .nav-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:20rpx;
    .nav-item{
      flex: 1;
      position: relative;
      .img{
        width:100%;
        height:150rpx;
        border-radius: 8rpx;
        overflow: hidden;
        >img{
          border-radius: 8rpx;
          overflow: hidden;
          width:100%;
          height: 100%;
        }
      }
      .text{
        margin-top:15rpx;
        font-size: 26rpx;
        text-align: center;
      }

      &:first-child{
        margin-right: 10rpx;
      }
    }
  }
  .task-titles{
    margin-bottom:15rpx;
  }
  .task-show-img{
    display: flex;
    justify-content: space-between;
    align-items: center;

    box-sizing: border-box;
    .flex1{
      flex: 1 !important;
    }
    .lg-left{
      flex:.6;
      height:300rpx;
      img{
        width:100%;
        height:100%;
      }
    }
    .lg-right{
      flex:.38;
      height:300rpx;
      .height-cover{
        overflow: hidden;
        height:300rpx !important;
        >img{
          width:100%;
          height:100%;
        }
      }
      .img-r{
        overflow: hidden;
        height:145rpx;
        &:first-child{
          margin-bottom:10rpx;
        }
        >img{
          width:100%;
          height:100%;
        }
      }
    }
  }
</style>
<template>
  <div class="ct_w">
    <div class="ct-b">
      <div class="ct-list">
        <div class="ct-list-header">
          <img mode="aspectFit" class="icon" src="/static/images/jingxuan.png" alt=""> {{ hotName }}
        </div>
        <div class="nav-wrap">
          <div class="nav-top">
            <div class="top1" @click="goDetailPath(TOP3[0])">
                <div class="img"><img mode="aspectFill" :src="TOP3[0].img" alt=""></div>
                <div class="text">{{TOP3[0].name}}. {{ TOP3[0].cont}}</div>
            </div>
            <div class="top23">
              <div class="nav-item" v-for="(item,index) in TOP3" v-if="index>0" :key="index" @click="goDetailPath(item)">
                <div class="img"><img mode="aspectFill" :src="item.img" alt=""></div>
                <div class="text">{{item.name}}. {{item.cont}}</div>
              </div>
            </div>
          </div>
          <div class="nav-list">
            <div class="nav-item" v-for="(item,index) in playList" :key="index" @click="goDetailPath(item)">
              <div class="img"><img mode="aspectFill" :src="item.img" alt=""></div>
              <div class="text">{{item.name}} </div>
            </div>
          </div>
        </div>
        <div class="hr"></div>
      </div>
      <div class="ct-list">
        <div class="ct-list-header">
          <img mode="aspectFit" class="icon" src="/static/images/remen.png" alt=""> {{ playListName }}
        </div>
        <div class="list-body"  v-for="(item,index) in playerXd" :key="index" >
          <div class="list-body-title">
            来自：{{item.name}}
          </div>
          <div class="list-body-items">
            <div class="task-titles ts-d" @click="goDetailPath(item)">{{item.title}}</div>
            <div class="task-show-img" >
              <div class="lg-left" :class="{flex1:item.img.length<2}" @click="lookoutImg(item.img[0],item.img)">
                <img mode="aspectFill" :src="item.img[0]" alt="">
              </div>
              <div class="lg-right" v-if="item.img.length>1">
                <div class="img-r" :class="{'height-cover':item.img.length==2}" v-if="item.img.length>1"   @click="lookoutImg(item.img[1],item.img)" ><img  mode="aspectFill" :src="item.img[1]" alt=""></div>
                <div class="img-r" v-if="item.img.length>2"  @click="lookoutImg(item.img[2],item.img)"><img  mode="aspectFill" :src="item.img[2]" alt=""  ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    components:{
    },
    data(){
      return{
        banner:"https://nie.res.netease.com/r/pic/20180620/1f73d859-6f6e-4d46-a2c5-e7716f54df31.jpg",
        TOP3:[
          {
            name:"No1",
            cont:"某某名校校花评选活动",
            img:"http://i2.hdslb.com/bfs/archive/30f2433d928bc097f89e364fa4b8616c60f3118e.jpg",
            path:'taskList/main',
            _type:1,
            id:1
          },
          {
            name:"No2",
            cont:"某某名校校草评选活动",
            img:"http://img.19yxw.com/wy/update/20170526/201705265979.jpg",
            path:'strategy/main',
            _type:2,
            id:2
          },
          {
            name:"No3",
            cont:"某某名校彩灯评选活动",
            img:"http://upload.news.cecb2b.com/2016/1206/1480996884981.jpg",
            path:'strategy/main',
            _type:3,
            id:3
          }
        ],
        playerXd:[
          {
            name:"湖南大学",
            title:"湘江之礼指点江山",
            _id:"11",
            _type:1,
            img:[
              "http://i0.sinaimg.cn/edu/photo/idx/2015/0512/U5539P42T240D1F7429DT20150512191858.jpg",
              "http://img8.zol.com.cn/bbs/upload/23975/23974357.jpg",
              "http://img0.imgtn.bdimg.com/it/u=1688399745,463901109&fm=214&gp=0.jpg",
            ]
          },
          {
            name:"湖北大学",
            title:"哎哟那个春风吹",
            _id:"12",
            _type:1,
            img:[
              "http://www.js.taiwan.cn/special/jidi/sj/xz/201701/W020170122529556333113.jpg",
              "http://youimg1.c-ctrip.com/target/fd/tg/g1/M02/82/83/CghzfVTTAbiAYEOXAAHKiEQdEiE236.jpg",
              "http://img0.vccoo.com/art/201709/20/089ma801.jpg",
              "http://img002.hc360.cn/hb/KRm5e1b40105e5D89AC9eDD4eb518657C16.jpg",
              "http://www.hscbw.com/upfile/allimg/171104/1ITV436-0.jpg"
            ]
          }
        ],
        hotName:"TOP3",
        playListName:"投票列表"
      }
    },
    create(){

    },
    mounted(){

    },
    methods:{
      lookoutImg(cur,images){
        wx.previewImage({
          current:cur,
          urls:images
        })
      },
      goDetailPath(item){
        wx.navigateTo({
          url:"/pages/activity/voting/detail/main?type="+item._type + '&id='+item.id
        })
      }
    }
  }
</script>
