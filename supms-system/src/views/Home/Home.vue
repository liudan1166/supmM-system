<template>
 <div class="home">
     <p>查看详细的系统信息</p>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>系统信息</span>
  </div>
  <div class="text item">
    <el-alert class="blackTitle"
    title="商品总数：500，已经销售的总金额988，库存商品总价：98222"
    type="info"
    show-icon>
  </el-alert>
  <el-alert
    title="导入数据"
    type="success"
    show-icon>
  </el-alert>
  <el-row :gutter="35">
  <el-col :span="12">
    <div class="grid-content bg-purple">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>销售排行</span>
        </div>
        <div class="text item">
           <el-table
            :data="saleData"
            style="width: 100%"
            >
                <el-table-column
                prop="date"
                label="商品名称"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="销量"
                >
                </el-table-column>
            </el-table>
        </div>
</el-card>
    </div>
    </el-col>
  <el-col :span="12">
    <div class="grid-content bg-purple">
       <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>缺货的商品</span>
  </div>
  <div class="text item">
    <el-table
        :data="stockoutData"
        style="width: 100%"
    >
        <el-table-column
        prop="date"
        label="商品名称"
        >
        </el-table-column>
        <el-table-column
        prop="name"
        label="销量"
        >
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="small" type="text">入库</el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</el-card> 
    </div>
  </el-col>
</el-row>
  </div>
</el-card>
 </div>
</template>
<script>
export default {
  data() {
    return {
      saleData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        },
        {
          date: "2016-05-01",
          name: "王小虎"
        },
        {
          date: "2016-05-03",
          name: "王小虎"
        },
        {
          date: "2016-05-03",
          name: "王小虎"
        }
      ],
      stockoutData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        },
        {
          date: "2016-05-01",
          name: "王小虎"
        },
        {
          date: "2016-05-03",
          name: "王小虎"
        },
        {
          date: "2016-05-03",
          name: "王小虎"
        }
      ]
    };
  }
};
</script>
<style lang="less">
.home {
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
        .el-alert {
          margin-bottom: 20px;
          background: #dbe3ff;
          border: 1px solid #a2b4ee;
        }
        .blackTitle {
          .el-alert__content {
            .el-alert__title {
              color: #333;
            }
          }
        }
        .el-table {
          .has-gutter {
            tr {
              color: #333;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
</style>
