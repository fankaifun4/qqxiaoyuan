import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      '^pages/index/main',
      'pages/activity/list/main',
      'pages/activity/detail/main',
      'pages/activity/voting/lists/main',
      'pages/activity/voting/detail/main',
      'pages/activity/advertise/main',
      'pages/activity/publish/main',
      'pages/activity/prevAct/main',
      'pages/activity/cover/main',
      'pages/activity/publishDetail/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      onReachBottomDistance:"50px"
    },
    networkTimeout: {
      "request": 10000,
      "downloadFile": 10000
    }
  }
}
