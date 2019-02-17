<template>
    <div class="accountmanage">
        <p>查看所有管理员账号</p>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>账号管理</span>
  </div>
  <div class="text item">
        <el-table
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      >
      <!-- 单选框 -->
      <el-table-column
      type="selection"
       width="55">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名称"
        >
      </el-table-column>
      <el-table-column
        prop="usergroup"
        label="用户组"
      >
      </el-table-column>
      <el-table-column
        label="创建日期"
        >
        <template slot-scope="scope">{{ scope.row.ctime | filterctime }}</template>
        </el-table-column>
        <!-- 操作 -->
       <el-table-column label="管理">
      <template slot-scope="scope">
           <el-button type="primary" size="mini"
          @click="handleEdit(scope.row.id)"
          >
          <i class="el-icon-edit"></i>  编辑
          </el-button>
            <el-button type="danger"  size="mini"
             @click="handleDelete(scope.row.id)">
             <i class="el-icon-delete"></i>  删除
            </el-button>
      </template>
    </el-table-column>
    </el-table>
    <div class="block" style="margin-top:20px;"> 
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[3, 5, 7, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
     <!-- 批量删除 -->
  <div style="margin-top: 20px">
      <el-button @click="batchremove()">批量删除</el-button>
      <el-button @click="unselect()">取消选择</el-button>
  </div>
  <!-- 模态框 -->
    <el-dialog title="账号修改" :visible.sync="flag" width="400px" >
  <el-form :model="editForm" status-icon :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名:" prop="username" >
        <el-input type="text" v-model="editForm.username" autocomplete="off" style="width:200px"></el-input>
    </el-form-item>
     <el-form-item label="选择用户组:" prop="usergroup">
        <el-select v-model="editForm.usergroup" placeholder="请选择用户组">
        <el-option label="普通用户" value="普通用户"></el-option>
        <el-option label="高级管理员" value="高级管理员"></el-option>
        </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="flag = false">取 消</el-button>
    <el-button type="primary" @click="saveEdit()">确 定</el-button>
  </div>
</el-dialog>

  </div>
</el-card>
    </div>
</template>
<script>
import moment from "moment";
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      flag: false,
      editForm: {
        username: "",
        usergroup: "",
      },
      editid: "",
      selectedAccount: [],
      currentPage:1,//当前页数，支持 .sync 修饰符
      pageSize:5,//每页显示条目个数，支持 .sync 修饰符
      total:11,//总条目数
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  // 创建钩子函数。自动触发，发送ajax请求获取数据
  created() {
    this.getAccountList();
  },

  methods: {
    // 项目页面更新
    // getAccountList() {
    //   this.axios
    //     .get("http://127.0.0.1:886/account/accountlist")
    //     .then(response => {
    //       console.log(response.data);
    //       this.tableData = response.data;
    //       console.log(tableData.ctime);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    getAccountListByPage(){
      // 收集当前页码和每页条数
      let pageSize= this.pageSize;
      let currentPage = this.currentPage;
      this.axios.get('http://127.0.0.1:886/account/getAccountListByPage',{
        params:{
          pageSize,
          currentPage
        }
      })
    },
    handleSelectionChange(val) {
      this.selectedAccount = val;
      console.log(val);
    },
    // 删除数据
    handleDelete(id) {
      this.$confirm("你确定要删除吗？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get(`http://127.0.0.1:886/account/accountdel?id=${id}`)
            .then(response => {
              let { error_code, reason } = response.data;
              // 判断
              if (error_code === 0) {
                // 成功
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getAccountList();
              } else {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改数据
    handleEdit(id) {
      this.editid = id;
      this.axios
        .get(`http://127.0.0.1:886/account/accountedit?id=${id}`)
        .then(response => {
          //  回填数据
          let result = response.data[0];
          this.editForm.username = result.username;
          this.editForm.usergroup = result.usergroup;
          this.flag = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存修改数据
    saveEdit() {
      let params = {
        username: this.editForm.username,
        usergroup: this.editForm.usergroup,
        editid: this.editid
      };
      this.axios
        .post(
          "http://127.0.0.1:886/account/accounteditsave",
          qs.stringify(params)
        )
        .then(response => {
          let { error_code, reason } = response.data;
          console.log(error_code, reason);
          if (error_code === 0) {
            // 弹出成功的提示
            this.$message({
              type: "success",
              message: reason
            });
            this.getAccountList();
          } else {
            // 弹出失败的提示
            this.$message.error(reason);
          }
          this.flag = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分页
    // 获取每页的条数值
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`);

    },
    // 获取每页值
    handleCurrentChange(val) {
      this.currentPage = val
      console.log(`当前页: ${val}`);
    },
    // 批量删除
    batchremove() {
      let selectid = this.selectedAccount.map(v => v.id);
      if (!selectid.length) {
        this.$message.error("请选择后在操作！");
        return;
      }
      // 确认框
      this.$confirm("你确定要删除吗？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get(`http://127.0.0.1:886/account/batchremove`, {
              params: {
                selectid
              }
            })
            .then(response => {
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getAccountList();
              } else {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 取消选择
    unselect() {
      this.$refs.multipleTable.clearSelection();
    }
  },
  // 过滤器--过滤时间
  filters: {
    filterctime(ctime) {
      return moment(ctime).format("YYYY/MM/DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
.accountmanage {
  p {
    color: #333;
    font-size: 16px;
  }
  .el-card {
    .el-card__header {
      background: #f1f1f1;
      font-size: 20px;
      color: #333;
      font-weight: bold;
    }
    .el-table {
      .has-gutter {
        tr {
          color: #333;
          font-size: 16px;
        }
      }
    }
    .el-card__body {
      .el-dialog__wrapper {
        .el-dialog__header {
          font-weight: 600;
          text-align: center;
          .el-dialog__title {
            color: #333;
            font-size: 22px;
          }
        }
        .el-dialog__body {
          padding-bottom: 0;
          .el-form {
            .el-form-item {
              margin-bottom: 28px;
              .el-form-item__label {
                color: #333;
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
}
</style>


