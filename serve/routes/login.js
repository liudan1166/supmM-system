var express = require('express');
var router = express.Router();

const connection = require('./connect');
// 定义秘钥
const secretKey = 'itsource';

// 引入jwt
const jwt = require('jsonwebtoken')
// 统一设置请求头
router.all('*', (req, res, next) => {
    // 设置响应头，解决跨域问题
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

router.post('/checklogin',(req,res)=>{
  let {username,password} =req.body
// 创建sql 
const sqlStr = `select * from account where username='${username}' and password='${password}'`
console.log(sqlStr)
connection.query(sqlStr,(err,data)=>{
    if (err) throw err;
    // 判断
    if(!data.length){
        res.send({'error_code': 1, 'reason': '请检查用户名或密码!'})
    }else{
       const obj = data[0];
       const objstr=JSON.stringify(obj);
    //    生成全新对象
       const accountInfo = JSON.parse(objstr)
    //    生成token
    const token =jwt.sign(accountInfo,secretKey,{expiresIn:60*60})
    res.send({
        'error_code': 0, 
        'reason':'欢迎您！登陆成功！',
        token,
        'username':accountInfo.username
    })
     
    
    }
})

})
module.exports = router;
