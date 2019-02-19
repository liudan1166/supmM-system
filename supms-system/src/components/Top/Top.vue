<template>
    <div class="top">
        <el-row>
            <el-col :span="18"><div class="title">
                <i class="el-icon-menu"></i>
                华联超市管理系统
                </div>
            </el-col>
            <el-col :span="6">
                <div >
                <el-row>
                    <el-col :span="10"><div >欢迎您！</div></el-col>
                    <el-col :span="4"><div class="avatar">
                        <img height="100%" width="100%" :src="avatarUrl" alt="">
                        </div></el-col>
                    <el-col :span="10">
                        <div >
                          <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link"  >
                                {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" >
                                <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
                </div>
            </el-col>
        </el-row> 
    </div>
</template>
<script>
export default {
  data() {
    return {
      username: "李寻欢",
      avatarUrl: "http://127.0.0.1:8080/avatar.jpg"
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        // 清除token
        window.localStorage.removeItem("token");
        this.$message({
          type: "success",
          message: "欢迎回来!"
        });
        setImmediate(()=>{
            // 跳转登录页面
            this.$router.push('/login')
        },1000)
      }
    }
  },
  created(){
      this.username =window.localStorage.getItem('username')
  }
};
</script>
<style lang="less">
.top {
  .el-row {
    .el-col {
      .title {
        font-size: 22px;
      }
      .el-dropdown {
        color: #fff;
      }
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: 10px;
        img {
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
