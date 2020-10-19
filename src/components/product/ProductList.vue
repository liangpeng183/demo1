<template>
  <div>

    <div style="height: 58px">
      <el-form :model="gForm" style="padding: 4px;">
        <el-row>
          <el-col span="5">
            <el-form-item prop="goodsName" label="名称">
              <el-input v-model="gForm.goodsName" style="width: 200px;display: flex;padding-left: 8px"
                        placeholder="名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="5">
            <el-form-item prop="goodsCat" label="类别">
              <el-input v-model="gForm.goodsCat" style="width: 200px;display: flex;padding-left: 8px"
                        placeholder="类别" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col span="" style="float: right;margin-right: 22px">
            <el-form-item>
              <el-button type="primary" class="searchBtn" icon="el-icon-search" @click="searchGoods($event)">查询</el-button>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>

    </div>

    <hr style="background-color: red;width: 1303px;">
    <el-button type="primary" style=";display: flex;" @click="dialgAddGoods= true">新增 +</el-button>
    <!--  v-bind: （:）  绑定属性-->
    <el-table :data="tableProData" border :header-cell-style="{'text-align':'center'}">
      <el-table-column type="index" align="center" :index="indexUp" width="60px" label="序号"></el-table-column>
      <el-table-column prop="gId" align="center" label="ID"></el-table-column>
      <el-table-column prop="gName"  align="center" label="商品名称"></el-table-column>
      <el-table-column prop="gCat" align="center" label="类别"></el-table-column>
      <el-table-column prop="gNum" align="center" label="数量" sortable></el-table-column>
      <el-table-column prop="gPrice" align="center" label="价格" sortable></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template slot-scope="scope">
          <!-- 通过 scope 拿到 行 ，进而拿到行内的元素 row行  其次是列名  -->
          <el-button type="text" @click="checkDetail(scope.row)">查看详情</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row),dialogEdit= true">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row),dialogDelete = true">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增弹出框 -->
    <el-dialog title="新增商品" class="add_dialog" :visible.sync="dialgAddGoods">
      <el-form :model="addForm" ref="proRef" class="addG_form">
        <el-form-item label="商品名称" prop="gName" class="formItem" :label-width="formLabelWidth">
          <el-input v-model="addForm.gName" class="g_input" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" prop="gCat" class="formItem" :label-width="formLabelWidth">
          <el-select v-model="addForm.gCat"  clearable class="g_input" placeholder="请选择类别">
            <el-option label="0 电脑" value="电脑"></el-option>
            <el-option label="1 家具" value="家具"></el-option>
            <el-option label="2 手机" value="手机"></el-option>
            <el-option label="3 服装" value="服装"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品数量" prop="gNum" class="formItem" :label-width="formLabelWidth">
          <el-input v-model="addForm.gNum" class="g_input" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="gPrice" class="formItem" :label-width="formLabelWidth">
          <el-input v-model="addForm.gPrice" class="g_input" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialgAddGoods = false">取 消</el-button>
        <el-button type="primary" @click="dialgAddGoods = false,addGoods()">确 定</el-button>
      </div>
    </el-dialog>

    <!--  详情  弹出框-->


    <!--  编辑  弹出框 -->
    <el-dialog title="编辑商品" width="44%" :visible.sync="dialogEdit">
      <el-form :model="editForm" ref="proRef" class="addG_form">
        <el-form-item label="商品名称" prop="gName" class="formItem" :label-width="formLabelWidth">
          <el-input v-model="editForm.gName" class="g_input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类别" prop="gCat" class="formItem" :label-width="formLabelWidth">
          <el-select v-model="editForm.gCat" class="g_input" placeholder="请选择类别">
            <el-option label="0 电脑" value="电脑"></el-option>
            <el-option label="1 家具" value="家具"></el-option>
            <el-option label="2 手机" value="手机"></el-option>
            <el-option label="3 服装" value="服装"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品数量" prop="gNum" class="formItem" :label-width="formLabelWidth">
          <el-input v-model="editForm.gNum" class="g_input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="gPrice" class="formItem" :label-width="formLabelWidth">
          <el-input v-model="editForm.gPrice" class="g_input" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="dialogEdit = false,updateGoods(editForm)">确 定</el-button>
      </div>
    </el-dialog>

    <!--  删除  弹出框 -->
    <el-dialog title="提示" width="30%" :visible.sync="dialogDelete">
      <!-- {{}} 插值表达式 单向绑定数控 -->
      <div>确定删除 <span style="color: red">{{ gN }}</span>?</div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogDelete = false">取 消</el-button>
          <el-button type="primary" @click="dialogDelete = false,delteByGid(gI,dIndex)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "product",
    data() {
      return {
        // 搜索 表单
        gForm: {
          goodsName: '',
          goodsCat: ''
        },
        tableProData:[],
        // 表格数据
      /*  tableProData: [
          {
            "gId": '101',
            "gName": '电脑',
            "gCat": '电子产品',
            "gNum": '12',
            "gPrice": '5999'
          },
          {
            gId: '102',
            gName: '手机',
            gCat: '电子产品',
            gNum: '122',
            gPrice: '2999'
          }
        ],*/
        dialgAddGoods: false,  // 新增弹出框 默认不显示，点击按钮 变成true,才显示
        dialogDelete: false,
        dialogEdit: false,
        addForm: {
          gName: '',
          gCat: '',
          gNum: '',
          gPrice: ''
        },
        editForm: {
          gId: '',
          gName: '',
          gCat: '',
          gNum: '',
          gPrice: ''
        },
        formLabelWidth: '120px',
        gN: '',     // 删除弹出框  传入名称 （显示）
        gI: '',      // 删除弹出框  传入所删除商品的id (根据id删除)
        dIndex: ''   // 删除表格  索引
      }

    },
    methods: {
      indexUP(index) {
        return index * 1;
      },

      //条件查询
      searchGoods(event) {
        var name = this.gForm.goodsName.trim();
        var cate = this.gForm.goodsCat.trim();
       /* if(name =="" && cate != ""){
          this.$message.success("类别")
        }else if(name !="" && cate == ""){
          this.$message.success("名称")
        }else if(name !="" && cate != ""){
          this.$message.success("名称+类别")
        }else {
          this.$message.success("查询所有")
        }*/
        event.preventDefault();
        let formData = new FormData();
        formData.append("gName",name);
        formData.append("gCat",cate);
        this.$http.post('http://localhost:8088/pro/search',formData,{'Content-type': 'application/json;charset=UTF-8'})
          .then((res) => {
            console.log("查询："+res.data.code);
            if(res.data.code == 200){
              this.tableProData = [];
              this.tableProData = res.data.data;
            }else {
              this.$message.error("暂无相关数据");
            }
          })
          .catch((err) =>{
            console.log("请求失败" + err);
          })
      },

      // 修改 弹出框
      handleEdit(index, row) {
        console.log( index+ "  编辑：" + row);
        this.editForm = row;   // 该行数据
      },
      // 逻辑
      updateGoods(formData){
         console.log("已修改："+formData.gId);
        this.$http.post('http://localhost:8088/pro/updatePro',this.editForm,{'Content-type': 'application/json;charset=UTF-8'})
          .then((res) =>{
             if(res.data.code == 200){
               this.$message.success("修改成功");
               this.editForm = res.data.data;
             }else {
               this.$message.error("修改失败"+err);
             }
          })
          .catch((err) => {

          })
         //this.initData();
      },

      // 新增
      async addGoods() {
        this.$refs.proRef.validate(async (valid) => {
          // console.log("结果："+valid);
          if (!valid) {  //false
            return
          }
          await this.$http.post('http://localhost:8088/pro/add', this.addForm,
            {'Content-type': 'application/json;charset=UTF-8'})
            .then((result) => {
              if(result.data.code == 200){
                console.log("新增商品状态： " + result.data.message);
                this.initData();
              }
            })
            .catch(err => {
              console.log("请求失败" + err);
            })
        });
      },

      // 删除弹框
      handleDelete(index,row) {
        console.log("  删除：" + row.gName);
        this.gN = row.gName;
        this.gI = row.gId;
        this.dIndex = index;
      },
      // 逻辑
      delteByGid(gId,index) {
        console.log("删除的id:" + gId);
         this.$http.post('http://localhost:8088/pro/deleteById/'+gId,
           {'Content-type': 'application/json;charset=UTF-8'})
           .then((res) => {
               if(res.data.code == 200){
                 this.$message.success("删除成功");
                 this.tableProData.splice(index,1);
                 //this.initData();
               }else {
                 this.$message.error("删除失败");
               }
           })
           .catch((err) =>{
           })
      },

      // 详情展示
      checkDetail(row) {
        console.log(" 详情：" + row)
      },


      // 初始化 表格数据
      initData: function() {
         this.$http.get('http://localhost:8088/pro/getAll')
           .then((res) =>{
            if (res.data.code == 200){
              this.tableProData = []; // 先清空表格，避免重复
              this.tableProData = res.data.data;
              console.log("商品数据："+ this.tableProData);
            }else{
              console.log("暂无数据");
            }
           })
      }
    },
    // 页面加载执行  （同create）
    mounted: function () {
      this.initData();
    }

  }
</script>

<style scoped>

  .add_dialog {

  }

  .addG_form .formItem {
    margin-left: 150px;
  }

  .g_input {
    width: 300px;
    float: left;
  }

</style>
