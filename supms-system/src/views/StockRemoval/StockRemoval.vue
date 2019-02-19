<template>
    <div class="stockremoval">
        <p>商品销售</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>商品销售</span>
        </div>
        <div class="text item">
          <!-- 上部表单 -->
            <el-form size="mini" :model="goodsAddForm" status-icon :rules="rules" ref="goodsAddForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="商品条形码:" prop="goodscode" >
              <el-input type="text" v-model="goodsAddForm.goodscode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品数量:" prop="stocknum" >
              <el-input type="text" v-model="goodsAddForm.stocknum" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item>
              <el-button type="primary" @click="submitForm('goodsAddForm')">加入订单</el-button>
          </el-form-item>
          </el-form>
         <!-- 表格 -->
        <el-table
          ref="multipleTable"
            :data="salestableData"
            style="width: 100%"
             @selection-change="handleSelectionChange"
             slot="append:lalal">
            <el-table-column
            type="selection"
            width="55">
            </el-table-column>
            <el-table-column
            prop="ordernum"
            label="名称"
    
          >
            </el-table-column>
            <el-table-column
            prop="salesname"
            label="数量"
            
           >
            </el-table-column>
            <el-table-column
            prop="num"
            label="单价(元)"
            >
            </el-table-column>
             <el-table-column
            prop="praticalsales"
            label="总价(元)">
            </el-table-column>
             <el-table-column
            prop="discount"
            label="优惠总价(元)"
            >
          </el-table-column>
         
          <el-table-column
           label="销售时间">
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
    <div slot="append" style="text-align: left" class="appendto">
    <!--在此处添加你想要插入在表格最后一行的内容-->
    总价: <span>0</span>元，优惠: <span>0</span>元， <span class="red">小计: <span >0</span>元</span>
</div>
  </el-table>
         <!-- 下部表单 -->
         <el-form size="mini" :model="goodsAddForm" status-icon :rules="rules" ref="goodsAddForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="会员卡号:" prop="goodscode" >
              <el-input type="text" v-model="goodsAddForm.goodscode" autocomplete="off"></el-input>
         <span>填写会员卡卡号</span>
          </el-form-item>
           <el-form-item>
              <el-button type="primary" @click="submitForm('goodsAddForm')">确认提交</el-button>
              
          </el-form-item>
        
          </el-form>
        </div>
        </el-card>
          <router-view/>
    </div>
</template>
<script>
import qs from 'qs';
export default {
  data() {
    // 价格正则
    const checkPrice = str => {
      var specialKey = "/^0(.d{1,2})?$/";
      for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != 1) {
          return false;
        }
      }
      return true;
    };
    // 验证呢个价格
    const saleprice = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入价格"));
      } else if (!checkPrice(value)) {
        callback(new Error("格式错误"));
      } else {
        callback();
      }
    };
    const price = (rule, value, callback) => {
      if (!checkPrice(value)) {
        callback(new Error("格式错误"));
      } else {
        callback();
      }
    };
    return {
      goodsAddForm: {
        classify: "",
        goodscode: "",
        goodsname: "",
        goodssales: "",
        marketprice: "",
        goodsprice: "",
        stocknum: "",
        goodsweight: "",
        goodsunit: "",
        privilege: "",
        salespromotion: "",
        goodsabstract: ""
      },
      rules: {
        classify: [{ required: true, message: "请选择分类", trigger: "change" }],
        goodscode: [
          { required: true, message: "请输入条形码", trigger: "blur" }
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ]
        // goodssales: [
        //    { required: true, validator: saleprice, trigger: "blur" }
        // ],
        //  marketprice: [
        //    { required: false, validator: price, trigger: "blur" }
        // ],
        // goodsprice:[
        //    { required: false, validator: price, trigger: "blur" }
        // ],
      }
    };
  },
  methods: {
    // 添加数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 获取值
          let params = {
           classify:this.goodsAddForm.classify,
           goodscode: this.goodsAddForm.goodscode,
            goodsname: this.goodsAddForm.goodsname,
            goodssales: this.goodsAddForm.goodssales,
            marketprice: this.goodsAddForm.marketprice,
            goodsprice: this.goodsAddForm.goodsprice,
            stocknum: this.goodsAddForm.stocknum,
            goodsweight: this.goodsAddForm.goodsweight,
            goodsunit: this.goodsAddForm.goodsunit,
            privilege: this.goodsAddForm.privilege,
            salespromotion: this.goodsAddForm.salespromotion,
            goodsabstract: this.goodsAddForm.goodsabstract
          };
          console.log(params)
          // 发送请求
          this.axios.post('http://127.0.0.1:886/goods/goodsadd',qs.stringify(params))
          .then(response=>{
            console.log(response.data )
            // 获取数据
            let {error_code , reason} =response.data;
            console.log(error_code,reason)
            if(error_code === 0){
              this.$message({
                type:"success",
                message:reason
              })
              this.$router.push('/goodsmanage')

            }else{
              this.$message.error(reason)
            }
          })
          .catch(err=>{
            console.log(err)
          })
       } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.stockremoval {
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
    .el-card__body {
      text-align: left;
      .el-form {
        width: 290px;
        .el-form-item {
          margin-bottom: 24px;
          .el-form-item__label {
            color: #333;
            font-weight: 700;
          }
          .el-form-item__content {
            .el-button--mini{
              padding:7px 7px;
            }
          }
        }
      }
         .el-table {
           margin-bottom: 32px;
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
        .el-table__append-wrapper{
         .appendto{
           line-height: 40px;
           .red{
             color: red
           }
         }
        }
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
}
</style>


