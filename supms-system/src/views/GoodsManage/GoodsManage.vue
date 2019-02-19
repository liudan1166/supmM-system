<template>
    <div class="goodsmanage">
       <p>查看和管理所有已有商品</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>商品管理</span>
        </div>
        <div class="text item">
           <el-form :inline="true" :model="goodsmanageForm" size="small " class="demo-form-inline">
            <el-form-item prop="clasify" size="small " >
              <el-select v-model="goodsmanageForm.clasify" placeholder="-----选择分类-----">
              <el-option label="食品" value="食品"></el-option>
              <el-option label="饮料" value="饮料"></el-option>
              <el-option label="生活用品" value="生活用品"></el-option>
              </el-select>
          </el-form-item>
           <el-form-item label="关键字:" prop="keyword" >
              <el-input type="text" v-model="goodsmanageForm.keyword" autocomplete="off"></el-input>
          </el-form-item>
        <span class="goodscode">(商品名称，条形码）</span>
           <el-button type="primary" size="small ">查询</el-button>
           </el-form>
          <el-table
          ref="multipleTable"
            :data="tableData"
            style="width: 100%"
             @selection-change="handleSelectionChange">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="goodscode"
            label="商品条形码"
    
          >
            </el-table-column>
            <el-table-column
            prop="goodsname"
            label="商品名称"
            
           >
            </el-table-column>
            <el-table-column
            prop="classify"
            label="所属分类"
            >
            </el-table-column>
             <el-table-column
            prop="goodssales"
            label="售价(元）">
            </el-table-column>
             <el-table-column
            prop="promotionprice"
            label="促销价(元）"
            >
            </el-table-column>
             <el-table-column
            prop="marketprice"
            label="市场价(元）"
         >
            </el-table-column>
              <el-table-column
            prop="stocknum"
            label="库存">
            </el-table-column>
              <el-table-column
            prop="inventoryPrice"
            label="库存总额(元)">
            </el-table-column>
              <el-table-column
            prop="salePrice"
            label="销售总额(元)">
            </el-table-column>
             <el-table-column
           label="创建日期"
             >
        <template slot-scope="scope">{{ scope.row.ctime |filterctime }}</template>
        </el-table-column>
             <el-table-column label="管理">
      <template slot-scope="scope">
           <el-button type="primary" icon="el-icon-edit" circle  size="mini"
          @click="handleEdit(scope.row.id)">
          </el-button>
            <el-button type="danger" icon="el-icon-delete" circle  size="mini"
             @click="handleDelete(scope.row.id)">
            </el-button>
      </template>
    </el-table-column>
  </el-table>
      <div class="block" style="margin-top:20px;"> 
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 7, 8, 9]"
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
    <el-dialog title="商品信息修改" :visible.sync="flag" width="400px" >
  <el-form  :model="editForm" status-icon :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="商品售价:" prop="goodssales" >
        <el-input type="text" v-model="editForm.goodssales" autocomplete="off" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="市场价:" prop="marketprice" >
        <el-input type="text" v-model="editForm.marketprice" autocomplete="off" style="width:200px"></el-input>
    </el-form-item>
    <el-form-item label="库存:" prop="stocknum" >
        <el-input type="text" v-model="editForm.stocknum" autocomplete="off" style="width:200px"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="flag = false">取 消</el-button>
    <el-button type="primary" @click="saveEdit">确 定</el-button>
  </div>
</el-dialog>
    </div>
   </el-card>
        <router-view/>
  </div>
</template>
<script>
import moment from "moment";
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      goodsmanageForm: {
        clasify: "",
        keyword: ""
      },
      currentPage: 1,
      pageSize: 5,
      total: 11,
      editid: "",
      editForm: {
        goodssales: "",
        marketprice: "",
        stocknum: ""
      },
      flag: false,
      selectedgoods:[],
      rules: {}
    };
  },
  created() {
    this.getGoodslistByPage();
  },
  methods: {
    // 分页
    getGoodslistByPage() {
      let currentPage = this.currentPage;
      let pageSize = this.pageSize;
      this.axios
        .get("http://127.0.0.1:886/goods/getGoodslistByPage", {
          params: {
            currentPage,
            pageSize
          }
        })
        .then(response => {
          let { total, data } = response.data;
          this.total = total;
          this.tableData = data;
          if (!data.length && this.currentPage != 1) {
            this.currentPage -= 1;
            this.getGoodslistByPage;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取每页的条数值
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.getGoodslistByPage();
    },
    // 获取每页值
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      this.getGoodslistByPage();
    },
    // 删除
    handleDelete(id) {
      this.$confirm("你确定要删除吗？?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get(`http://127.0.0.1:886/goods/goodsdel?id=${id}`)
            .then(response => {
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                // 成功
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getGoodslistByPage();
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
    // 编辑
    handleEdit(id) {
      this.editid = id;
      this.flag = true;
      // 发送请求
      this.axios
        .get(`http://127.0.0.1:886/goods/goodsedit?id=${id}`)
        .then(response => {
          //  接收回填数据
          let result = response.data[0];
          console.log(result);
          this.editForm.goodssales = result.goodssales;
          this.editForm.marketprice = result.marketprice;
          this.editForm.stocknum = result.stocknum;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 保存修改
    saveEdit() {
      //  数据
      console.log(1);
      let params = {
        goodssales: this.editForm.goodssales,
        marketprice: this.editForm.marketprice,
        stocknum: this.editForm.stocknum,
        editid: this.editid
      };
      console.log(params);
      this.axios
        .post("http://127.0.0.1:886/goods/goodssaveedit", qs.stringify(params))
        .then(response => {
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
     handleSelectionChange(val) {
      this.selectedgoods = val;
      console.log(val);
    },
    // 批量删除
    batchremove(){
 let selectid = this.selectedgoods.map(v => v.id);
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
            .get(`http://127.0.0.1:886/goods/batchremove`, {
              params: {
                selectid
              }
            })
            .then(response => {
              console.log(response)
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
               this.getGoodslistByPage()
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
  filters: {
    filterctime(ctime) {
      return moment(ctime).format("YYYY/MM/DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
.goodsmanage {
  p {
    color: #333;
    font-size: 16px;
  }
  .demo-form-inline {
    border-bottom: double;
    border-color: #ccc;
    .goodscode {
      display: inline-block;
      vertical-align: middle;
      line-height: 32px;
      font-size: 14px;
    }
    .el-form-item__content {
      .el-select {
        width: 140px;
        input::-webkit-input-placeholder {
          color: #333;
        }
      }
    }
  }
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
      .el-table__body-wrapper {
        .el-table__body {
          tbody {
            tr {
              td {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>


