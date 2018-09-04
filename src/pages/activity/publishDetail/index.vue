<style scoped lang="scss">
  .container{
    padding:20px 30px;
    background: #fff;
  }
  .detail-wrap{
    .column-items{
      position: relative;
      .up,.down,.discard{
        position: absolute;
        width:60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        background: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 28px;
        z-index: 9999;
      }
      .up{
        top:30px;
        right: 60px;
      }
      .down{
        bottom:80px;
        right: 60px;
      }
      .discard{
        bottom:80px;
        left: 60px;
      }
    }
    .detail-list{
      border:1px solid #ccc;
      border-radius: 3px;
      width:600px;
      height:337px;
      margin:0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      img.add{
        width:60px;
        height: 60px;
      }
      img.cover{
        width:100%;
        height: 100%;
      }
      .detail-list-cont{
        width:100%;
        height: 100%;
      }
    }
    .add{
      width:40px;
      height:40px;
      border-radius: 50%;
      margin:10px auto;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .choose-type{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    .shap{
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: rgba(0,0,0,.5);
      z-index: 200;
    }
    .cont{
      position: absolute;
      width: 100%;
      height:200px;
      left: 0;
      bottom: 0;
      background:#fff;
      z-index: 300;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .addType{
        padding:20px 0;
        color:orange
      }
    }
  }
.prev-wrap{
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-bottom:2px solid #f5f5f6;
  margin-bottom:10px;
  .btn{
    height: 80px;
    padding:0 30px;
    width:150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .prev{
    background:#f90;
    color:#fff;
    margin-right: 50px;
  }
  .publish{
    color:#fff;
    background:#090;
  }
}
</style>
<template>
  <div class="container">
      <div class="prev-wrap">
        <div class="btn prev" @click="prevPublish">预览</div>
        <div class="btn publish" @click="publishAct">发布</div>
      </div>
      <div class="detail-wrap">
          <div class="add" @click="addDetailFirstType(0)">
            <img src="/static/images/public.png" alt="">
          </div>
          <div v-for="(item,index) in formDetail" :key="index"  class="column-items">
            <div class="up" @click="mvUp(item,index)">上</div>
            <div class="down" @click="mvDown(item,index)">下</div>
            <div class="discard" @click="deleteItem(item,index)">删</div>
            <div v-if="item.type=='image'" class="detail-list" @click="chooseImage(item.id)">
              <img :src="item.cont" alt="" class="cover" v-if="item.cont">
              <img src="/static/images/public2.png" alt="" class="add" v-else>
            </div>
            <div v-else class="detail-list" @click="chooseText(item.id,item.cont)">
              <div v-if="item.cont==''">点击添加文字</div>
              <div v-if="item.cont!=''" class="detail-list-cont">{{item.cont}}</div>
            </div>
            <div class="add" @click="addDetailType(index)">
              <img src="/static/images/public.png" alt="">
            </div>
          </div>

      </div>
      <div class="choose-type" v-if="chooseType">
        <div class="shap" @click="cancel"></div>
        <div class="cont">
          <div  class="addType" @click="addPick">添加单图</div>
          <div  class="addType" @click="addText">添加文本</div>
        </div>
      </div>
      <detail-text
        :isopen="openShap"
        :detailtext="detailCont"
        :tid="textId"
        @change="changeText"
        @cancel="cancelText"></detail-text>
  </div>
</template>
<script>
  import uploadFile from '../../../utils/upload'
  import detailText from '../../../components/detailText'
  import {publisDetail} from '../../../server/index'
  export default{
    components:{
      detailText
    },
    data(){
      return{
        formDetail:[],
        chooseType:false,
        insertIndex:0,
        image_cover:"",
        picId:0,
        openShap:false,
        detailCont:"",
        detailStep1:null,
        detailCompleted:null,
        textId:null
      }
    },
    onLoad(option){
      this.image_cover = option.image_cover||''
      this.picId = option.id||0
      this.text = option.text||''
      this.formDetail.forEach(item=>{
        if( item.id === this.picId){
          item.cont = this.image_cover
        }
      })
    },
    mounted(){
      this.detailStep1 = wx.getStorageSync('detailStep1')
    },
    methods:{
      prevPublish(){
        let isEmpty=false
        if(this.formDetail.length<1){
          wx.showToast({
            icon:"none",
            title:"请添加图文详情"
          })
          return
        }
        this.formDetail.forEach(item=>{
          if(item.cont==''){
            isEmpty = true
          }
        })
        if(isEmpty){
          wx.showToast({
            icon:"none",
            mask:true,
            title:"有空详情未填写"
          })
          return
        }
        if(this.formDetail.length>0){
          this.detailCompleted={
            info:this.detailStep1,
            detail:this.formDetail
          }
          wx.setStorageSync('detailCompleted',this.detailCompleted)
          wx.navigateTo({
            url:'/pages/activity/prevAct/main'
          })
        }
      },
      addDetailFirstType(){
        this.insertIndex=0
        let isEmpty=false
        if(this.formDetail.length){
          this.formDetail.forEach(item=>{
            if(item.cont==''){
              isEmpty = true
            }
          })
          wx.showToast({
            icon:"none",
            mask:true,
            title:"有空详情未填写"
          })

        }else{
          this.chooseType=true
        }
      },
      addDetailType(index){
        this.insertIndex=index+1
        let isEmpty=false
        this.formDetail.forEach(item=>{
          if(item.cont==''){
            isEmpty = true
          }
        })
        if(isEmpty){
          wx.showToast({
            icon:"none",
            mask:true,
            title:"有空详情未填写"
          })
          return
        }
        this.chooseType=true
      },
      cancel(){
        this.chooseType=false
      },
      cancelText(){
        this.openShap=false
      },
      addPick(){
        let id = (new Date().getTime()).toString(16)
        this.formDetail.splice( this.insertIndex,0,{
          type:"image",
          cont:"",
          id
        })
        this.cancel()
      },
      addText(){
        let id = (new Date().getTime()).toString(16)
        this.formDetail.splice( this.insertIndex,0,{
          type:"text",
          cont:"",
          id
        })
        this.cancel()
      },
      chooseImage(id){
        wx.navigateTo({
          url:"/pages/activity/detailCover/main?id="+id
        })
      },
      chooseText(id,cont){
        this.openShap=true
        this.detailCont = cont
        this.textId = id
      },
      changeText(options){
        let id = options.id
        let text = options.text
        this.formDetail.forEach(item=>{
          if(item.id === id){
            item.cont = text
          }
        })
        this.openShap=false
      },
      deleteItem(model,index){
        if(model.id === this.formDetail[index].id){
          this.formDetail.splice(index,1)
        }
      },
      mvUp(model,index){
        if(index>0){
          this.formDetail.splice(index,1)
          this.formDetail.splice(index-1,0,model)
        }
      },
      mvDown(model,index){
        if(index<this.formDetail.length-1){
          this.formDetail.splice(index,1)
          this.formDetail.splice(index+1,0,model)
        }
      },
      publishAct(){
        let isEmpty=false
        const _this=this
        if(this.formDetail.length<1){
          wx.showToast({
            icon:"none",
            title:"请添加图文详情"
          })
          return
        }
        this.formDetail.forEach(item=>{
          if(item.cont==''){
            isEmpty = true
          }
        })
        if(isEmpty){
          wx.showToast({
            icon:"none",
            mask:true,
            title:"有空详情未填写"
          })
          return
        }
        //初始化上传控件
        let uploadImage = uploadFile()
        //图片总数
        let totalImg = 0
        //递归开始的出始下标
        let start = 0
        //如果数据类型为image 则 图片总数加一
        this.formDetail.forEach(item=>{
          if(item.type=='image'){
            totalImg+=1
          }
        })
        /**
         *
         * @param index 数据下标
         */

        // uploadImage(this.formDetail[0].cont,function(res,loca){
        //   console.log(res)
        // })
        // return
        let diguiUpload = (index)=>{
          if(index>this.formDetail.length-1) {
            next()
            return
          }
          start+=1
          if( this.formDetail[index] && this.formDetail[index].type=='image'
            && this.formDetail[index].cont.indexOf('test-1251126190')<0 ){
            let filePath = this.formDetail[index].cont
            uploadImage(filePath,function(res,localtion){
              if(res.statusCode==200){
                _this.formDetail[index].cont = localtion
                diguiUpload(start)
              }else{
                wx.showModal({
                  icon:'none',
                  content:'第'+(index+1)+'张上传失败',
                  mask:true
                })
                diguiUpload(start)
              }
            },function(progress){
              let percent = progress.progress
              wx.showToast({
                icon:'none',
                title:percent+"%"+'第'+(index+1)+'/'+totalImg+'张',
                mask:true
              })
            })
          }else{
            diguiUpload(start)
          }
        }

        let next=()=>{
          this.detailStep1.introduction = JSON.stringify(this.formDetail)
          publisDetail(this.detailStep1,(er,res)=>{
              console.log(res)
          })
         }

        if(this.detailStep1.placardUrl&&this.detailStep1.placardUrl.indexOf('test-1251126190')<0){
          uploadImage(this.detailStep1.placardUrl,function(res,local){
            if(res.statusCode==200){
              _this.detailStep1.placardUrl = local
              if( _this.formDetail.length>0 ){
                diguiUpload(start)
              }
            }else{
              wx.showModal({
                icon:'none',
                content:'海报上传失败,请检查网络',
                mask:true
              })
            }
          },function(process){
            let percent = process.progress
            wx.showToast({
              icon:'none',
              title:percent+"%"+' 海报',
              mask:true
            })
          })
        }else{
          if( _this.formDetail.length>0 ){
            diguiUpload(start)
          }
        }
      }
    }
  }
</script>
