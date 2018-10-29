<style scoped lang="scss">
  .publish-wrap{
    position: fixed;
    width:140px;
    height:140px;
    background: #1296db;
    border-radius: 100%;
    text-align: center;
    color: #fff;
    font-size: 28px;
    z-index: 1000;
    img{
      display: block;
      width:80px;
      height: 80px;
      margin:0 auto;
    }
  }
  .publish-wrap-copy{
    position: absolute;
    width:140px;
    height:140px;
    z-index: -100;
    left:-9999px;
    top:-9999px;
  }
</style>
<template>
  <block>
    <div class="publish-wrap-copy" id="publish-wrap-copy"></div>
    <div class="publish-wrap"
         v-show="show"
         @touchstart.stop="moveStart"
         @touchmove.stop="move"
         @touchend.stop="moveEnd"
         :style="{
      left:moveStyle.left+'px',
      top:moveStyle.top+'px'
    }">
      <img src="/static/images/publish.png" alt="">
      <view>{{text}}</view>
    </div>
  </block>
</template>
<script>
  export default {
    props:{
      show:{
        type:Boolean,
        default:true
      },
      text:{
        type:String,
        default:"创建活动"
      }
    },
    data(){
      return{
        moveStyle:{
          left:0,
          top:0
        },
        moveEnbed:false,
        offset:{
          x:0,
          y:0
        },
        screenWidth:0,
        screenHeight:0,
        divWidth:0,
        divHeight:0,
        isMove:false,
      }
    },
    mounted(){
      this.initWindow()
    },
    methods:{
      initWindow(){
        const device = wx.getSystemInfoSync()
        const width = device.windowWidth
        const height = device.windowHeight
        this.screenWidth= width
        this.screenHeight = height
        const query = wx.createSelectorQuery()
        query.select('#publish-wrap-copy').boundingClientRect()
        query.exec((res)=>{
          let div = res[0]
          if(div){
            this.divWidth = div.width||0
            this.divHeight = div.height||0
            this.moveStyle.left = width - div.width-10
            this.moveStyle.top = height - div.height-10
          }else{
            this.divWidth = 0
            this.divHeight = 0
            this.moveStyle.left = width - 110
            this.moveStyle.top = height - 110
          }
        })
      },
      moveStart(e){
        this.moveAbled=true
        this.isMove=false
        let pageX= e.pageX
        let pageY= e.pageY
        let current =  e.currentTarget
        let offsetLeft =  pageX - current.offsetLeft
        let offsetTop = pageY - current.offsetTop
        this.offset.x = offsetLeft
        this.offset.y = offsetTop
      },
      move(e){
        if( !this.moveAbled ) return
        this.isMove=true
        let pageX= e.pageX
        let pageY= e.pageY
        let offx,offy
        offx= this.offset.x
        offy = this.offset.y
        let finallyX = pageX - offx
        let finallyY = pageY - offy
        if( finallyX<=10  ){ finallyX=10 }
        if( finallyY<=10 ){ finallyY =10}
        if( (finallyX + this.divWidth-offx) >= this.screenWidth-10 - this.divWidth ){ finallyX = this.screenWidth-10 - this.divWidth   }
        if( (finallyY + this.divHeight-offy) >= this.screenHeight-10 -this.divHeight  ){ finallyY = this.screenHeight-10 -this.divHeight  }
        this.moveStyle.left = finallyX
        this.moveStyle.top = finallyY
      },
      moveEnd(){
        this.moveAbled=false
        if( !this.isMove  ){
          this.$emit('tapEnd')
        }
      }
    }
  }
</script>
