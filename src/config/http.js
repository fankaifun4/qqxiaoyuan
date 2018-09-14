import { baseUrl } from './dev.js'

class http {
  constructor(url='',data={},headers={}){
    if(url.indexOf('http')>=0){
      this.url = url
    }else{
      this.url = baseUrl+url
    }
    this.header = {
      'content-type': 'application/json',
      ...headers
    }
    this.requestTask=null
    this.data = data
    this.token = null
  }
  $get(callback=null,isToken=true){
    this.$request('GET',callback)
    return this
  }
  $post(callback=null,isToken=false){
    const token = wx.getStorageSync('token')
    const memberId = wx.getStorageSync('memberId')
    if( isToken ){
      if( !token || !memberId ){
        wx.redirectTo({
          url:'/pages/index/main'
        })
        return;
      }
    }
    this.$request('POST',callback)
    return this
  }
  $request(method,cb ){
    const _this=this
    const token = wx.getStorageSync('token')
    const memberId = wx.getStorageSync('memberId')
    wx.showLoading({
      mask:true,
    })
    this.requestTask  = wx.request({
      url:this.url,
      method,
      data:{...this.data},
      header: {
        'Authorization':token,
        'memberId':memberId,
        ...this.header
      },
      success(res){
        wx.hideLoading()
        cb( null,res )
      },
      fail(err){
        wx.showToast({
          icon:"none",
          mask:true,
          title:"服务器离家出走啦"
        })
        wx.hideLoading()
        cb(err)
      }
    })
    return this
  }
  $login(cb){
   const _this= this
    wx.showLoading({
      mask:true,
    })
    wx.request({
      url:this.url,
      method:"POST",
      data:{ ...this.data},
      header: this.header,
      success(res){
        wx.hideLoading()
        wx.setStorageSync('token',res.data.data.token)
        wx.setStorageSync('memberId',res.data.data.memberId)
        cb( null,res )
      },
      fail(err){
        wx.hideLoading()
        cb(err)
      }
    })
  }
  $abort(){
    this.requestTask.abort()
    return this
  }
}

function init$http(url,data,config){
    return new http( url,data,config )
}

export default  init$http
