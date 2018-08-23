<style lang="scss" scoped>
  .container{
    background: #f5f5f6;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .title{
    height:80px;
    text-align: center;
    font-weight: 700;
    font-size: 33px;
    border-bottom:5px solid #c90915;
    background: #fff;
  }
  .content-wrap{
    margin-top:115px;
    background: #fff;
    min-height: 200px;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    bottom:150px;
    top:0px;
    padding:15px 0;
    border-top:5px solid #efefef;
    overflow: hidden;
    .content-body{
      position: relative;
      width: 100%;
      height: 100%;
      overflow-x:hidden;
      overflow-y: scroll;
      padding:0 15px;
      box-sizing: border-box;
    }
  }
  .content-btn{
    position: absolute;
    bottom:0;
    height:150px;
    width: 100%;
    display: flex;
    align-items: center;
    align-content: center;
    background: #fff;
    >button{
      margin:0 15px;
      background: #090;
      color: #fff;
      width: 100%;
      display: block;
    }
  }
</style>
<template>
<div class="container">
  <div class="title">爱的撒旦</div>
  <div class="content-wrap">
    <div class="content-body">
      <rich-text  :nodes="nodeData" > </rich-text>
    </div>
  </div>
  <div class="content-btn">
    <button>马上去报名</button>
  </div>
</div>
</template>
<script>
  export default{
    data(){
      return{
        nodeData:null
      }
    },
    created(){
      wx.showLoading()
      this.getNodeData()
    },
    methods:{
      getNodeData(){
        let template=`
            <p style="text-align: center;"><img  style="width:300px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533144364562&di=06fde70328cbba27a1cb9f4a1d243b9a&imgtype=0&src=http%3A%2F%2Fp5.qhimg.com%2Ft013b2a0ad9867d0a0c.jpg%3Fsize%3D2880x1920"/></p>
            <p style="text-align: center;">享受风雨给予的坚强</p>
            <p style="text-align: center;">含着泪细念婆娑仰望</p>
            <p style="text-align: center;">踌躇与路放之间浅着一声轻盈</p>
            <p style="text-align: center;">那是说走就走的旅行</p>
            <p style="text-align: center;">固执与释然之间锁着一次酩酊</p>
            <p style="text-align: center;">只觉宿人醉而我独醒</p>
            <p style="text-align: center;">孤调与琳琅之间拘着一扇心境</p>
            <p style="text-align: center;">映照着我们纯粹魂灵</p>
            <p style="text-align: center;">不安与落定之间飘着一封书信</p>
            <p style="text-align: center;">故乡等待着我的归期</p>
            <p style="text-align: center;">带上心中的诗 飞向远方</p>
            <p style="text-align: center;"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533144630413&di=e157267cfe85f0a834eac1bae3f276d9&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201202%2F05%2F20120205092808_satSd.jpg"/></p>
            <p style="text-align: center;">未曾与你相遇便让我无尽的痛苦</p>
            <p style="text-align: center;">时常一无所获只因这满身的惆怅</p>
            <p style="text-align: center;">总是苦苦追寻却还是孤独在路旁</p>
            <p style="text-align: center;">不想诗和远方依旧还停泊在过往</p>
            <p style="text-align: center;"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533144630412&di=a9f3967b4081a428a939d76a4447dbd7&imgtype=0&src=http%3A%2F%2Fimg5q.duitang.com%2Fuploads%2Fitem%2F201404%2F10%2F20140410095926_zLTWY.jpeg"/></p>
          `
        const regex = new RegExp('<img', 'gi');
        template = template.replace(regex, `<img style="max-width: 98%;"`);
        setTimeout(()=>{
          wx.hideLoading()
          this.nodeData=template
        },1000)

      }
    }
  }
</script>
