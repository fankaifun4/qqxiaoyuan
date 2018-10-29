<style lang="scss" scoped>
  .copper-shape-list{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    overflow: hidden;
  }

  .form-group{
    .form-data{
      label{
        margin-bottom:15px;
        display: block;
      }
      padding:15px;
      input{
        height:80px;
        width:100%;
        border:1px solid #ccc;
        padding:15px;
        box-sizing: border-box;
        line-height: 80px;
      }
      textarea{
        width:100%;
        height:200px;
        border:1px solid #ccc;
        padding:15px;
        box-sizing: border-box;
      }
    }
    .next{
      background:rgb(50,135,244);
      color:#fff;
    }
    .avatar{
      width:300px;
      min-height: 360px;
      margin:15px;
      &.no-img{
        background:#efefef url("https://i.loli.net/2018/09/03/5b8cc2658b23b.png") center no-repeat;
        background-size: 160px 160px;
      }
      img{
        width:300px;
        height:360px;
      }
      .cover{
        width:100%;
        height: 100%;
      }
    }
  }
</style>
<template>
<div>
  <form @submit="formSubmit" class="form-group">
    <div  class="avatar form-data" :class="{'no-img':!photoUrl}" @click="setListImgs()">
        <img v-if="photoUrl" :src="photoUrl" alt="">
        <input type="hidden" name="photoUrl" :value="photoUrl" style="display: none">
    </div>
    <div class="form-data"><label for=""><text style="color: red"> * </text>标题或昵称</label>
      <input name="title" type="text" maxlength="20" :model="title" placeholder="请填写标题或者昵称(20字以内)">
    </div>
    <div  class="form-data"><label for="">拉票描述</label>
      <textarea name="describes" maxlength="100" id="" cols="30" rows="10" :model="describes" placeholder="添加描述可吸引更多投票(100字以内)"></textarea>
    </div>
    <div  class="form-data">
      <button formType="submit" class="next">报名</button>
    </div>
  </form>
  <mpvue-cropper
    :show="openCropper"
    ref="cropper"
    :option="cropperOpt"
    @closeCropper="closeCropper"
    @getCropperImage="getCropperImage"
  ></mpvue-cropper>
</div>
</template>
<script>
import uploadFile from '../../utils/upload'
import {activityJoin} from '../../server/index'
import MpvueCropper from '../../components/mpvue-cropper'
let wecropper
const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight-100
export default {
  components:{
    MpvueCropper
  },
  data(){
    return{
      userInfo:null,
      id:null,
      cropperOpt: {
        id: 'cropper',
        scale: 2.5,
        zoom: 8,
        cut: {
          x: (width - 300) / 2,
          y: (height - 360) / 2,
          width: 300,
          height: 360
        }
      },
      openCropper:false,
      uploadImage:null,
      photoUrl:"",
      title:"",
      describes:""
    }
  },
  onLoad(options){
    this.id = options.id
  },
  mounted(){
    wecropper = this.$refs.cropper
    this.uploadImage = uploadFile()
    let userInfo = wx.getStorageSync('userInfo')
    this.userInfo = userInfo
  },
  methods:{
    Ept(val){
      return val.replace(/^\s+|\s+$/ig,'')
    },
    setListImgs(){
      if(this.openCropper)return
      this.openCropper=true
    },
    getCropperImage(photoUrl) {
      if( photoUrl )
        this.photoUrl = photoUrl
      else
        this.showToast('none','图片获取失败')
      this.openCropper=false
    },
    closeCropper(){
      this.openCropper = false
    },
    uploadCover(callback){
      let Cover = this.photoUrl
      const _this=this
      if(!_this.uploadImage) return
      if(Cover.indexOf('test-1251126190')<0){
        _this.uploadImage(Cover,function(res,localtion){
          if(res.statusCode==200){
            _this.photoUrl = localtion
            callback&&callback(localtion)
          }else{
            _this.showToast('none','图面上传失败,请重试')
          }
        },function(progress){
          let percent = progress.progress
          _this.showToast('none','正在上传图片 '+percent+"%")
        })
      }
    },
    formSubmit(e){
      let _this=this
      let formdata = e.target.value
      formdata.activityId=_this.id
      if(this.Ept(formdata.title)==''){
        _this.showToast('none','标题或者昵称不能为空')
        return
      }
      wx.showLoading({
        mask:true
      })
      this.uploadCover(url=>{
        formdata.photoUrl = url
        activityJoin(formdata,(er,res)=>{
          wx.hideLoading()
          if(er) {
            _this.showToast('none',er)
            return
          }
          if(res && res.data){
            wx.showModal({
              content:res.data.msg,
              showCancel:false,
              success(motai){
                if(motai.confirm){
                  if(res.data.code==200){
                    wx.navigateBack({
                      delta: 1
                    })
                  }
                }
              }
            })
          }
        })
      })
    },
    showToast(icon,title){
      wx.showToast({
        icon:icon,
        title,
        mask:true
      })
    }
  }
}
</script>
