<style lang="scss" scoped>
  .container{
    /*background: #f5f5f6;*/
  }
  .theader{
    height:300px;
    background:#c90;
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
    margin:15px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .flex-1{
      width:355px;
      .voting-item{
        overflow: hidden;
        width:100%;
        box-sizing: border-box;
        margin-bottom:30px;
        font-size: 26px;
        .avart-img{
          width: 100%;
          overflow: hidden;
        }
        .avatar{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top:10px;
          margin-bottom:10px;
          >img{
            width:60px;height:60px;
            overflow: hidden;
            margin-right:20px;
            border-radius: 30px;
          }
        }
        .describe{
          font-size: 26px;
        }
        .nus{
          .bh{
            margin-top:10px;
          }
          .ps{
            margin-top:5px;
          }
        }
        .btn-tp{
          margin-top:10px;
          text-align: right;
          color:#f90;
          font-size: 32px;
          border:1px solid #c90;
          display: inline-block;
          padding:5px 30px;
          float:right;
          background: #fff;
          &.disabled{
            color:#999;
            border:1px solid #ccc;
            color:#999;
          }
        }
      }
    }
  }
</style>
<template>
<div class="container">
  <div class="theader">
    <img  mode="aspectFill" src="http://i1.umei.cc/uploads/tu/201608/51/wb0cawp0ycx.jpg" alt="">
  </div>
  <div class="search">
    <img class="search-icon" src="/static/images/search@3x.png" alt="">
    <input type="text" class="search-input" maxlength="16" @confirm="searchVoter" confirm-type="search">
  </div>
  <div class="tab">
    <div>
      <div class="weight">参与人数</div>
      <div class="num">{{totalMan}}</div>
    </div>
    <div>
      <div class="weight">投票次数</div>
      <div class="num">{{totalNum}}</div>
    </div>
    <div>
      <div class="weight">累计访问</div>
      <div class="num">{{totalVisit}}</div>
    </div>
  </div>
  <div class="voting-list">
    <div class="flex-1">
      <div class="voting-item" v-for="(item,index) in Votes" :key="key"  v-if="index%2==0">
        <img class="avart-img" mode="widthFix" :src="item.img" alt="" @click="previmg(item.img)">
        <div class="avatar">
          <img  :src="item.avatar" alt="">
          {{item.nickname}}
        </div>
        <div class="describe">{{item.content}}</div>
        <div class="nus">
          <div class="bh">编号：{{item.code}}</div>
          <div class="ps">票数：{{item.ticks}}</div>
        </div>
        <div class="btn-tp" v-if="item.active"  @click="poll(item)">投票</div>
        <div class="btn-tp disabled" v-else>已投票</div>
      </div>
    </div>
    <div class="flex-1">
      <div class="voting-item" v-for="(item,index) in Votes" :key="key" v-if="index%2==1">
        <img class="avart-img" mode="widthFix" :src="item.img" alt="" @click="previmg(item.img)">
        <div class="avatar">
          <img  :src="item.avatar" alt="" >
          {{item.nickname}}
        </div>
        <div class="describe">{{item.content}}</div>
        <div class="nus">
          <div class="bh">编号：{{item.code}}</div>
          <div class="ps">票数：{{item.ticks}}</div>
        </div>
        <div class="btn-tp" v-if="item.active" @click="poll(item)">投票</div>
        <div class="btn-tp disabled" v-else>已投票</div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data(){
   return{
     totalMan:2000,
     totalNum:1500,
     totalVisit:2000,
     Votes: [
       {
         img:"http://i1.umei.cc/uploads/tu/201608/51/wb0cawp0ycx.jpg",
         nickname:"小羊毛",
         avatar:"http://i1.umei.cc/uploads/tu/201608/51/wb0cawp0ycx.jpg",
         content:"犹抱琵琶半遮面",
         code:12203,
         ticks:0,
         active:true
       },
       {
         img:"http://i1.umei.cc/uploads/tu/201711/9999/rn86291e0adc.jpg",
         nickname:"小羊毛",
         avatar:"http://i1.umei.cc/uploads/tu/201711/9999/rn86291e0adc.jpg",
         content:"清纯可嘉",
         code:12204,
         ticks:0,
         active:true
       },
       {
         img:"http://i1.umei.cc/uploads/tu/201711/9999/rn96a36788e6.jpg",
         nickname:"小奶牛",
         avatar:"http://i1.umei.cc/uploads/tu/201711/9999/rn96a36788e6.jpg",
         content:"滚滚红尘",
         code:12205,
         ticks:0,
         active:false
       },
       {
         img:"http://i1.umei.cc/uploads/tu/201710/10055/3b088aa3d6.jpg",
         nickname:"小白兔",
         avatar:"http://i1.umei.cc/uploads/tu/201710/10055/3b088aa3d6.jpg",
         content:"美丽俏佳人",
         code:12206,
         ticks:0,
         active:false
       },
       {
         img:"http://i1.umei.cc/uploads/tu/201710/10018/3e05788fb3.jpg",
         nickname:"小龟龟",
         avatar:"http://i1.umei.cc/uploads/tu/201710/10018/3e05788fb3.jpg",
         content:"阳光二尺，赠余处",
         code:12207,
         ticks:0,
         active:false
       }
     ]
   }
  },
  created(){

  },
  methods:{
    searchVoter(e){
      e.detail.value
    },
    poll(model){
      if( model.active ){
        model.ps+=1
        model.active=false
      }
    },
    previmg(url){
      wx.previewImage({
        current:url,
        urls:[url]
      })
    }
  }
}
</script>
