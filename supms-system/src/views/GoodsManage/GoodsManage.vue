<template>
    <div class="goodsmanage">
       <p>查看和管理所有已有商品</p>
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>商品管理</span>
        </div>
        <div class="text item">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
            prop="goodscode"
            label="商品条形码"
    
          >
            </el-table-column>
            <el-table-column
            prop="name"
            label="商品名称"
            
           >
            </el-table-column>
            <el-table-column
            prop="classify"
            label="所属分类"
            >
            </el-table-column>
             <el-table-column
            prop="price"
            label="售价(元）">
            </el-table-column>
             <el-table-column
            prop="promotionprice"
            label="促销价(元）"
         
            >
            </el-table-column>
             <el-table-column
            prop="marketprice"
            label="市场价(元）"
         >
            </el-table-column>
              <el-table-column
            prop="inventory"
            label="库存">
            </el-table-column>
              <el-table-column
            prop="inventoryPrice"
            label="库存总额">
            </el-table-column>
              <el-table-column
            prop="salePrice"
            label="销售总额">
            </el-table-column>
             <el-table-column label="管理">
      <template slot-scope="scope">
           <el-button type="primary" icon="el-icon-edit" circle  size="mini"
          @click="handleEdit(scope.$index, scope.row)">
          </el-button>
            <el-button type="danger" icon="el-icon-delete" circle  size="mini"
             @click="handleDelete(scope.$index, scope.row)">
            </el-button>
      </template>
    </el-table-column>
        </el-table>
        </div>
        </el-card>
          <router-view/>
    </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          goodscode: "69119826549",
          name: "我的优乐美",
          classify: "优乐美",
          price: 10,
          promotionprice: "未促销",
          marketprice: 30,
          inventory: 0,
          inventoryPrice: 0.0,
          salePrice: 7.0
        },
        {
          goodscode: "69119826549",
          name: "我的优乐美",
          classify: "优乐美",
          price: 10,
          promotionprice: "未促销",
          marketprice: 30,
          inventory: 0,
          inventoryPrice: 0.0,
          salePrice: 7.0
        },
        {
          goodscode: "69119826549",
          name: "我的优乐美",
          classify: "优乐美",
          price: 10,
          promotionprice: "未促销",
          marketprice: 30,
          inventory: 0,
          inventoryPrice: 0.0,
          salePrice: 7.0
        },
        {
          goodscode: "69119826549",
          name: "我的优乐美",
          classify: "优乐美",
          price: 10,
          promotionprice: "未促销",
          marketprice: 30,
          inventory: 0,
          inventoryPrice: 0.0,
          salePrice: 7.0
        }
      ]
    };
  }
};
</script>
<style lang="less">
.goodsmanage {
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
    .el-table {
      .has-gutter {
        tr {
          color: #333;
          font-size: 16px;
          th {
            text-align: center;
          }
        }
      }
      .el-table__body-wrapper {
        .el-table__body {
          tbody {
            tr {
              td {
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>


