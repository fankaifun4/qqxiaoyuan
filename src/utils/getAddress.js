import { getSchool } from  '@/server/index'
export const  getAddressInfo =  (searchType='',callback) =>{
  wx.getLocation({
    success:res=>{
      getSchool({
        "latitude": res.latitude|| 39.92,
        "longitude":res.longitude||116.46,
        "searchName": searchType
      },(er,res)=>{
        let data = res.data
        if(data.data && data.data.length ){
          callback(data.data)
        }else{
          if( res.data.msg ){
            wx.showModal({
              content:res.data.msg
            })
          }else{
            wx.showModal({
              content:'服务器出去遛弯啦，马上回来'
            })
          }

        }
      })
    },
    fail(err){
      wx.hideLoading()
      wx.showModal({
        content:"获取地理位置失败"
      })
    }
  })
}

