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
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        // 响应给前端
        res.send(data)
    })
})

// 删除功能的实现
router.get('/accountdel', (req, res) => {
    //   接收ID
    let { id } = req.query
    //    创建sql语句
    const sqlStr = `delete from account where id=${id}`
    // 执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ "error_code": 0, "reason": "删除数据成功" })

        } else {
            res.send({ "error_code": 0, "reason": "删除数据失败" })
        }
    })
})

// 编辑功能的实现
router.get('/accountedit', (req, res) => {
    let { id } = req.query
    // 创建sql语句
    const sqlStr = `select * from account where id=${id} `
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

// 保存修改数据
router.post('/accounteditsave', (req, res) => {
    let { username, usergroup, editid } = req.body;
    // 创建sql
    const sqlStr = `update account set username='${username}',usergroup='${usergroup}' where id=${editid}`
    //    执行sql
    console.log(sqlStr)
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ "error_code": 0, "reason": "修改数据成功" })
        } else {
            res.send({ "error_code": 1, "reason": "修改数据失败" })
        }
    })
});

// 分页
router.get('/getAccountListByPage', (req, res) => {
    let { pageSize, currentPage } = req.query;
    console.log(pageSize, currentPage);
    // 默认值
    pageSize = pageSize ? pageSize : 3;
    currentPage = currentPage ? currentPage : 1;
    // 创建sql语句
    let sqlStr = "select * from account order by ctime desc";
    // 执行
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        let total = data.length;
        // 跳过n页
        let n = (currentPage - 1) * pageSize;
        sqlStr += ` limit ${n},${pageSize}`;
        console.log(sqlStr);
        connection.query(sqlStr, (err, data) => {
            if (err) throw err;
            res.send({ total, data })
        })
    })
})
// 批量删除功能
router.get('/batchremove', (req, res) => {
    let { selectid } = req.query
    console.log(selectid)
    // 创建aql语句
    const sqlStr = `delete from account where id in (${selectid})`;
    console.log(sqlStr)
    // 执行sql语句
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ "error_code": 0, "reason": "批量删除成功" })
        } else {
            res.send({ "error_code": 1, "reason": "批量删除失败" })
        }
    })
})

// 原密码验证
router.get('/checkoldpwd', (req, res) => {
    let { username, oldpwd } = req.query
    const sqlStr = `select * from account where username='${username}' and password = '${oldpwd}'`
    console.log(sqlStr)
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.length) {
            res.send({ "error_code": 0, "reason": "原密码正确!" });
        } else {
            res.send({ "error_code": 1, "reason": "原密码错误!" });
        }
    })
});


// 保存修改密码
router.post('/savenewpwd',(req,res)=>{
   let{ username,password,newpassword}=req.body;
   const sqlStr =`update account set password ='${newpassword}' where username='${username}' and password='${password}'`
console.log(sqlStr)
connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    if (data.affectedRows > 0) {
        // 成功
        res.send({"error_code": 0, "reason":"密码修改成功!请重新登录!"})
      } else {
        // 失败
        res.send({"error_code": 1, "reason":"密码修改失败!"})
      }
})
})
module.exports = router;
