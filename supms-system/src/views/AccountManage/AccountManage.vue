<template>
    <div class="accountmanage">
        <p>查看所有管理员账号</p>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>账号管理</span>
  </div>
  <div class="text item">
        <el-table
      :data="tableData"
      style="width: 100%">
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
       <el-table-column label="管理">
      <template slot-scope="scope">
           <el-button type="primary" size="mini"
          @click="handleEdit(scope.row.id)">
          <i class="el-icon-edit"></i>  编辑
          </el-button>
            <el-button type="danger"  size="mini"
             @click="handleDelete(scope.row.id)">
             <i class="el-icon-delete"></i>  删除
            </el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</el-card>
    </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      tableData: []
    };
  },
  // 创建钩子函数。自动触发，发送ajax请求获取数据
  created() {
    this.getAccountList();
  },

  methods: {
    getAccountList() {
      this.axios
        .get("http://127.0.0.1:886/account/accountlist")
        .then(response => {
          console.log(response.data);
          this.tableData = response.data;
          console.log(tableData.ctime);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
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
    handleEdit(index, row) {
      console.log(index, row);
    },
  },
  // 过滤器
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

          th {
            text-align: center;
          }
        }
      }
      .el-table__body {
        td {
          text-align: center;
        }
      }
    }
  }
}
</style>


