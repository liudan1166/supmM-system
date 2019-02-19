<template>
    <div class="goodsadd">
        <p>添加和编辑会员账号</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加编辑账号</span>
        </div>
        <div class="text item">
          <el-form size="mini" :model="goodsAddForm" status-icon :rules="rules" ref="goodsAddForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属分类:" prop="classify" >
              <el-select v-model="goodsAddForm.classify" placeholder="-----选择分类-----">
              <el-option label="食品" value="食品"></el-option>
              <el-option label="饮料" value="饮料"></el-option>
              <el-option label="生活用品" value="生活用品"></el-option>
              </el-select>
          </el-form-item>
         
          <el-form-item label="商品条形码:" prop="goodscode" >
              <el-input type="text" v-model="goodsAddForm.goodscode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品名称:" prop="goodsname" >
              <el-input type="text" v-model="goodsAddForm.goodsname" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="商品售价:" prop="goodssales"  >
              <el-input type="text" v-model="goodsAddForm.goodssales" autocomplete="off" ></el-input>
          </el-form-item>
             <el-form-item label="市场价:" prop="marketprice" >
              <el-input type="text" v-model="goodsAddForm.marketprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品进价:" prop="goodsprice" >
              <el-input type="text" v-model="goodsAddForm.goodsprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入库数量:" prop="stocknum" >
              <el-input type="text" v-model="goodsAddForm.stocknum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品重量:" prop="goodsweight" >
              <el-input type="text" v-model="goodsAddForm.goodsweight" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品单位:" prop="goodsunit" >
              <el-input type="text" v-model="goodsAddForm.goodsunit" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="会员优惠">
            <el-radio-group v-model="goodsAddForm.privilege">
              <el-radio label="享受"></el-radio>
              <el-radio label="不享受"></el-radio>
            </el-radio-group>
          </el-form-item>
            <el-form-item label="是否促销">
            <el-radio-group v-model="goodsAddForm.salespromotion">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
           <el-form-item label="商品简介">
            <el-input type="textarea" v-model="goodsAddForm.goodsabstract" width="100%"></el-input>
          </el-form-item>
         <el-form-item>
              <el-button type="primary" @click="submitForm('goodsAddForm')">添加</el-button>
              <el-button @click="resetForm('goodsAddForm')">重置</el-button>
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
.goodsadd {
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
            .el-select {
              input::-webkit-input-placeholder {
                color: #333;
              }
            }
          }
        }
      }
    }
  }
}
</style>


