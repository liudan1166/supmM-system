<template>
     <el-menu
        :default-active="this.$route.path"
        unique-opened
        active-text-color="rgb(64, 158, 255)"
        background-color="#2d3a4b"
        router
        >
        <el-submenu index="1">
            <template slot="title">
            <i class="el-icon-setting"></i>系统管理
            </template>
            <el-menu-item index="/">系统信息</el-menu-item>
        </el-submenu>
            <el-submenu index="2">
            <template slot="title">
            <i class="el-icon-menu"></i>账号管理
            </template>
            <el-menu-item index="/accountmanage">账号管理</el-menu-item>
                <el-menu-item index="/accountadd">添加账号</el-menu-item>
                <el-menu-item index="/passwordmodify">密码修改</el-menu-item>
        </el-submenu>
            <el-submenu index="3">
            <template slot="title">
            <i class="el-icon-goods"></i>商品管理
            </template>
            <el-menu-item index="goodsmanage">商品管理</el-menu-item>
            <el-menu-item index="goodsadd">添加商品</el-menu-item>
        </el-submenu>
            <el-submenu index="4">
            <template slot="title">
            <i class="el-icon-date"></i>统计管理
            </template>
            <el-menu-item index="StatisticalControl">统计管理</el-menu-item>
            <el-menu-item index="salestatistics">销售统计</el-menu-item>
        </el-submenu>
            <el-submenu index="5">
            <template slot="title">
            <i class="el-icon-edit"></i>进货管理
            </template>
            <el-menu-item index="stockcontrol">库存管理</el-menu-item>
            <el-menu-item index="stockadd">添加库存</el-menu-item>
        </el-submenu>
            <el-submenu index="6">
            <template slot="title">
            <i class="el-icon-edit-outline"></i>出货管理
            </template>
            <el-menu-item index="salelist">销售列表</el-menu-item>
            <el-menu-item index="stockremoval">商品出库</el-menu-item>
            <el-menu-item index="salereturn">商品退货</el-menu-item>
        </el-submenu>
        <el-submenu index="7">
            <template slot="title">
            <i class="el-icon-edit-outline"></i>会员管理
            </template>
            <el-menu-item index="membermanage">添加账号</el-menu-item>
            <el-menu-item index="memberadd">账号管理</el-menu-item>
        </el-submenu>
        </el-menu>
</template>
<script>
export default {
    methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less">
.el-menu {
  height:100%;
  border:none;
  .el-submenu {
      text-indent:6px;
    .el-submenu__title {
      color: rgb(191, 203, 217);
      font-size: 16px;

    }
  }
  .el-menu-item {
    color: rgb(191, 203, 217);
  }
}
</style>
