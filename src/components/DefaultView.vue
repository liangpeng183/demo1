<!--   模板  -->
<template>
    <div>
      <hr style="background-color: red">
      <!--  用户信息  -->
      <div class="u_inf">
        <img class="avater_user" :src="avatar"/>
        <span class="u_inf_name" >{{showName}}</span>
        <hr style="background-color: blue;margin-top: 160px;width: 86%">
        <span class="last_login last_t">上次登录时间：<i class="last_l_t">2020-02-02 18:56</i></span><br>
        <span class="last_login last_l">上次登录地点：<i class="last_l_t">深圳南山</i></span>
      </div>

      <!-- 日历  -->
      <div class="date">
        <el-calendar class="date_cal" v-model="date">
        </el-calendar>
      </div>

      <!-- 其他信息 -->
      <div class="deal_t">
      </div>

    </div>
</template>

<!-- 行为   -->
<script>
  import Cookies from 'js-cookie'
    export default {
        name: "首页",
      data(){
          return{
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            date: new Date()
          }
      },
      methods:{


      },
      // computed 方法 ：当其依赖的属性值发生变化时，会重新计算其属性值，反之使用缓存中的属性值
      computed: {
        showName() {
          return Cookies.get("username");  // 获取 Cookis 缓存 的 当前登录用户名
        }
      }
    }
</script>


<!--  样式  -->
<style scoped>

  .u_inf{
    width: 36%;
    height: 260px;
    background-color: #03f8b2;
    float: left;
  }
  .avater_user{
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-top: 20px;
   margin-left: -200px;
  }
  .u_inf_name{
    position: absolute;
    margin-top: 80px;
    margin-left: -40px;
    font-size: 28px;
  }
  .last_login{
    position: absolute;
    margin-left: -200px;
    margin-top: 10px;
  }
  .last_l{
    margin-top: 30px;
  }
  .last_l_t{
  margin-left: 40px;
  }

  .date{
    width: 36%;
    height: 260px;
    /*background-color: pink;*/
    float: left;
    margin-left: 360px;
  }
  .date_cal{
    height: 500px;
  }
  .el-calendar-table .el-calendar-day{
    height: 45px;
  }


  .deal_t{
    /*background-color: blue;*/
    width: 500px;
    height: 300px;
    float: left;
  }

</style>
