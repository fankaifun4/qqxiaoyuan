<style scoped lang="scss">
  .copper-shape-list{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    overflow: hidden;
    .cropper-buttons{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      justify-content: center;
      position: absolute;
      z-index: 200;
      width:100%;
      height:100px;
      bottom:0;
      left:0;
      background-color: rgba(0, 0, 0, 0.95);
    }

    .cropper-buttons .upload, .cropper-buttons .getCropperImage{
      width: 50%;
      height:100px;
      line-height: 100px;
      color:#04b00f;
      background: none;
      text-align: center;
    }
    .close-cropper{
      position: absolute;
      right: 0;
      top: 10px;
      width:60px;
      height:60px;
      color:#04b00f;
      z-index: 999;
    }
    .ctx_canvas{
      position: relative;
      width:100%;
      height: 100%;
      background: rgba(0,0,0,.5);
    }
  }
</style>
<template>
  <div class="copper-shape-list" v-show="show">
    <canvas
      class="ctx_canvas"
      v-if="_canvasId"
      :canvasId="_canvasId"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      disable-scroll
    >
      <cover-image src="https://lg-5awlljfq-1257134625.cos.ap-shanghai.myqcloud.com/close.png" class="close-cropper"  @click="closeCropper" >
      </cover-image>
      <cover-view class="cropper-buttons">
        <button
          class="upload"
          @tap="uploadTap">
          上传图片
        </button>
        <button
          class="getCropperImage"
          @tap="getCropperImage">
          完成
        </button>
      </cover-view>
    </canvas>
  </div>
</template>

<script>
  import WeCropper from '../../static/libs/mpvue-cropper/we-cropper'
  let _wecropper
  export default {
    name: 'mpvue-cropper',
    props: {
      option: {
        type: Object
      },
      show:{
        type:Boolean,
        default:false
      }
    },
    computed: {
      _canvasId () {
        return this.option.id
      },
      _width () {
        return this.option.width
      },
      _height () {
        return this.option.height
      }
    },
    methods: {
      touchstart ($event) {
        _wecropper.touchStart($event.mp)
      },
      touchmove ($event) {
        _wecropper.touchMove($event.mp)
      },
      touchend ($event) {
        _wecropper.touchEnd($event.mp)
      },
      uploadTap () {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            const photoUrl = res.tempFilePaths[0]
            //  获取裁剪图片资源后，给data添加src属性及其值
            _wecropper.pushOrign(photoUrl)
          }
        })
      },
      updateCanvas () {
        _wecropper.updateCanvas()
      },
      getCropperBase64 () {
        return new Promise((resolve, reject) => {
          _wecropper.getCropperImage(src => {
            src ? resolve(src) : reject()
          })
        })
      },
      getCropperImage () {
        // return new Promise((resolve, reject) => {
        //   _wecropper.getCropperImage(src => {
        //     src ? resolve(src) : reject()
        //   })
        // })
        wx.showLoading({
          content:"正在截取图片",
          mask:true
        })
        _wecropper.getCropperImage(src => {
          wx.hideLoading()
          if(src){
            this.$emit('getCropperImage',src)
          }else{
            this.$emit('getCropperImage',null)
          }
        })
      },
      init () {
        _wecropper = new WeCropper(Object.assign(this.option, {
          id: this._canvasId
        }))
        .on('ready', (...args) => {
          this.$emit('ready', ...args)
        })
        .on('beforeImageLoad', (...args) => {
          this.$emit('beforeImageLoad', ...args)
        })
        .on('imageLoad', (...args) => {
          this.$emit('imageLoad', ...args)
        })
        .on('beforeDraw', (...args) => {
          this.$emit('beforeDraw', ...args)
        })
        .updateCanvas()
      },
      closeCropper(){
        this.$emit('closeCropper')
      }
    },
    onLoad () {
      if (!this.option) {
        return console.warn('[mpvue-cropper] 请传入option参数\n参数配置见文档：https://we-plugin.github.io/we-cropper/#/api')
      }
      this.init()

    }
  }
</script>
