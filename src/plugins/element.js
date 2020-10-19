import Vue from "vue";
import ElementUI from 'element-ui'
import { Button } from 'element-ui'
import {Form,FormItem} from 'element-ui'
import {Input,Container,Header,Aside,Main,Switch,Menu,Submenu,Icon,MenuItemGroup,MenuItem} from 'element-ui'
//  弹出框 组件
import  { Message } from 'element-ui'

/*全局可用*/
Vue.use(ElementUI)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(Switch)
// 属性 挂载  可以通过this 访问
Vue.prototype.$message = Message
