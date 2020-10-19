<!--模板-->
<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div style="height: 900px">

    <el-container class="index_con">
      <!-- 头部区域 -->
      <el-header class="el-header">
        <div>
          <img class="logo" src="../assets/gonglue.png" alt="">
          <span class="span-title">LP后台管理系统</span>
        </div>
        <div style="font-size: 16px;margin-right: 30px">
          欢迎&nbsp;&nbsp;<span class="user_name">{{showUserName}}</span>

          <el-dropdown class="setting">
            <div style="font-size: 26px;margin-left: 25px;color: aqua">
              <!--<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>-->
              <img style="width: 40px;height: 40px;border-radius: 50px" :src="avatar" />
            </div>

            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="user_dialog=true">个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="msg_dialog=true,showMsg()">
                <el-badge :value="msg_value" :max="99" class="item" type="warning">
                  消息
                </el-badge>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主体  -->
      <el-container>
        <!-- 左边区域 -->
        <el-aside class="el-aside" width="200px">
          <el-menu background-color="aqua" text-color="#fff" active-text-color="#409eff">
            <!-- 一级菜单 -->
            <el-submenu index="1">
              <template slot="title">
                <!--  图标  -->
                <i class="el-icon-user"></i>
                <!--  文本  -->
                <span >用户管理</span>
              </template>

              <!-- 二级菜单 -->
              <el-menu-item class="el-menu-item" style="padding-left: 80px;" index="1-1" @click="showUser">
                <template slot="title">
                  <!--  图标  -->
                  <i class="el-icon-user-solid"></i>
                  <!--  文本  -->
                  <span class="submenu_item">查看用户</span>
                </template>
              </el-menu-item>
            </el-submenu>



            <el-submenu index="2">
              <template slot="title">
                <!--  图标  -->
                <i class="el-icon-setting"></i>
                <!--  文本  -->
                <span>商家管理</span>
              </template>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title">
                <!--  图标  -->
                <i class="el-icon-menu"></i>
                <!--  文本  -->
                <span >商品管理</span>
              </template>

              <el-menu-item class="el-menu-item" style="padding-left: 80px;" index="3-1" @click="proCate">
                <template slot="title">
                  <i class="el-icon-goods"></i>
                  <span class="submenu_item">商品类别</span>
                </template>
              </el-menu-item>
              <el-menu-item class="el-menu-item" style="padding-left: 80px;" index="3-2" @click="showProduct">
                <template>
                  <i class="el-icon-coin"></i>
                  <span class="submenu_item">商品列表</span>
                </template>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title">
                <!--  图标  -->
                <i class="el-icon-setting"></i>
                <!--  文本  -->
                <span>数据统计</span>
              </template>

              <el-menu-item class="el-menu-item" style="padding-left: 80px;" index="4-1" @click="showDeal">
                <template>
                  <i class="el-icon-lollipop"></i>
                  <span class="submenu_item">交易统计</span>
                </template>
              </el-menu-item>
              <el-menu-item class="el-menu-item" style="padding-left: 80px;" index="4-2" @click="showMoney">
                <template>
                  <i class="el-icon-wallet"></i>
                  <span class="submenu_item">金额统计</span>
                </template>
              </el-menu-item>
            </el-submenu>

          </el-menu>

        </el-aside>

        <!--  右边区域-->
        <el-main class="el-main">
          <!-- 面包屑导航  -->
          <div style="height: 40px;text-align: center">
            <BreadCrumbs></BreadCrumbs>  <!--自定义组件 -->
          </div>
          <hr style="background-color: red">
          <!--  页面切换  -->
          <div>
            <router-view></router-view>
          </div>
        </el-main>

      </el-container>

    </el-container>

    <!--个人中心-->
    <el-drawer
      :visible.sync="user_dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="user_contain">
        <div style="margin-top: -30px">
          <img style="width: 160px;height: 140px;border-radius: 40%" :src="avatar" @click="showAvatarDialog=true,showSelectDialog"/>
        </div>
        <hr>
        <div class="user_form">
          <el-form :model="userInfoForm">
            <el-form-item label="昵称" prop="username" :label-width="labelWidth">
              <el-input v-model="userInfoForm.username" class="user_input" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" :label-width="labelWidth">
              <el-input v-model="userInfoForm.sex" class="user_input" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="生日" prop="birth" :label-width="labelWidth">
              <!--<el-input v-model="userInfoForm.birth" class="user_input">-->
              <!--</el-input>-->
              <el-date-picker
                v-model="userInfoForm.birth"
                align="right"
                type="date"
                class="user_input"
                placeholder="选择日期"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="地区" prop="location" :label-width="labelWidth">
              <el-input v-model="userInfoForm.location" class="user_input" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="个性签名" prop="signature" :label-width="labelWidth">
              <el-input v-model="userInfoForm.signature" class="user_input" type="textarea" clearable></el-input>
            </el-form-item>
            <el-button type="primary">修改</el-button>
          </el-form>
        </div>
      </div>
    </el-drawer>

    <!-- 个人头像 弹框 -->
    <el-dialog :visible.sync="showAvatarDialog">

    </el-dialog>


  </div>
