var express = require('express');
var router = express.Router();

const connection = require('./connect')

// 引入条形码
var JsBarcode = require('jsbarcode')
// 统一设置请求头
router.all('*', (req, res, next) => {
    // 设置响应头，解决跨域问题
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

// 商品添加
router.post('/goodsadd', (req, res) => {
    let { classify,
        goodscode,
        goodsname,
        goodssales,
        marketprice,
        goodsprice,
        stocknum,
        goodsweight,
        goodsunit,
        privilege,
        salespromotion,
        goodsabstract,
          } = req.body;

    console.log(classify, goodsabstract, salespromotion)
    let salePrice =goodssales * stocknum;
    let inventoryPrice =goodsprice * stocknum;
    console.log(salePrice,inventoryPrice)
    // 创建sql语句
    const sqlStr = `insert into goods(classify,goodscode,goodsname,
        goodssales,marketprice,goodsprice,stocknum,goodsweight,goodsunit,
        privilege,salespromotion,goodsabstract,salePrice,inventoryPrice) values(
            '${classify}','${goodscode}','${goodsname}',
     ${goodssales},${marketprice},${goodsprice},'${stocknum}',
    '${goodsweight}','${goodsunit}','${privilege}','${salespromotion}',
     '${goodsabstract}',${salePrice},${inventoryPrice})`;
      console.log(sqlStr)
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ "error_code": 0, "reason": "插入数据成功" })
        } else {
            res.send({ "error_code": 1, "reason": "插入数据失败" })
        }
    })
})

//分页
router.get('/getGoodslistByPage',(req,res)=>{
    let {pageSize , currentPage }=req.query
    console.log(pageSize,currentPage)
    let sqlStr = `select * from goods order by ctime desc`
    // 执行sql
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        console.log(data)
        let total = data.length
        // 跳过n条
        let n = (currentPage -1) * pageSize
        sqlStr += ` limit ${n}, ${pageSize}`;
        console.log(sqlStr)
        connection.query(sqlStr,(err,data)=>{
            if (err) throw err;
            // console.log(data)
            res.send({ total , data})
        })
    })
 
})

// 删除
router.get('/goodsdel',(req,res)=>{
    // 获取id
    let {id}=req.query;
    // 创建sql
    const sqlStr =`delete from goods where id=${id}`
    // 执行sql
    connection.query(sqlStr,(err,data)=>{
        if (err) throw err;
        if(data.affectedRows > 0){
            res.send({"error_code":0,"reason":"删除数据成功"})
        }else{
        res.send({"error_code":1,"reason":"删除数据失败"})
        }
    })
    console.log(sqlStr)
})

// 修改数据
router.get('/goodsedit',(req,res)=>{
 let {id} =req.query;
//  创建sql
const sqlStr=`select * from goods where id=${id}`
connection.query(sqlStr,(err,data)=>{
    if (err) throw err;
    // console.log(data)
    res.send(data)
})
})

// 保存修改
router.post('/goodssaveedit',(req,res)=>{
   let {goodssales,marketprice,stocknum,editid}=req.body;
   const sqlStr = `update account set goodssales=${goodssales}, marketprice=${marketprice}, stocknum='${stocknum}' where id=${editid}`;
   connection.query(sqlStr,(err,data)=>{
       if(err) throw err ;
       console.log(data)
    //    if (data.affectedRows > 0) {
    //     // 返回成功的数据对象给前端
    //     res.send({"error_code": 0, "reason":"修改商品管理信息成功"});
    //   } else {
    //     // 返回失败的数据对象给前端
    //     res.send({"error_code": 1, "reason":"修改商品管理信息失败"});
    //   }
   })
console.log(sqlStr)
})

// 批量删除
router.get('/batchremove',(req,res)=>{
    let {selectid} =req.query;
    console.log(selectid)
    const sqlStr =`delete from goods where id in (${selectid})`
  connection.query(sqlStr,(err,data)=>{
    if (err) throw err;
    // 根据删除结果判断 成功就返回成功的数据对象 否则 就返回失败的数据对象
    if (data.affectedRows > 0) {
      res.send({"error_code": 0, "reason":"批量删除成功"})
    } else {
      res.send({"error_code": 1, "reason":"批量删除失败"})
    }
  })
})
module.exports = router;
