<template>
  <div>

    <el-table>
      <el-table-column label="ID"></el-table-column>
      <el-table-column label="用户名"></el-table-column>
      <el-table-column label="性别"></el-table-column>
    </el-table>
    <hr>
    <div class="top_w">
      <label for="">部门: </label>
      <el-select>
        <el-option>

        </el-option>
      </el-select>
      <label for="">考核者: </label>
      <el-select>
        <el-option>

        </el-option>
      </el-select>

      <label for="">考核年份: </label>
      <el-select>
        <el-option>

        </el-option>
      </el-select>

      <label for="">第几周: </label>
      <el-select>
        <el-option>

        </el-option>
      </el-select>

    </div>

    <div style="margin-top:40px">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容" style="width: 500px;left: -180px">
      </el-input>

      <label>制作者: </label>
      <el-input type="text" class="u_input" placeholder="制作者"></el-input>
      <label for="">密码: </label>
      <el-input type="password" class="u_input" placeholder="密码"></el-input>

      <el-button type="primary" style="height: 80px;">登录(远程)</el-button>

      <el-button type="info" style="width:80px;height: 80px;font-size: 12px;text-align: left;">重置密码</el-button>

    </div>



  </div>
</template>

<script>
  export default {
    name: "USER"
  }
</script>

<style scoped>
  .u_input {
    width: 120px;
    height: 10px;

  }
</style>
