var express = require('express');
var router = express.Router();

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


/* GET users listing. */
router.get('/:id', function(req, res, next) {
  console.log('000')
  var userId = req.params.id;
  var thumbUp = 0;
  connection.query("select * from comments where userName = '"+userId+"';",function(err,result){
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    for(var i = 0; i < result.length; i++){
      thumbUp += parseInt(result[i].thumbup)
    }
    connection.query('SELECT * FROM notification WHERE whread = 0 AND touser = "' + userId+'";',function(err,result){
      var flag = true;
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      if(result.length === 0){
        flag = false;
      }
      res.render('users',{userId:userId,thumbUp:thumbUp,flag:flag});
    })
  });

});

router.get('/:id/notification',function(req,res,next){
  var userId = req.params.id;
  connection.query('SELECT * FROM notification WHERE touser =" ' + userId+'";',function(err,result){
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    var date = '';
    var dateList = [];
    var whread = 0;
    var whreadList = [];
    for(var i = 0; i < result.length; i++){
      date = '';
      date += result[i].time.getMonth() + 1;
      date += '月';
      date += result[i].time.getDate();
      date += '日 ';
      date += result[i].time.getHours() + ':' ;
      if(result[i].time.getMinutes() < 10){
        date += '0';
      }
      date += result[i].time.getMinutes();
      whread = result[i].whread;
      dateList[i] = date;
      whreadList[i] = whread;
    }
    res.render('notification',{result:result,dateList:dateList,whreadList:whreadList});
  });
})

router.post('/:id/notification',function(req,res,next){
  var floor = req.body.floor;
  var pageID = req.body.pageID;
  var sql = '';
  sql += 'UPDATE notification SET whread=1 WHERE pageID = "' + pageID + '" AND fromfloor = "' + floor +'"';
  connection.query(sql,function(err){
      if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
      }
  })
});
module.exports = router;
