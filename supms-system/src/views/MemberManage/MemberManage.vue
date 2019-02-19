<template>
    <div class="membermanage">
        <p>会员卡用户管理</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>会员管理</span>
        </div>
        <div class="text item">
            <!-- 搜索 -->
        <el-form size="mini" :model="submitForm" label-width="44px" class="demo-ruleForm">
             <el-form-item label="搜索:">
                <el-input v-model="submitForm.keyword" autocomplete="off"></el-input>
                <span> 会员卡，会员名，手机，电话 </span>
            <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
        </el-form>
        <span class="line"></span>

        <!-- 表格数据 -->
         <el-table
            ref="memberTable"
                :data="memberTable"
                tooltip-effect="dark"
                style="width: 100%"
               @selection-change="handleSelectionChange">

            <el-table-column
            type="selection"
            width="55">
            </el-table-column>

            <el-table-column
            prop="card"
            label="会员卡卡号"
            >
            </el-table-column>

            <el-table-column
            prop="name"
            label="会员姓名">
            </el-table-column>

            <el-table-column
            prop="usergroup"
            label="会员等级">
            </el-table-column>

            <el-table-column
            prop="integral"
            label="会员积分">
            </el-table-column>

            <el-table-column
            prop="discount"
            label="折扣">
            </el-table-column>

            <el-table-column
            prop="cellphonenumber"
            label="手机号">
            </el-table-column>

            <el-table-column
            prop="landlinenumber"
            label="座机号">
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 3, 5, 10,20,50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 修改的弹出框 -->
      <el-dialog title="会员修改" width="600px" :visible.sync="flag">
        
        <!-- 会员卡卡号 -->
        <el-form :model="editFrom" label-width='90px'>
          <el-form-item label="会员卡卡号">
            <el-input style="width:217px" v-model="editFrom.card" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 会员名字 -->
          <el-form-item label="会员名字">
            <el-input style="width:217px" v-model="editFrom.name" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 会员等级 -->
         <el-form-item label="会员等级:" prop="usergroup">
              <el-select style="width:217px"  class="usergroup" v-model="editFrom.usergroup" placeholder="请选择会员类型">
                <el-option label="普通会员" value="普通会员"></el-option>
                <el-option label="超级会员" value="超级会员"></el-option>
              </el-select>
            </el-form-item>
          <!-- 会员折扣 -->
          <el-form-item label="会员折扣" >
            <el-input style="width:217px" v-model="editFrom.discount" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 手机号码 -->
          <el-form-item label="手机号码">
            <el-input style="width:217px" v-model="editFrom.cellphonenumber" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 座机号码 -->
          <el-form-item label="座机号码">
            <el-input style="width:217px" v-model="editFrom.landlinenumber" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click=" flag=false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </div>
      </el-dialog>


        </div>
        </el-card>
    </div>

</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      //查询的数据
      submitForm: {
        keyword:""
      },
      //会员数据
      memberTable: [],
      currentPage: 1,//页码
      pageSize:3,//每页条数
      total:0, //
      flag:false,
      //修改表单数据
      editFrom:{
        card: "",
        name: "",
        cellphonenumber: "",
        landlinenumber: "",
        usergroup:"",
        discount:""
      },
      editId:""
    };
  },
  //生命周期
  created() {
    this.getMemberListByPage();
  },
  methods: {
    //请求所有账号的数据函数
    // getMemberList() {
    //   this.axios
    //     .get("http://127.0.0.1:886/member/memberlist")
    //     .then(response => {
    //       //把所有后端返回来的数据赋值给用户账号表格数据
    //       this.memberTable = response.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    //分页显示数据
    getMemberListByPage(){
      //获取当前页码和条数
      let currentPage = this.currentPage
      let pageSize = this.pageSize

      //发送请求给后台
      this.axios.get('http://127.0.0.1:886/member/memberlistbypage',{
        params:{
          currentPage,
          pageSize
        }
      })
        .then(response=>{
          //接收数据
          let {data,total} = response.data;
          //赋值
          this.total = total;
          this.memberTable = data;
          //如果当前页没有数据就排除第一页
          if(!data.length && this.currentPage !== 1){
            //页码减一
            this.currentPage -= 1;
            this.getMemberListByPage();
          }
        })
        .catch(err=>{
          console.log(err)
        })
    },
    //搜索
    search() {
      let params = {
        keyword:this.submitForm.keyword,
      }
      //发送请求
      this.axios.post('http://127.0.0.1:886/member/search',qs.stringify(params))
        .then(response=>{
          console.log(response.data)
        })
        .catch(err=>{
          console.log(err)
        })
    },
    //编辑
    handleEdit(id) {
      //保存id
      this.editId = id;

      this.flag = true;
      //发送请求
      this.axios.get(`http://127.0.0.1:886/member/memberedit?id=${id}`)
        .then(response=>{
          let result = response.data[0];
          //回填表单
          this.editFrom.card =result.card
          this.editFrom.name =result.name
          this.editFrom.cellphonenumber =result.cellphonenumber
          this.editFrom.landlinenumber =result.landlinenumber
          this.editFrom.usergroup =result.usergroup
          this.editFrom.discount =result.discount
        
        })
        .catch(err=>{
          console.log(err)
        })
    },
    //保存修改
    saveEdit(){
      //收集原来的数据和id
      let params = {
         card: this.editFrom.card,
        name: this.editFrom.name,
        cellphonenumber: this.editFrom.cellphonenumber ,
        landlinenumber: this.editFrom.landlinenumber,
        usergroup:this.editFrom.usergroup,
        discount:this.editFrom.discount,
        editId:this.editId
      }
    
      //发送请求
      this.axios.post('http://127.0.0.1:886/member/membereditsave',qs.stringify(params))
        .then(response=>{
          //接收后端发送的提示
          let {error_code,reason} = response.data;
          if(error_code ===0){
            this.$message({
              type:'success',
              message:reason
            });
            this.flag = false;
            this.getMemberListByPage()
          }else{
            this.$message.error(reason)
          }
        })
        .catch(err=>{
          console.log(err)
        })
    },
    //删除
    handleDelete(id) {
       //删除账号的提示新信息
      this.$confirm("你确定要删除码？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送ajax请求给后端
          this.axios
            .get(`http://127.0.0.1:886/member/memberdel?id=${id}`)
            .then(response => {
              //接收后端返回的提示
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getMemberListByPage()
              } else {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
     handleSelectionChange(val) {
      this.editFrom = val;
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getMemberListByPage();
    },
    handleCurrentChange(val) {
     this.currentPage = val;
     this.getMemberListByPage()
    }
  }
};
</script>
<style lang="less">
.membermanage {
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
      .el-form {
        width: 400px;
        .el-form-item__content {
          width: 400px;
          .el-input {
            width: 150px;
          }
        }
      }
      .line {
        border: 1px solid #ccc;
        display: inline-block;
        width: 100%;
        height: 2px;
      }
    }
  }
}
</style>
