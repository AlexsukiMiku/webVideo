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
    connection.query('SELECT * FROM user where name=q',function(err,result){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      res.send(result)
    });
});


module.exports = router;