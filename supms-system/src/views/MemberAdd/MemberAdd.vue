<template>
    <div class="memberadd">
      <p>添加和编辑会员账号</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加编辑账号</span>
        </div>

        <div class="text item">
        <el-form size="mini" :label-position="labelPosition"  status-icon :rules="rules"  ref="memberFrom"  label-width="86px" :model="memberFrom">
            <el-form-item label="真实名字:"  prop="name">
              <br>
              <el-input class="forminput" v-model="memberFrom.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="会员卡卡号:"  prop="card">
              <br>
              <el-input  class="forminput"  v-model="memberFrom.card"></el-input>
            </el-form-item>

            <el-form-item label="用户组:" prop="usergroup">
              <el-select  class="usergroup" v-model="memberFrom.usergroup" placeholder="请选择会员类型">
                <el-option label="普通会员" value="普通会员"></el-option>
                <el-option label="超级会员" value="超级会员"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="身份证号:"  prop="identitycard">
              <el-input v-model="memberFrom.identitycard"></el-input>
            </el-form-item>

            <el-form-item label="用户状态:" prop="userstate">
              <el-radio-group v-model="memberFrom.userstate">
                <el-radio label="启用"></el-radio>
                <el-radio label="禁用"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="手机号码:"  prop="cellphonenumber">
              <el-input v-model="memberFrom.cellphonenumber"></el-input>
            </el-form-item>
            
             <el-form-item label="座机号码:"  prop="landlinenumber">
              <el-input v-model="memberFrom.landlinenumber"></el-input>
            </el-form-item>

             <el-form-item label="邮箱地址:"  prop="email">
              <el-input v-model="memberFrom.email"></el-input>
            </el-form-item>

            <el-form-item label="地区选择:" prop="areaselectio">
               <el-input v-model="memberFrom.areaselectio"></el-input>
            </el-form-item>

             <el-form-item label="详细地址:"  prop="detailedaddress">
              <el-input v-model="memberFrom.detailedaddress"></el-input>
            </el-form-item>
            
            <el-form-item label="邮政编码:"  prop="postalcode">
              <el-input v-model="memberFrom.postalcode"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button class="btn" type="primary" @click="submitForm('memberFrom')">添加</el-button>
            </el-form-item>
        </el-form>
        </div>
        </el-card>
    </div>
</template>
<script>
import qs from 'qs';
export default {
  data() {
    //会员卡卡号
    var card = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("请输入会员卡卡号"));
      } else {
        if (value.length !== 10) {
          callback(new Error("长度在10位"));
        }
        callback();
      }
    };
    //手机号码
    var cellphonenumber = (rules, value, callback) => {
      let str = /^1(3|4|5|7|8)\d{9}$/;
      if (!str.test(value)) {
        callback(new Error("格式错误"));
      } else {
        callback();
      }
    };
    //座机号码
    var landlinenumber = (rules, value, callback) => {
      var str = /0\d{2}-\d{7,8}/;
      if (!str.test(value)) {
        callback(new Error("格式错误"));
      } else {
        callback();
      }
    };
    //邮箱
    var email = (rules, value, callback) => {
      var str = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
       if (!str.test(value)) {
        callback(new Error("格式错误"));
      } else {
        callback();
      }
    };
    //邮政编码
    var postalcode = (rules, value, callback) => {
      var reg = /^[0-9]{6}$/;
        if (!reg.test(value)) {
        callback(new Error("格式错误"));
      } else {
        callback();
      }
    };
    //身份证
    var identitycard = (rules, value, callback) => {
      var str = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
       if (!str.test(value)) {
        callback(new Error("格式错误"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      memberFrom: {
        name: "",
        card: "",
        usergroup: "",
        identitycard: "",
        userstate: "",
        cellphonenumber: "",
        landlinenumber: "",
        email: "",
        areaselectio: "",
        detailedaddress: "",
        postalcode: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", tirgger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", tirgger: "blur" }
        ],
        card: [{ required: true, validator: card, tirgger: "blur" }],

        usergroup: [
          { required: true, message: "请选择用户组", tirgger: "change" }
        ],

        identitycard: [{ validator: identitycard, tirgger: "blur" }],

        cellphonenumber: [{ validator: cellphonenumber, tirgger: "blur" }],

        landlinenumber: [{ validator: landlinenumber, tirgger: "blur" }],

        email: [{ validator: email, tirgger: "blur" }],

        postalcode: [{ validator: postalcode, tirgger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(memberFrom) {
      this.$refs[memberFrom].validate(valid => {
        if (valid) {
          //收集数据
          let params = {
            name: this.memberFrom.name,
            card: this.memberFrom.card,
            usergroup: this.memberFrom.usergroup,
            identitycard: this.memberFrom.identitycard,
            userstate: this.memberFrom.userstate,
            cellphonenumber: this.memberFrom.cellphonenumber,
            landlinenumber: this.memberFrom.landlinenumber,
            email: this.memberFrom.email,
            areaselectio: this.memberFrom.areaselectio,
            detailedaddress: this.memberFrom.detailedaddress,
            postalcode: this.memberFrom.postalcode
          };
          //发送请求给后端
          this.axios.post('http://127.0.0.1:886/member/memberadd',qs.stringify(params))
            .then(response=>{
              //接收后端传来的提示
              let {error_code,reason} = response.data;
              if(error_code === 0){
                this.$message({
                  type:'success',
                  message:reason
                });
                this.$router.push('/MemberManage')
              }else{
                this.$message.error(reason)
              }
            })
            .catch(err=>{
              console.log(err)
            })
        }
      });
    }
  }
};
</script>
<style lang="less">
.memberadd {
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
      .text {
        width: 500px;
        .el-form {
          .el-form-item {
            .el-form-item__label {
              text-align: left;
            }
            .el-form-item__content {
              width: 250px;
              .forminput {
                margin-left: -90px;
              }
              .el-form-item__error {
                margin-left: -90px;
              }
              .el-select {
                .el-input__inner {
                  width: 120px;
                }
              }
              .el-radio-group {
                //  margin-left: -110px;
              }
              .btn {
                margin-left: -50px;
              }
            }
            .usergroup {
              // margin-left: -40px
            }
          }
        }
      }
    }
  }
}
</style>
