<template>
    <div class="login"> 
        <img src="http://127.0.0.1:8080/background.jpg" alt="" height="100%" width="100%">
        <div class="login-wrapper">      
             <p class="title">后台管理系统</p>
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
 
    <el-form-item label="账号" prop="username" label-width="70px">
        
        <el-input type="text" v-model="loginForm.username" autocomplete="off" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" label-width="70px">
        <el-input type="text" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
    </el-form-item>
    </el-form>
    </div>
    </div>
</template>
<script>
export default {
  data() {
      const checkPass = str =>{
          var specialKey =
        "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
        for (var i=0;i<str.length;i++){
            if(specialKey.indexOf(str.substr(i,1))!=-1){
                return false;
            }
        }
        return true;
      }
    var Pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(value.length<6 || value.length>10){
          callback(new Error('密码长度为6 - 10位'))
      }else if(!checkPass(value)){
            callback(new Error('密码不能包含特殊字符'))
      }else{
          callback()
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, validator: Pass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("成功！可以提交给后端");
        //   收集账号和密码
        let params ={
            username:this.loginForm.username,
            password:this.loginForm.password
        }
        // 发送请求给后端验证是否正确
        // 跳转到首页
        this.$router.push("/")
        } else {
         alert("失败！不可以提交给后端")
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
.login {
  height: 100%;
  width: 100%;
  text-align: center;
  .login-wrapper {
    width: 350px;
    height: 280px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background: hsla(0, 0%, 100%, 0.2);
    padding: 0;
    .title {
      margin: 0;
      height: 50px;
      line-height: 50px;
      text-align: center;
      border-bottom: 1px solid #ddd;
      font-size: 20px;
      color: #fff;
      font-weight: 500px;
    }
    .el-form {
      width: 350px;
      padding-top: 40px;
      .el-form-item {
        height: 32px;
        .el-form-item__label {
          text-align: center;
          padding: 0;
          width: 30px;
          color: #fff;
        }
        .el-form-item__content {
          height: 32px;
          margin-right: 30px;
          margin-left: 0;
          .el-input {
            height: 32px;
            margin-right: 30px;
            .el-input__inner {
              height: 32px;
            }
          }
          .el-button {
            height: 32px;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>


