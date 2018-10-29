<style lang="scss" scoped>
  .setting-header{
    height:80px;
    line-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >div{
      width: 33.33%;
      height: 100%;
      text-align: center;
      box-sizing: border-box;
      &:first-child{
        border-right: 1px solid #ccc;
      }
      &:nth-child(2){
        border-right: 1px solid #ccc;
      }
      &.active{
        background:rgb(50,135,244);
        color:#fff;
      }
    }
  }
  .setting-cont{

  }
  .hr{
    height:20px;
    background:#f5f5f6;
  }
  .pic_log{
    width:750px;
    height:422px;
    position: relative;
    &.no-img{
      background:#efefef url("https://i.loli.net/2018/09/03/5b8cc2658b23b.png") center no-repeat;
      background-size: 160px 160px;
    }
    .addpic{
      position: absolute;
      width: 122px;
      height: 120px;
      margin: auto;
      left: 0px;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1;
    }
    .cover{
      position: absolute;
      width:100%;
      height: 100%;
      z-index: 2;
    }
  }
  .form-group{
    background: #fff;
    margin-top:20px;
    padding:15px 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    label{
      padding-right: 15px;
      width:150px;
    }
    .form-input{
      height: 35px;
      flex: 1;
    }
    .time-date{
      margin-right: 20px;
    }
    .address-name{
      margin-left: 165px;
    }
    .detail{
      border:1px solid #c9c9c9;
      width:100%;
      height: 300px;
      margin-top:15px;
      box-sizing: border-box;
      padding: 20px;
      border-radius: 10px;
    }
    .next{
      width:100%;
      background:rgb(50,135,244);
      color:#fff;
    }
  }
  .add-v-l-w{
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 20px 20px 40px 20px;
    border-bottom: 1px solid #efefef;
    transition: all .2s;
    .add-l-cover{
      margin-top:50px;
      width:200px;
      height:240px;
      margin-right:15px;
      &.no-img{
        background:#efefef url("https://i.loli.net/2018/09/03/5b8cc2658b23b.png") center no-repeat;
        background-size: 81px 81px;
      }
      >img{
        width:200px;
        height:240px;
      }
    }
    .add-l-right{
      flex: 1;
      min-height: 240px;
      box-sizing: border-box;
      font-size: 28px;
      padding:40px 70px 15px 0px;
      color: #333;
      position: relative;
      >div{
        margin-bottom:10px;
      }
      .itemNo{

      }
      .title{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        >input{
          display: block;
          height:25px;
          border-bottom:1px solid #ccc;
          flex: 1;
          padding-left:10px;
        }
      }
      .detail{
        border:1px solid #ccc;
        min-height:80px;
        padding:4px;
        box-sizing: border-box;
        border-radius: 10px;
        color:#999;
      }
      .delete{
        position:absolute;
        background-image: url("https://lg-5awlljfq-1257134625.cos.ap-shanghai.myqcloud.com/delete.png");
        width:40px;
        height: 40px;
        background-size: 100% 100%;
        top:0;
        right: 0;
      }
      .uper{
        position:absolute;
        background-image: url("https://lg-5awlljfq-1257134625.cos.ap-shanghai.myqcloud.com/uper.png");
        width:40px;
        height: 40px;
        background-size: 100% 100%;
        top:100px;
        right: 0;
      }
      .down{
        position:absolute;
        background-image: url("https://lg-5awlljfq-1257134625.cos.ap-shanghai.myqcloud.com/down.png");
        width:40px;
        height: 40px;
        background-size: 100% 100%;
        top:200px;
        right: 0;
      }
    }
  }
  .add-v-l-act{
    width:260px;
    height:80px;
    border-radius: 5px;
    margin:10px auto;
    color:#333;
    text-align: center;
    line-height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width:60px;
      height: 60px;
      margin-left: 10px;
    }
  }
  .super-form{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left:20px;
    margin-right: 20px;
    padding:20px 0;
    border-bottom:1px solid #ccc;
    >label{
      font-size: 30px;
      color:#333;
    }
    >div{
      color:#999;
      font-size: 26px;
      >span{
        padding-right:20px;
      }
    }
    .super-input{
      width:100px;
    }
  }
  .init-data{
    font-size: 40px;
    color: #ccc;
    width:100%;
    min-height:600px;
    line-height: 600px;
    text-align: center;
  }

