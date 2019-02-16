<template>
    <el-container> 
        <!-- 头部 -->
      <el-header height="70px">
      <Top></Top>
      </el-header>
    <el-container  height="100%">
        <!-- 导航 -->
    <el-aside width="250px"> 
        <Nav></Nav>
    </el-aside>
    <el-container>
        <!-- 中部 -->
      <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
      </el-main>
      <!-- 底部 -->
      <el-footer>
          <Bottom></Bottom>
      </el-footer>
    </el-container>
  </el-container>
</el-container>
</template>
<script>
// 引入导航组件
import Nav from "@/components/Nav/Nav.vue";
import Top from "@/components/Top/Top.vue";
import Bottom from "@/components/Bottom/Bottom.vue";
export default {
  components: {
    Nav,
    Top,
    Bottom
  },
 
};
</script>
<style lang="less">
.el-container {
  height: 100%;
  .el-aside{
        height: 100%;
  }
  .el-header,
  .el-footer {
    background-color: #ccc;
    line-height: 70px;
  }
  .el-header {
    background-color: #242f42;
    font-size: 16px;
    color: #fff;
    
  }
  .el-main {
    color: #333;
  }
  .el-footer{
    background:#fff;
  }
}
</style>
