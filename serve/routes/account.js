var express = require('express');
var router = express.Router();

// 引入连接数据库模块
const connection = require('./connect')

// 统一设置请求头
router.all('*', (req, res, next) => {
    // 设置响应头，解决跨域问题
    res.header('Access-Control-Allow-Origin', '*');
    next();
})
//添加账号的路由 /accountadd
router.post('/accountadd', (req, res) => {
    // res.send("1")
    //    接收前端发送的请求
    let { username, password, usergroup } = req.body;
    console.log('前端发送数据', username, password, usergroup);
    // 将数据存入数据库
    const sqlStr = `insert into account(username,password,usergroup) values('${username}','${password}','${usergroup}') `
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ "error_code": 0, "reason": "插入数据成功" })
        } else {
            res.send({ "error_code": 1, "reason": "插入数据失败" })
        }
    })
})

// 账号列表显示功能实现
router.get('/accountlist', (req, res) => {
    //    创建sql语句
    const sqlStr = 'select * from account order by ctime desc';
    console.log(sqlStr)
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 响应给前端
        res.send(data)
    })
})

// 删除功能的实现
router.get('/accountdel',(req,res)=>{
//   接收ID
   let{id}=req.query
//    创建sql语句
  const sqlStr=`delete from account where id=${id}`
// 执行sql
connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    if(data.affectedRows >0){
        res.send({"error_code":0,"reason":"删除数据成功"})
       
    }else{
        res.send({"error_code":0,"reason":"删除数据失败"})
    }
})
})


module.exports = router;
