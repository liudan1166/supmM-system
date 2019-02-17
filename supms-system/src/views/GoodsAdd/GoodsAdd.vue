<template>
    <div class="goodsadd">
        <p>添加和编辑会员账号</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加编辑账号</span>
        </div>
        <div class="text item">
          <el-form size="mini" :model="goodsAddForm" status-icon :rules="rules" ref="accountAddForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="所属分类:" prop="clasify" >
              <el-select v-model="goodsAddForm.clasify" placeholder="--选择分类--">
              <el-option label="普通用户" value="普通用户"></el-option>
              <el-option label="高级管理员" value="高级管理员"></el-option>
              </el-select>
          </el-form-item>
         
          <el-form-item label="商品条形码:" prop="goodscode" >
              <el-input type="text" v-model="goodsAddForm.goodscode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品名称:" prop="goodsname" >
              <el-input type="text" v-model="goodsAddForm.goodsname" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="商品售价:" prop="goodssales" >
              <el-input type="text" v-model="goodsAddForm.goodssales" autocomplete="off" ></el-input>
          </el-form-item>
             <el-form-item label="市场价:" prop="marketprice" >
              <el-input type="text" v-model="goodsAddForm.marketprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品进价:" prop="goosprice" >
              <el-input type="text" v-model="goodsAddForm.goosprice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入库数量:" prop="stocknum" >
              <el-input type="text" v-model="goodsAddForm.stocknum" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品重量:" prop="goodsweight" >
              <el-input type="text" v-model="goodsAddForm.goodsweight" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品单位:" prop="goodunit" >
              <el-input type="text" v-model="goodsAddForm.goodunit" autocomplete="off"></el-input>
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
              <el-button type="primary" @click="submitForm('accountAddForm')">添加</el-button>
              <el-button @click="resetForm('accountAddForm')">重置</el-button>
          </el-form-item>
          </el-form>

        </div>
        </el-card>
          <router-view/>
    </div>
</template>
<script>
export default {
  data() {
    return {
      goodsAddForm: {
        clasify: "",
        goodscode: "",
        goodsname: "",
        goodssales: "",
        marketprice: "",
        goosprice: "",
        stocknum: "",
        goodsweight: "",
        goodunit: "",
        privilege: "",
        salespromotion: "",
        goodsabstract: ""
      },
      rules: {}
    };
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
        }
      }
    }
  }
}
</style>


