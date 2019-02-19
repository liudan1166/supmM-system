<template>
    <div class="goodsmanage">
       <p>查看和管理所有已有商品</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>商品管理</span>
        </div>
        <div class="text item">
           <el-form :inline="true" :model="goodsmanageForm" size="small " class="demo-form-inline">
           <el-form-item label="订单号:" prop="ordernum" >
              <el-input type="text" v-model="goodsmanageForm.ordernum" autocomplete="off"></el-input>
          </el-form-item>
           <el-button type="primary" size="small ">查询</el-button>
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
      goodsmanageForm: {
        ordernum: "",
      },
    };
  },
  methods: {
  }
};
</script>
<style lang="less">
.goodsmanage {
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
    
  }
}
</style>


