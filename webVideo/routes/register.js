var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//数据库定义
var mysql      = require('mysql');
//创建连接
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'wadym686680*#',
database : 'videodb'
});
//执行创建连接 
connection.connect();

var  sql = 'SELECT * FROM user';
router.get('/', function(req, res, next){
    res.render('register');//返回注册模板
  });


router.post('/', function(req, res, next){
    if (!req.body) return res.sendStatus(400);
    var uname=req.body.username;
    var email=req.body.email;
    var pwd=req.body.password;
    var repeatPassword=req.body.repeatPassword;
    var user={password:pwd,name:uname,email:email};
    var data={};
    if (uname.length < 1) {
      data.message="请填写用户名";
      res.json({code:400,data});    
    }

  if (email.length< 1) {
      data.message='请填写邮箱！';
      res.json({code:400,data}); 
  }
  
  var reg2 = /^[a-zA-Z0-9_-]{3,9}$/;
  if(!reg2.test(uname)){
    data.message="用户名格式错误"
    res.json({code:400,data}); 
  }
    var reg1 = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
    if(!reg1.test(email)){
          res.json({code:400,邮箱格式错误});
    }

    if (pwd.length < 1) {
      data.message="请填写密码";
      res.json({code:400,data}); 
  }
  var pass = /^[a-zA-Z]\w{5,17}$/;
  if(!pass.test(pwd)){
      data.message='密码长度要在6~18位之间,且必须以字母开头！';
      res.json({code:400,data}); 

  }
  if (repeatPassword.length < 1) {
      data.message='请填写确认密码！';
      res.json({code:400,data}); 
  }

  if (repeatPassword!=pwd) {
      data.message='两次密码填写不一致！';
      res.json({code:400,data}); 
  }

  connection.query('select * from user where name = "'+uname+'" or email ="'+email+'"',function(err,rows,result){
    console.log(rows)
    if(rows.length==0){
      connection.query('INSERT INTO user set ?',user,function (err,rs) {
        if (err) throw err;
        req.session.userName=uname;
        res.json({code:200});
      })
     }else if(rows[0].name==uname){
        data.message = "用户名已存在";
        res.json({code: 400, data});
     }else if(rows[0].email==email){
        data.message = "邮箱地址已存在";
        res.json({code: 400, data});
    }

  });


    
});
module.exports = router;