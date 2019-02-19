<template>
    <div class="passwordmodify">
           
         <p>修改账号密码</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>修改账号密码</span>
        </div>
        <div class="text item">
         <el-form size="mini" :model="loginAddForm" status-icon :rules="rules" ref="loginAddForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码:" prop="password"  >
            <el-input type="text" v-model="loginAddForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newpassword" >
            <el-input type="text" v-model="loginAddForm.newpassword" autocomplete="off"></el-input>
        </el-form-item>
      <el-form-item label="新密码:" prop="checkPass" >
            <el-input type="text" v-model="loginAddForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginAddForm')">修改</el-button>
        </el-form-item>
        </el-form>
        </div>
        </el-card>
          <router-view/>
    </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    const checkSpecial = str => {
      var specialKey =
        "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
      for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != -1) {
          return false;
        }
      }
      return true;
    };
    // 原密码验证
    var checkoldpwd = (rule, value, callback) => {
      let username = window.localStorage.getItem("username");
      console.log(value)
      this.axios
        .get(
          `http://127.0.0.1:886/account/checkoldpwd?username=${username}&oldpwd=${value}`
        )
        .then(response => {
         let { error_code, reason } = response.data;
         if (error_code !== 0) {
            // 错误提示
            callback(new Error(reason));
          } else {
            // 正确的回调
            callback();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 新密码
    var Pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 10) {
        callback(new Error("密码长度为6 - 10位"));
      } else if (!checkSpecial(value)) {
        callback(new Error("密码不能包含特殊字符"));
      } else {
        if (this.loginAddForm.checkPass !== "") {
          this.$refs.loginAddForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 确认新密码
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.loginAddForm.newpassword) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      loginAddForm: {
        password: "",
        newpassword: "",
        checkPass: ""
      },
      rules: {
        password: [{ required: true, validator:checkoldpwd,trigger: "blur" }],
        newpassword: [{ required: true,  validator:Pass, trigger: "blur" }],
        checkPass: [{ required: true, validator: checkPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        let params={
          username:window.localStorage.getItem('username'),
          password:this.loginAddForm.password,
          newpassword:this.loginAddForm.newpassword
        }
        this.axios.post('http://127.0.0.1:886/account/savenewpwd',qs.stringify(params))
        .then(response=>{
         let {error_code, reason} = response.data;
         if(error_code === 0){
             // 清除token
                window.localStorage.removeItem("token");

                // 弹出提示
                this.$message({
                  type: "success",
                  message: reason
                });
                setTimeout(() => {
                  // 跳转到登录页面
                  this.$router.push("/login");
                }, 1000);
         }else{
            this.$message.error(reason);
         }
        })
        .catch(err=>{
          console.log(err)
        })
        } else {
          alert("失败！不可以提交给后端");
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
.passwordmodify {
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