</style>
<template>
<div class="container">
  <div class="setting-header">
    <div  :class="{active:settingSelect==1}"  @click="selectSetting(1)">主题设置</div>
    <div  :class="{active:settingSelect==2}"  @click="selectSetting(2)">投票选项</div>
    <div  :class="{active:settingSelect==3}"  @click="selectSetting(3)">高级设置</div>
  </div>
  <div class="hr"></div>
  <div class="init-data" v-if="initShow">正在加载...</div>
  <div class="setting-cont" v-else  >
    <div class=""  v-if="settingSelect==1">
      <div class="base-info">
        <div class="avart"></div>
        <div>
          <div class="pic_log"  @click="addImagePrev" :class="{'no-img':!base.placardUrl}" >
            <img mode="aspectFill" v-if="base.placardUrl" class="cover" :src="base.placardUrl" alt="">
          </div>
          <div class="form-group" >
            <label >活动标题</label>
            <input type="text" maxlength="20" class="form-input" placeholder="不超过20字" v-model="base.theme">
          </div>
          <div class="form-group">
            <label >主办方</label>
            <div>{{userInfo.nickName}}</div>
          </div>
          <div class="form-group" >
            <label >联系方式</label>
            <input type="number" maxlength="30" class="form-input" placeholder="请输入主办方的联系方式" v-model="base.contactInformation">
          </div>
          <div  class="form-group">
            <label>开始时间</label>
            <picker mode="date" class="time-date" value="startDate" :start="now"  @change="bindStartDateChange">
              <view class="picker">{{startDate}}</view>
            </picker>
            <picker mode="time" value="startTime" start="00:00" end="23:59" @change="bindStartTimeChange">
              <view class="picker">{{startTime}}</view>
            </picker>
          </div>
          <div class="form-group">
            <label >结束时间</label>
            <picker mode="date"  class="time-date" value="endDate" :start="now"  @change="bindEndDateChange">
              <view class="picker">{{endDate}}</view>
            </picker>
            <picker mode="time" value="endTime" start="00:00" end="23:59" @change="bindEndTimeChange">
              <view class="picker">{{endTime}}</view>
            </picker>
          </div>
          <div class="form-group">
            <label>活动详情</label>
            <div @click="addBaseDiscribe" :class="{black:base.introduction.length>0}">{{base.introduction||'请输入详情描述'}}</div>
          </div>
          <div class="form-group">
            <button class="next" @click="publishActNext">下一步</button>
          </div>
        </div>
      </div>
    </div>
    <div class=""  v-if="settingSelect==2">
      <div >
        <div class="add-v-l-w"  v-for="(item,index) in list" :key="key">
          <div class="add-l-cover" :class="{'no-img':!item.photoUrl}" @click="setListImgs(item)">
            <img v-if="item.photoUrl" :src="item.photoUrl" alt="">
          </div>
          <div class="add-l-right">
            <div class="itemNo">编号：{{item.itemNo}}</div>
            <div class="title">标题：<input type="text" v-model="item.title" placeholder="请填写标题"></div>
            <div class="title">初始票数：<input type="text" v-model="item.totalNumber" placeholder="初始票数"></div>
            <div class="detail" @click="addListText(item)" :class="{black:item.describes.length>0}">{{item.describes==''?'填写介绍能增加朋友的投票热情哦':item.describes}}</div>
            <div class="delete" @click="deleteSetting(index)"></div>
            <div class="uper" @click="uperList(item,index)" v-if="index>0"></div>
            <div class="down" @click="downList(item,index)" v-if="index<list.length-1"></div>
          </div>
        </div>
        <div class="add-v-l-act" @click="addSettingList()">新增选项 <img src="/static/images/public2.png" alt=""> </div>
        <div class="form-group">
          <button class="next" @click="publishSuperNext">下一步</button>
        </div>
      </div>
    </div>
    <div class=""  v-if="settingSelect==3">
      <div class="super-form">
        <label for="">用户投票次数</label>
        <input type="number" class="super-input" v-model="info.limitTotal" placeholder="不限制">
      </div>
      <div class="super-form">
        <label for="">用户每天投票次数</label>
        <input type="number" class="super-input" v-model="info.limitDay" placeholder="不限制">
      </div>
      <div class="super-form">
        <label for="">允许重复投票</label>
        <div>
          <span>{{info.repeat?'允许':'不允许'}}</span>
          <switch color="rgb(50,135,244)" :checked="info.isRepeat" @change="repeat"/>
        </div>
      </div>
      <div class="super-form">
        <label for="">票数显示</label>
        <div>
          <span>{{ info.displayBallot?'开启':'关闭' }}</span>
          <switch color="rgb(50,135,244)" :checked="info.displayBallot" @change="displayBallot"/>
        </div>
      </div>
      <div class="super-form">
        <label for="">投票结果</label>
        <div>
          <span>{{ info.displayResult?'开启':'关闭' }}</span>
          <switch color="rgb(50,135,244)" :checked="info.displayResult" @change="votingResult"/>
        </div>

      </div>
      <div class="super-form">
        <label for="">支持用户报名</label>
        <div>
          <span>{{ info.userCreate?'支持':'不支持' }}</span>
          <switch color="rgb(50,135,244)" :checked="info.userCreate" @change="supportEnroll"/>
        </div>
      </div>

      <div class="form-group">
        <button class="next" style="background:#c90915" @click="pause">暂停活动</button>
      </div>
      <div class="form-group">
        <button class="next" style="background:orange" @click="start">开始活动</button>
      </div>
      <div class="form-group">
        <button class="next" @click="validate">确定发布</button>
      </div>
    </div>
  </div>
  <detail-text
    :isopen="detailSetting.openShap"
    :detailtext="detailSetting.detail"
    :tid="detailSetting.itemNo"
    @change="changeText"
    @cancel="cancelText">
  </detail-text>
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
  import moment from 'moment'
  import detailText from '../../../components/detailText'
  import {activityDetail,activityCreate,activityStart,activityStop} from '../../../server/index'
  import uploadFile from '../../../utils/upload'
  import MpvueCropper from '../../../components/mpvue-cropper'
  let wecropper
  const device = wx.getSystemInfoSync()
  const width = device.windowWidth
  const height = device.windowHeight-100
  export default {
    components:{
      detailText,
      MpvueCropper
    },
    data(){
      return {
        initShow:true,
        cropperOpt: {
          id: 'cropper',
          scale: 2.5,
          zoom: 8,
          cut: {
            x: (width - 300) / 2,
            y: (height - 300) / 2,
            width: 300,
            height: 300
          }
        },
        openCropper:false,
        listsImgID:null,
        settingSelect:1,
        //开始时间
        startDate: moment().format('YYYY-MM-DD'),
        startTime: '08:00',
        //结束时间
        endDate: moment().format('YYYY-MM-DD'),
        endTime: '22:00',
        //用户信息
        userInfo:{},
        base:{
          //主题
          theme:"",
          //类型，投票传1
          type:1,
          //海报url
          placardUrl:"",
          //详情描述
          introduction:"",
          //开始时间
          startTime:"",
          //结束时间
          endTime:"",
          //联系方式
          contactInformation:"",
        },
        //投票详情
        list:[{
          //图片地址
          photoUrl:"",
          //编号
          itemNo:101,
          //标题
          title:"",
          //描述
          describes:"",
          //初始票书
          totalNumber:0
        }],
        info:{
          //用户投票次数
          limitTotal:'',
          //每天允许投几次
          limitDay:3,
          //是否能重复投票
          isRepeat:1,
          //是否显示票数
          displayBallot:1,
          //是否显示结果
          displayResult:1,
          //是否能报名
          userCreate:0
        },
        detailSetting:{
          openShap:false,
          //详情
          detail:"",
          //编号
          itemNo:101
        },
        sotreCode:101,
        uploadImage:null,
        ID:null,
        isPause:false,
        isPublish:true
      }
    },
    mounted(){
      wecropper = this.$refs.cropper
      this.uploadImage = uploadFile()
      let userInfo = wx.getStorageSync('userInfo')
      this.userInfo = userInfo
    },
    methods:{
      pause(){
        const _this = this
        wx.showModal({
          content:"确定要暂停活动吗？",
          success(res){
            if (res.confirm) {
              _this.isPublish = false
              _this.isPause = true
              _this.validate()
            }
          }
        })
      },
      start(){
        const _this = this
        wx.showModal({
          content:"确定要启动活动吗？",
          success(res){
            if (res.confirm) {
              _this.isPublish = false
              _this.isPause = false
              _this.validate('start')
            }
          }
        })
      },
      Ept(val){
        return val.replace(/^\s+|\s+$/ig,'')
      },
      setListImgs(model){
        if(this.openCropper)return
        this.listsImgID = model.itemNo
        wecropper.option.cut.width = 300
        wecropper.option.cut.height = 360
        wecropper.init()
        this.openCropper=true
      },
      addImagePrev(){
        if(this.openCropper) return
        this.listsImgID=null
        wecropper.option.cut.width = 300
        wecropper.option.cut.height = 168
        wecropper.init()
        this.openCropper=true
      },
      selectSetting(index){
        this.settingSelect=index
      },
      bindStartDateChange(e){
        this.startDate =  e.target.value
      },
      bindStartTimeChange(e){
        this.startTime =  e.target.value
      },
      bindEndDateChange(e){
        this.endDate =  e.target.value
      },
      bindEndTimeChange(e){
        this.endTime =  e.target.value
      },
      addBaseDiscribe(){
        this.detailSetting.detail =this.base.introduction
        this.detailSetting.itemNo = 'detail'
        this.detailSetting.openShap=true
      },
      deleteSetting(index){
        if( this.list.length<3 ){
          wx.showToast({
            'icon':'none',
            'title':'投票选项不能少于2个'
          })
          return;
        }
        this.list.splice(index,1)
      },
      uperList(model,index){
          this.list.splice(index,1)
          setTimeout(()=>{
            this.list.splice(index-1,0,model)
          },200)
      },
      downList(model,index){
        this.list.splice(index,1)
        setTimeout(()=>{
          this.list.splice(index+1,0,model)
        },200)
      },
      addSettingList(){
        this.sotreCode+=1
        let itemNo =  this.sotreCode
        let model={
          photoUrl:"",
          itemNo:itemNo,
          title:"",
          describes:"",
          totalNumber:0
        }
        this.list.push(model)
      },
      addListText( model ){
        this.detailSetting.openShap=true
        this.detailSetting.itemNo=model.itemNo
        this.detailSetting.detail=model.describes
      },
      cancelText(){
        this.detailSetting.openShap=false
      },
      changeText(model){
        let itemNo = model.id
        let describes = model.text
        if(itemNo==='detail'){
          this.base.introduction = describes
        }else{
          this.list.forEach(item=>{
            if(item.itemNo===itemNo){
              item.describes = describes
            }
          })
        }
        this.detailSetting.itemNo=null
        this.detailSetting.detail=''
        this.detailSetting.openShap=false
      },
      publishActNext(){
        this.settingSelect=2
      },
      publishSuperNext(){
        this.settingSelect=3
      },
      repeat(e){
        let val = e.target.value?1:0
        this.info.isRepeat = val
      },
      displayBallot(e){
        let val = e.target.value?1:0
        this.info.displayBallot=val
      },
      votingResult(e){
        let val = e.target.value?1:0
        this.info.displayResult =val
      },
      supportEnroll(e){
        let val = e.target.value?1:0
        this.info.userCreate = val
      },
      validate(){
        const base = this.base
        const list = this.list
        const info = this.info
        //开始时间
        base.startTime = this.startDate+' '+this.startTime+":00"
        //结束时间
        base.endTime = this.endDate+' '+this.endTime+":00"

        let seartDate = this.getTime( base.startTime )
        let endDate = this.getTime( base.endTime )
        let phoneReg=/^[1][3,4,5,7,8][0-9]{9}$/;

        if( !base.placardUrl){
          this.showToast('none','请在主题设置选择一张满意的海报哦')
          return
        }
        if( this.Ept(base.theme)==''){
          this.showToast('none','活动标题不能为空')
          return
        }
        if(this.Ept(base.contactInformation)=='' ){
          this.showToast('none','主办方的联系方式不能为空')
          return
        }else if(!phoneReg.test( base.contactInformation  )){
          this.showToast('none','请输入正确的主办方手机号码')
          return
        }
        if( seartDate> endDate)  {
          this.showToast('none','结束时间不能小于开始时间')
          return
        }
        if( list.length<2 ){
          this.showToast('none','最少需要2个投票项')
          return
        }

        for(let i=0;i<list.length;i++){
          let itemModel =list[i]
          let code =itemModel.itemNo
          let cid = '编号 '+code + ' '
          if(!itemModel.photoUrl){
            this.showToast('none',cid +'还没有上传靓图哦')
            return
          }
          if(!this.Ept(itemModel.title)){
            this.showToast('none',cid +'的标题不能为空')
            return
          }
          if(!itemModel.totalNumber) itemModel.totalNumber=0
        }
        this.uploadCover()
      },
      //上传封面
      uploadCover(){
        let base = this.base
        let Cover = base.placardUrl
        const _this=this
        if(!this.uploadImage) return
        if(Cover.indexOf('test-1251126190')<0){
          this.uploadImage(Cover,function(res,localtion){
            if(res.statusCode==200){
              base.placardUrl = localtion
              //继续上传选项图片
              _this.uploadListFile()
            }else{
              _this.showToast('none','封面上传失败,请检查网络')
            }
          },function(progress){
            let percent = progress.progress
            _this.showToast('none',percent+"%")
          })
        }else{
          _this.uploadListFile()
        }
      },
      //上传元素图片
      uploadListFile(){
        const _this=this
        let start = 0
        let totalImg = this.list.length
        const uploadImgList = index=>{
          let list = _this.list;
          if(index===list.length) {
            _this.bublishJSON()
            return
          }
          start+=1
          if( list[index].photoUrl.indexOf('test-1251126190')<0 ){
            let photoUrl = list[index].photoUrl
            _this.uploadImage(photoUrl,function(res,localtion){
              if(res.statusCode==200){
                list[index].photoUrl = localtion
                uploadImgList(start)
              }else{
                _this.showToast('none','第'+(index+1)+'张上传失败')
              }
            },function(progress){
              let percent = progress.progress
              _this.showToast('none','编号：'+list[index].itemNo+' '+percent+"%"+'第'+(index+1)+'/'+totalImg+'张')
            })
          }else{
            uploadImgList(start)
          }
        }
        uploadImgList(0)
      },
      bublishJSON(){
        const _this=this
        const base = this.base
        const item = this.list
        const info = this.info
        const formData = {
          base,
          item,
          info
        }
        if(!this.isPublish){
          if( this.isPause ){
            activityStop(_this.ID,(er,res)=>{
              if(er){
                wx.showToast({
                  icon:'none',
                  title:"请求失败，请稍后再试"
                })
                return
              }
              if(res&& res.data && res.data.code==200){
                wx.showToast({
                  icon:'success',
                  title:"活动设置结束"
                })
                wx.redirectTo({
                  url:"/pages/index/main"
                })
              }else{
                wx.showModal({
                  content:"活动设置失败",
                  showCancel:false
                })
              }
            })
          }else{
            activityStart(_this.ID,(er,res)=>{
              if(er){
                wx.showToast({
                  icon:'none',
                  title:"请求失败，请稍后再试"
                })
                return
              }
              if(res&& res.data && res.data.code==200){
                wx.showToast({
                  icon:'success',
                  title:"活动设置开始"
                })
                wx.redirectTo({
                  url:"/pages/mainAct/main"
                })
              }else{
                wx.showModal({
                  content:"活动设置失败",
                  showCancel:false
                })
              }

            })
          }

        }else{
          activityCreate(formData,(er,res)=>{
            if(er){
              wx.showModal({
                content:"发布活动出错"
              })
              return
            }

            if(res && res.data && res.data.code==200){
              wx.showModal({
                content:"活动发布成",
                showCancel:false,
                success:res=>{
                  wx.redirectTo({
                    url:"/pages/mainAct/main"
                  })
                }
              })
            }
          })
        }

      },
      getTime(time){
        let dar = time.split('-')
        let YM =  dar[0]+dar[1]
        let DH = time.split('-')[2].split(' ')
        let day = DH[0]
        let HS = DH[1].split(':')
        let HMS =  HS[0]+HS[1]
        let timeSet =  YM + day + HMS
        return parseInt(timeSet)
      },
      showToast(icon='none',title=''){
        wx.showToast({
          icon,
          title,
          mask:true
        })
      },
      initData(){
        this.initShow=true
        activityDetail(this.ID,(er,res)=>{
          this.initShow=false
          if(er){
            wx.showToast({
              icon:"none",
              title:"数据获取失败"
            })
            return
          }
          if(res.data&&res.data.data){
            let data = res.data.data
            this.base = data.base
            this.list = data.item
            this.info = data.info
            let len = this.list.length

            let startTime = this.base.startTime
            let endTime = this.base.endTime
            this.startDate = moment(startTime).format('YYYY-MM-DD')
            this.startTime = moment(startTime).format('HH:mm')
            this.endDate = moment(endTime).format('YYYY-MM-DD')
            this.endTime = moment(endTime).format('HH:mm')
            wx.setStorageSync('votingCover',{
              photoUrl:this.base.placardUrl,
              itemNo:null
            })
            if( this.list.length>0 ){
              this.list.sort((a,b)=>{
                return parseInt(a.itemNo) - parseInt(b.itemNo)
              })
              this.sotreCode = this.list[len-1].itemNo
            }else{
              this.sotreCode = 101
            }
          }
        })
      },
      //裁剪模块生命周期开始----
      getCropperImage (photoUrl) {
        if(!photoUrl){
          wx.showToast({
            icon:'none',
            title:"图片获取失败"
          })
          this.openCropper = false
          return
        }
        if(this.listsImgID){
          this.list.forEach(item=>{
            if(item.itemNo===parseInt(this.listsImgID)){
              item.photoUrl = photoUrl||''
            }
          })
        }else{
          this.base.placardUrl = photoUrl||''
        }
        this.openCropper = false
      },
      closeCropper(){
        this.openCropper = false
      }
      //裁剪模块生命周期结束----
    },
    onLoad(option){
      this.openCropper=false
      if(option.id){
        this.ID=option.id
        this.initData()
      }
    }
  }

</script>
