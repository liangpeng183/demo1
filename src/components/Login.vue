<!--模板-->
<template>
  <div class="login_container">
    <div class="login_box">
      <!--  头像显示 -->
      <div class="avater_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 表单  -->
      <!--   v-model 双向绑定 ， :rules 验证规则 ,ref 引用 -->
      <el-form label-width="0px" ref="loginRef" :model="loginForm" :rules="loginRules" class="form_box">
        <!--账号-->
        <!-- prop 属性 绑定验证规则  （item） -->
        <el-form-item prop="username">
          <el-input class="" placeholder="账号" v-model="loginForm.username" prefix_icon="el_icon_search"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" class="" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!--  按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>

      </el-form>

    </div>
  </div>
</template>

<!--行为-->
<script>
  import Cookies from 'js-cookie'
  export default {
    name: 'Login',
    // 数据
    data() {
      return {
        // 登录表单 数据绑定
        loginForm: {
          username: '',
          password: ''

        },
        // 表单 验证规则对象
        loginRules: {
          // 对用户信息进行验证
          username: [
            // true 表示 必填项， 消息， 失去焦点时的事件
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 4, max: 15, message: '4到8个字符（不含特殊字符）', trigger: 'blur'}
          ]
        }

      }
    },
    // 方法    axios 注意 同步 和异步
    methods: {
      // 登录按钮
      async login() {
        // 箭头函数
        this.$refs.loginRef.validate(async (valid) => {
          // console.log("结果："+valid);

          if (!valid) {  //false
            return
          }
          //同步请求   async  await
          await this.$http.post('http://localhost:8088/login', this.loginForm,
            {'Content-type': 'application/json;charset=UTF-8'})   //设置数据格式
            .then((res) => {   // 请求成功
              console.log("结果：" + res.data.code);
              // 请求成功后再进行验证
              var code = res.data.code;
              if (code == 200) {
                this.$message.success("登录成功！");
                // 验证  、登录成功后
                // 1、 token 口令 ---》  sessionStorage
                window.sessionStorage.setItem("token", "lplplp");
                Cookies.set("username",this.loginForm.username);//cookie存放 当前用户名
                // 2、 通过路由编程  跳转到主页
                this.$router.push("/index");
              } else {
                this.$message.error("账号或密码错误!");
              }
            })
            .catch(err => {      // 请求失败
              this.$message.error("请求错误！");
              console.log("请求错误")
            });

        });

      },
      // 重置 点击事件
      resetLoginForm() {
        //console.log("重置表单！")
        this.$refs.loginRef.resetFields();
      }
    }
  }
</script>

<!--样式-->
<!-- scoped 样式  属于本组件  只美化自己  -->
<style scoped>
  .login_container {
    background-color: aqua;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 3px;
    position: absolute; /*绝对定位*/
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .login_btn {
    background-color: red;
  }

  .a {
    margin-top: 20px;
  }

  .avater_box {
    height: 120px;
    width: 120px;
    border: 1px solid #EEEEEE;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%); /* 横向 纵向 */
    background-color: #ffffff;
  }

  .avater_box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #EEEEEE;
  }

  .form_box {
    position: absolute;
    bottom: 0;
    padding: 0 20px;
    left: 100px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }


</style>
