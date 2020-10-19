import Vue from 'vue'
import Router from 'vue-router'
/*  界面 */
import Login from '@/components/Login'
import Index from '@/components/Index'
import UserList from '@/components/user/UserList'
import ProductList from '@/components/product/ProductList'
import Cate from '@/components/product/Cate'
import Deal from '@/components/Deal'
import Money from '@/components/Money'
import DefaultView from '@/components/DefaultView'

Vue.use(Router)


export default new Router({
  mode: 'history',   // 路由 路径url不带#号
  base: '/lp/',      // url  前缀
  /*路由规则*/
  routes: [
    // 地址 重定向
    {path: '/', redirect: '/login'},  //  进入系统 展示的界面
    {
      path: '/login',
      name: 'Login',
      component: Login   //先 import 组件
    },
    {
      path: '/index',  // 地址 url
      name: '',
      component: Index,   // 页面组件
      children: [
        {
          path: '/', // path 设置为 “/” ，默认显示该页面
          name: '',
          component: DefaultView   //先 import 组件
        },
        {
          path: '/showUser',
          name: '查看用户',
          component: UserList
        },
        {
          path: '/showProduct',
          name: '商品列表',
          component: ProductList
        },
        {
          path: '/proCate',
          name: '商品类别',
          component: Cate
        },
        {
          path: '/showDeal',
          name: '交易统计',
          component: Deal
        },
        {
          path: '/showMoney',
          name: '金额统计',
          component: Money
        }
      ]
    },

    // test
/*    {
      path: '/index',  // 地址 url
      name: '首页',
      component: Index,   // 页面组件
      children: [
        {
          path: '/', // path 设置为 “/” ，默认显示该页面
          name: '',
          component: Cate   //先 import 组件
        }
      ]
    }*/

  ]
})
