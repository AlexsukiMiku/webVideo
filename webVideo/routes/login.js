var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next){
    res.render('login');
  });

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


router.post('/',function(req,res,next){
    var uname=req.body.username;
    var pwd=req.body.password;
    var user={password:pwd,name:uname};
    var data={};
    connection.query('select * from user where name = "'+uname+'";',function(err,rows,result){
      if(rows.length==0){
          data.type='fail';
          data.message = "用户名或密码错误";
          res.json({status: 200, data});
       }else{
    		 if(rows[0].password == pwd){
    			data.type = "success";
                data.message = "登录成功！";
                req.session.userName=rows[0].name;
                req.body.username=rows[0].name;
                res.redirect('/');
    		 }else{
    			data.type = "fail";
                data.message = "用户名或密码错误";
                res.json({status: 200, data});
    		}
    	}

    });

});


module.exports = router;