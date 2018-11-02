import config from './config'
import {login}  from '../server/index'
const loginController = {
  login(cb){
    const _this=this
    wx.login({
      success(loginInfo){
        _this.getUserInfo( loginInfo,cb)
      },
      fail(err){
        return err
      }
    })
  },
  getUserInfo(loginInfo,cb){
    const _this =this
    wx.getUserInfo({
      success(userInfo){
        const code = loginInfo.code
        const iv = userInfo.iv
        const encryptedData=userInfo.encryptedData
        const signature = userInfo.signature
        const headers={
          'wx-code':code,
          'wx-iv':iv,
          'wx-encryptedData':encryptedData,
          'wx-signature':signature,
        }
        login(code,cb)
      },
      fail(err){
        return err
      }
    })
  }
}

export default loginController
