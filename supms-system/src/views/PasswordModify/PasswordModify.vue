<template>
    <div class="passwordmodify">
           
         <p>修改账号密码</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>修改账号密码</span>
        </div>
        <div class="text item">
         <el-form size="mini" :model="accountAddForm" status-icon :rules="rules" ref="accountAddForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码:" prop="password"  >
            <el-input type="text" v-model="accountAddForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="newpassword" >
            <el-input type="text" v-model="accountAddForm.newpassword" autocomplete="off"></el-input>
        </el-form-item>
      <el-form-item label="新密码:" prop="checkPass" >
            <el-input type="text" v-model="accountAddForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
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
    var Pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 10) {
        callback(new Error("密码长度为6 - 10位"));
      } else {
        if (this.accountAddForm.checkPass !== "") {
          this.$refs.accountAddForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      accountAddForm: {
        password: "",
        newpassword:"",
        checkPass: "",
      },
      rules: {
        password: [{ required: true, validator: Pass, trigger: "blur" }], 
        newpassword: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入新密码", trigger: "biur" }
          ],
       
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("成功！可以提交给后端");
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


