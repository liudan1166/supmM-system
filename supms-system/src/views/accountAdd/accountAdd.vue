<template>
    <div class="accountadd">
         <p>添加管理员账号</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加管理员账号</span>
        </div>
        <div class="text item">
         <el-form size="mini" :model="accountAddForm" status-icon :rules="rules" ref="accountAddForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名:" prop="username" >
            <el-input type="text" v-model="accountAddForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password" >
            <el-input type="text" v-model="accountAddForm.password" autocomplete="off"></el-input>
        </el-form-item>
      <el-form-item label="确认密码:" prop="checkPass" >
            <el-input type="text" v-model="accountAddForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
         <el-form-item label="选择用户组:" prop="usergroup" >
            <el-select v-model="accountAddForm.usergroup" placeholder="选择用户组">
            <el-option label="普通用户" value="普通用户"></el-option>
            <el-option label="高级管理员" value="高级管理员"></el-option>
            </el-select>
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
import qs from 'qs';
export default {
  data() {
    var Pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 10) {
        callback(new Error("密码长度为6 - 10位"));
      } else {
          if(this.accountAddForm.checkPass!==""){
              this.$refs.accountAddForm.validateField("checkPass")
          }
        callback();
      }
    };
    var checkPass=(rule,value,callback)=>{
        if(value === ""){
            callback(new Error("请输入密码"));
        }else if(value!==this.accountAddForm.password){
            callback(new Error("两次输入密码不一致"));
        }else{
            callback()
        }
    }
    return {
      accountAddForm: {
        username: "",
        password: "",
        checkPass:"",
        usergroup:""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
            { required: true, validator: Pass, trigger: "blur" }
        ],
        checkPass:[
            { required: true, validator: checkPass, trigger: "blur" }
        ],
        usergroup:[
            { required: true, message: "请选择用户组", trigger: "change" }
        ],

      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   收集账号和密码
          let params = {
            username: this.accountAddForm.username,
            password: this.accountAddForm.password,
            usergroup:this.accountAddForm.usergroup,
          };
          console.log(params)
          // 发送请求给后端验证是否正确
            this.axios.post('http://127.0.0.1:886/account/accountadd',qs.stringify(params))
             .then(response=>{
              //  console.log(response.data)
              //  接收错误码和提示信息
              let {error_code,reason}=response.data;
              // 判断
              if(error_code===0){
                // 成功
                this.$message({
                  type:'success',
                  message:reason
                });
              // 跳转到账号管理页面
              this.$router.push('/accountmanage')
              }else{
                this.$message.error(reason)
              }
             })
             .catch(err=>{
               console.log(err)
             })
        } else {
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
.accountadd {
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


