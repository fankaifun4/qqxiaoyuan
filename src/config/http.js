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
  $get(callback=null,isToken=false){
    this.$request('GET',callback,isToken)
    return this
  }
  $post(callback=null,isToken=false){
    this.$request('POST',callback,isToken)
    return this
  }
  $request(method,cb ,isToken){
    const _this=this
    const token = wx.getStorageSync('token')
    if( isToken ){
      if( !token ){
        wx.showToast({
          icon:"none",
          mask:true,
          title:"账号过期，请重新登录"
        })
        return;
      }
    }
    wx.showLoading({
      mask:true,
    })
    this.requestTask  = wx.request({
      url:this.url,
      method,
      data:{...this.data},
      header: {
        'Authorization':token,
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
        wx.setStorageSync('token',res.data.data)
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
