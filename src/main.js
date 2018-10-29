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
      'pages/my/main',
      'pages/actList/main',
      'pages/mainAct/main',
      'pages/enroll/main',
      'pages/activity/publishVoting/main',
      'pages/activity/voting/lists/main',
      'pages/activity/voting/detail/main',
      'pages/updateVote/update/main'

    ],
    window: {
      navigationBarBackgroundColor: "#5a5a5a",
      backgroundTextStyle: 'dark',
      navigationBarTextStyle: '#fff',
      onReachBottomDistance:"50px"
    },
    networkTimeout: {
      "request": 10000,
      "downloadFile": 10000
    },
    tabBar: {
      selectedColor:"#1296db",
      backgroundColor:'#fff',
      borderStyle:'#f0f',
      list: [{
        pagePath: "pages/index/main",
        iconPath:"/static/images/home.png",
        selectedIconPath:"/static/images/home_act.png",
        text: "首页"
      },{
        pagePath:"pages/my/main",
        iconPath:"/static/images/my.png",
        selectedIconPath:"/static/images/my_act.png",
        text: "我的"
      }]
    }
  }
}