</template>

<!--行为-->
<script>
  /*  引入组件  */
  import BreadCrumbs from '@/components/BreadCrumb'
  import Cookies from 'js-cookie'

  export default {
    name: "Index",
    //  组件
    components: {
      BreadCrumbs
    },
    data() {
      return {
        tableData: [
          {
            aid: '101',
            aname: 'aaaa',
            sponsor: 'lplp',
            host: 'lp',
            adate: '2020-08-02',
            alocation: '深圳',
            acontent: '基金交易大会'
          },
          {
            aid: '102',
            aname: 'bbbb',
            sponsor: 'lplp',
            host: 'lp',
            adate: '2020-08-03',
            alocation: '香港',
            acontent: '基金交易大会'
          },
          {
            aid: '103',
            aname: 'cccc',
            sponsor: 'lplp',
            host: 'lp',
            adate: '2020-08-04',
            alocation: '上海',
            acontent: '基金交易大会'
          }
        ],
        num: 1,
        value: '',
        options: [
          {
            label: '北京',
            value: '0'
          },
          {
            label: '深圳',
            value: '1'
          },
          {
            label: '广州',
            value: '2'
          },
          {
            label: '上海',
            value: '3'
          },
        ],
        s_value: true,
        active: 0,
        /* 个人中心  */
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        user_dialog: false, // 个人中心弹框
        msg_dialog: false, // 消息弹框
        labelWidth: '100px',
        userInfoForm: {
          username: '',
          avatar: '',
          sex: '',
          birth: '',
          location: '',
          signature: ''
        },
        // 日期  快捷选择
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },

        msg_value: '20',

        // 点击个人头像
        showAvatarDialog: false


        /*个人中心*/


      };
    },
    methods: {
      changeNum(value) {
      },
      logout() {
        this.$router.push("/login");
        this.$message.success("退出登录。。")
        Cookies.remove("username");
      },
      // 进度展示
      goNext() {
        if (this.active++ > 2) {
          this.active = 0;
        }
      },
      // main区域  页面切换
      showUser() {
        this.$router.push("/showUser");
      },
      showProduct() {
        this.$router.push("/showProduct");
      },
      proCate() {
        this.$router.push("/proCate");
      },
      // 交易
      showDeal() {
        this.$router.push("/showDeal");
      },
      // 金额统计
      showMoney() {
        this.$router.push("/showMoney");
      },

      // 消息
      showMsg() {
        this.msg_value = this.msg_value - 0; // 转为数字类型 再执行运算
        this.msg_value += 1;
      },

      // 点击头像
      showSelectDialog(){

      }


    },
    // computed 方法 ：当其依赖的属性值发生变化时，会重新计算其属性值，反之使用缓存中的属性值
    computed: {
      showUserName() {
        return Cookies.get("username");  // 获取 Cookis 缓存 的 当前登录用户名
      }
    }


  }

</script>


<!-- 样式 -->
<style scoped>

  .input_num {
    margin-top: 20px;
  }

  .index_con {
    height: 100%;
    /*height: 500px;*/
  }

  .el-header {
    background-color: #2c3e50;
    display: flex;
    justify-content: space-between;
    padding-left: 4px;
    align-items: center;
    color: #ffffff;
    font-size: 20px;
  }

  .el-header div {
    display: flex;
    align-items: center;
  }

  /* 子菜单 */
  .el-menu-item {
    padding-left: 80px;
  }

  .logo {
    width: 60px;
    height: 60px;
  }

  .user_name {
    color: red;
  }

  /*.span-title{
    align-items: center;
  }*/
  .el-aside {
    background-color: aqua;
  }

  .el-main {
    background-color: #ffffff;
    padding: 8px;
  }

  .user_contain .user_form .user_input {
    width: 300px;
    margin-left: -20px;
  }

  .item {
    margin-top: 10px;
    margin-right: 30px;
  }

  /* 子菜单 字体 */
  .submenu_item{
    font-size: 12px;
  }


</style>
