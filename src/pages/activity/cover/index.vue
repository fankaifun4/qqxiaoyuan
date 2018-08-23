<style scoped lang="scss">
  .cropper-block{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  .cropper-wrapper{

  }

  .cropper-buttons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100px;
    line-height: 50px;
  }

  .cropper-buttons .upload, .cropper-buttons .getCropperImage{
    width: 50%;
    text-align: center;
  }

  .cropper{
    position: absolute;
    top: 0;
    left: 0;
  }

  .cropper-buttons{
    background-color: rgba(0, 0, 0, 0.95);
    color: #04b00f;
  }
</style>
<template>
  <div>
    <mpvue-cropper
      ref="cropper"
      :option="cropperOpt"
      @ready="cropperReady"
      @beforeDraw="cropperBeforeDraw"
      @beforeImageLoad="cropperBeforeImageLoad"
      @beforeLoad="cropperLoad"
    ></mpvue-cropper>
    <div class="cropper-buttons">
      <div
        class="upload"
        @tap="uploadTap">
        上传图片
      </div>
      <div
        class="getCropperImage"
        @tap="getCropperImage">
        生成图片
      </div>
    </div>
  </div>
</template>
<script>
  import MpvueCropper from 'mpvue-cropper'
  let wecropper

  const device = wx.getSystemInfoSync()
  const width = device.windowWidth
  const height = device.windowHeight - 50
 export  default{
   data(){
     return{
       cropperOpt: {
         id: 'cropper',
         width,
         height,
         scale: 2.5,
         zoom: 8,
         cut: {
           x: (width - 300) / 2,
           y: (height - 300) / 2,
           width: 300,
           height: 168
         }
       },
       wecropper:null,
     }
   },
   mounted(){
     wecropper = this.$refs.cropper
   },
   components: {
     MpvueCropper
   },
   methods:{
     cropperReady (...args) {
       console.log('cropper ready!')
     },
     cropperBeforeImageLoad (...args) {
       console.log('before image load')
     },
     cropperLoad (...args) {
       console.log('image loaded')
     },
     cropperBeforeDraw (...args) {
       // Todo: 绘制水印等等
     },
     uploadTap () {
       wx.chooseImage({
         count: 1, // 默认9
         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
         success: (res) => {
           const src = res.tempFilePaths[0]
           //  获取裁剪图片资源后，给data添加src属性及其值

           wecropper.pushOrigin(src)
         }
       })
     },
     getCropperImage () {
       wecropper.getCropperImage()
         .then((src) => {
           wx.setStorageSync('cutImg',src)
           wx.navigateTo({
             url:'/pages/activity/publish/main?image_cover='+src
           })
           // wx.previewImage({
           //   current: '', // 当前显示图片的http链接
           //   urls: [src] // 需要预览的图片http链接列表
           // })
         })
         .catch(e => {
           console.error('获取图片失败')
         })
     }
   }
 }
</script>
