import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
  config:{
    navigationBarTitleText:'发布活动',
    "backgroundTextStyle":"dark",
    "navigationBarBackgroundColor": "#000",
    "navigationBarTextStyle":"#fff"
  }
}
