<template>
    <div class="salestatistics">
        <p>添加和编辑会员账号</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加编辑账号</span>
        </div>
        <div class="text item">
        


        
        </div>
        </el-card>
          <router-view/>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
.salestatistics{
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


