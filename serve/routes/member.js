var express = require('express');
var router = express.Router();

// 引入连接数据库模块
const connection = require('./connect');

// 统一设置请求头
router.all('*', (req, res, next) => {
    // 设置响应头，解决跨域问题
    res.header('Access-Control-Allow-Origin', '*');
    next();
})

//接收会员添加的请求  /memberadd
router.post('/memberadd', (req, res) => {
    //接收数据
    let {
        name,
        card,
        usergroup,
        identitycard,
        userstate,
        cellphonenumber,
        landlinenumber,
        email,
        areaselectio,
        detailedaddress,
        postalcode
    } = req.body;
    let integral = 0;
    let discount = 0;
    console.log(usergroup)
    //构建sql
    const sqlStr = `insert into member (name,card,usergroup,identitycard,userstate,cellphonenumber,landlinenumber,email,detailedaddress,postalcode,integral,discount,areaselectio) values('${name}','${card}','${usergroup}','${identitycard}','${userstate}','${cellphonenumber}','${landlinenumber}','${email}','${detailedaddress}','${postalcode}',${integral},'${discount}','${areaselectio}')`

    //执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({ 'error_code': 0, "reason": '添加成功' })
        } else {
            res.send({ 'error_code': 1, "reason": '添加失败' })
        }
    })
})

//接收会员管理的路由 /memberlist
router.get('/memberlist', (req, res) => {
    const sqlStr = `select * from member`;
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        res.send(data)
        console.log(data)
    })
})


//接收删除请求 /memberdel
router.get('/memberdel', (req, res) => {
    //接收id
    let { id } = req.query;
    //根据id查找
    const sqlStr = `delete from member where id=${id}`;
    //执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        //根据删除判断
        if (data.affectedRows > 0) {
            res.send({ 'error_code': 0, 'reason': '删除数据成功' });
        } else {
            res.send({ 'error_code': 1, 'reason': '删除数据失败' });
        }
    })
})

//接收数据回填 /memberedit
router.get('/memberedit', (req, res) => {
    //接收id
    let { id } = req.query;
    //构造sql
    const sqlStr = `select * from member where id = ${id}`
    //执行sql
    connection.query(sqlStr, (err, data) => {
        if (err) throw err;
        res.send(data)
    })
})

//接收数据修改 /membereditsave
router.post('/membereditsave', (req, res) => {
    // 接收数据
    let { card,
        name,
        cellphonenumber,
        landlinenumber,
        usergroup,
        discount,
        editId 
    } = req.body
    //构造sql
    const sqlStr = `update member set name='${name}',cellphonenumber='${cellphonenumber}',landlinenumber='${landlinenumber}',usergroup='${usergroup}',discount='${discount}' where id ='${editId}'`
    //执行sql
    connection.query(sqlStr,(err,data)=>{
        if(err)throw err;
        if(data.affectedRows>0){
            res.send({ 'error_code': 0, 'reason': '修改数据成功' });
        }else{
            res.send({ 'error_code': 1, 'reason': '修改数据失败' });
        }
    })
})

//接收分页显示数据的请求/memberlistbypage
router.get('/memberlistbypage',(req,res)=>{
    //接收数据
    let {currentPage,pageSize} =req.query;
    //构建sql
    let sqlStr = `select * from member`;
    //执行
    connection.query(sqlStr,(err,data)=>{
        if(err)throw err;
        //获取总条数
        let total = data.length;
        //跳过的条数
        let n = (currentPage-1)*pageSize;
        //sql查询对应的数据
        sqlStr+=` limit ${n},${pageSize}`;
        //执行
        connection.query(sqlStr,(err,data)=>{
            if(err)throw err;
            res.send({data,total})
        })
    })
})

//接收搜索请求
router.post('/search',(req,res)=>{

    //接收数据
    let {keyword } = req.body;
    //构造sql
    let sqlStr = `select * from member where 1 = 1`;

    //根据关键字查询 拼接
    if(keyword !==""){
        sqlStr+= ` and (name like "%${keyword}%" or card like "%${keyword}%" or cellphonenumber like "%${keyword}%" or landlinenumber like "%${keyword}%")`
    }
    connection.query(sqlStr,(err,data)=>{
        if(err)throw err;
        res.send(data)
    })
    
}
)
module.exports = router;