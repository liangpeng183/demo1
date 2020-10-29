// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//入口文件
import Vue from 'vue'
import App from './App'
import router from './router'  // 引入路由配置
//element_ui 样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/*import 'element‐ui/lib/locale/lang/zh‐CN'  */
// 引入 element
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'

import Cookies from 'js-cookie'

// 导入语言包
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh-CN',    // 语言标识  中文
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh-CN': require('./common/lang/zh'),   // 中文语言包
    'en-US': require('./common/lang/en'),    // 英文语言包
    'zh-CNT': require('./common/lang/zht')    // 中文繁体语言包
  }
})
// 语言包

Vue.use(Cookies)

//svn账号密码 :    heheng/hh_wJ3xr
// http 请求
import axios from 'axios'
//Vue.use(axios)axios
Vue.prototype.$http = axios   //通过this. 访问
axios.defaults.baseURL = 'http://localhost:8088/'    // 设置请求根路径
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 前置拦截
axios.interceptors.request.use(config => {
  console.log("拦截：" + config)
  config.headers.Authorization = window.sessionStorage.getItem("token")
  return config
})
// 后置拦截
axios.interceptors.response.use(response =>{
  let res = response.data;
  console.log("**********")
  console.log("data:"+ res)
  console.log("**********")
})

Vue.prototype.$axios = axios   //通过this. 访问

import VueResource from 'vue-resource'
Vue.use(VueResource)


Vue.config.productionTip = false
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,   // 使用 语言包
  router,
  components: { App },
  template: '<App/>'
})
