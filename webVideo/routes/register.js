var express = require('express');
var router = express.Router();

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


router.post('/regData', function(req, res, next){
    if (!req.body) return res.sendStatus(400);
    //res.send('Welcome, ' + req.body.username);
    var uname=req.body.username;
    var pwd=req.body.password;
    var user={password:pwd,name:uname};
    connection.query('INSERT INTO user set ?',user,function (err,rs) {
      if (err) throw err;
      console.log('ok');
      req.session.userName=uname;
      res.redirect('/');
    })

    // connection.query(sql,function (err, result) {
    //     if(err){
    //       console.log('[SELECT ERROR] - ',err.message);
    //       return;
    //     }
    //     //把搜索值输出
    //    req.session.userName=uname;
    //    res.redirect('/');
    // });
});
module.exports = router;