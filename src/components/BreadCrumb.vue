<!-- 面包屑 组件  -->
<template>
  <div class="navbar clearfix" >
    <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right"> <!--  > 指向  -->
      <el-breadcrumb-item :to="{ path: '/index/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item class="item1" v-for="item in levelList"  :key="item.path">
        {{item.name}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        // 数组
        levelList: []
      }
    },
    watch: {  //  监听 变化
      $route() {
        this.getBreadcrumb()  //监听路由变化
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)  //获取路由信息，并过滤保留路由名称信息存入数组
        this.levelList = matched
        // console.log(matched)
      }
    }
  }
</script>

<style scoped>

  .breadcrumb-container {
    font-size: 18px;
    padding: 12px;
  }

  .item1 {
    color: blue;
  }

</style>

