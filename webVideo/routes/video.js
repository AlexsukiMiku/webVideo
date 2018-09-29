var express = require('express');
var router = express.Router();
var str = "and,delete,or,exec,insert,select,union,update,count,*,',join,>,<";
var ilStr = str.split(',');
const fs = require('fs');

//数据库定义
var mysql   = require('mysql');
//创建连接
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'wadym686680*#',
    database : 'videodb'
});
//执行创建连接 
connection.connect();

router.use('/',function(req,res,next){
   if(req.session.userName){
       next();
   }
   else{
    //    console.log(req.session.userName);
       res.redirect('/login');
   }
});

router.get('/:id/:content?',function(req,res,next){

    var userId = req.params.id;
    var urlContent = req.params.content;
    if(urlContent!=undefined){
        urlContent = urlContent.split('goto')[1];
    }
    else{
        urlContent = 'none';
    }
    //if(req.session.userName){
      const list = [];     
      // 使用 Promise 获得视频文件目录
      var p = new Promise(function (resolve,reject) {
          fs.readdir('public/mp4',function (err,files) {
              if(err){
                  console.log(err);
                  reject(err);
                  return;
              }
              files.forEach(function (file,index) {
                  list.push(file);
              })
              resolve(list);
          });
      });

      connection.query('SELECT * FROM comments WHERE pageID = ' + userId,function(err,result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        var date = '';
        var dateList = [];
        
        for(var i = 0; i < result.length; i++){
            date = '';
            // date += result[i].time.getFullYear();
            // date += '年';
            date += result[i].time.getMonth()+ 1;
            date += '月';
            date += result[i].time.getDate();
            date += '日 ';
            date += result[i].time.getHours() + ':' ;
            if(result[i].time.getMinutes() < 10){
                date += '0';
            }
            date += result[i].time.getMinutes();
            dateList[i] = date;
        }
        p.then(function (list) {
            // 在回调中获得目录后，将目录以及页面响应给浏览器
            if(result.length==0){
                result[0] = {pageID:userId,floor:-1}
            }
            //res.render('live')
            res.render('video',{list:list[userId-1],result:result,dateList:dateList,urlContent:urlContent});
        },function (err) {
            console.log(err);
        });
    });

});


//评论区提交
router.post('/:id',function(req,res,next){
    var userId = req.params.id;
    var comment = '';
    var whReply = (req.body.reply === undefined);
    if(whReply){
        comment = req.body.privateComment;
    }
    else{
        comment = req.body.reply;
    }
    var userName = req.session.userName;
    var flag = false;
    for(var i=0;i<ilStr.length;i++){
		if(comment.toLowerCase().indexOf(ilStr[i]) != -1){
			flag = true;
			break;	
		}
    }
    if(flag){
        res.json({code:400});
        return;
    }
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    connection.query('SELECT floor FROM comments WHERE pageID = '+userId,function (err,rs) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        nextFloor = rs[rs.length-1].floor;
        var SQLcomment = {userName:userName,pageID:userId,floor:nextFloor+1,comment:comment,time:currentdate};
        connection.query('INSERT INTO comments set ?',SQLcomment,function (err,rs) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            if(!whReply){
                var first = comment.split('：')[0];
                var string2 = '';
                for(var i = 0; i < first.length; i++){
                    if(first.charAt(i) == ' ')
                        string2 += '+';
                    else
                        string2 += first.charAt(i);
                }
                var replyFloor = string2.split('+')[1].split('#')[1];
                var replyUser = string2.split('+')[0].split('回复')[1];
                var replySQL = {touser:replyUser,fromuser:userName,floor:replyFloor,fromfloor:nextFloor+1,time:currentdate,pageID:userId};
                connection.query('INSERT INTO notification set ?',replySQL,function (err,rs) {
                    if(err){
                        console.log('[SELECT ERROR] - ',err.message);
                        return;
                    }
                });
            }
            // console.log('ok');
        });
        res.json({code:200});
    });
});

router.post('/good/good',function(req,res,next){
    var floor = req.body.floor;
    var pageID = req.body.pageID;
    var sql = '';
    sql += 'UPDATE comments SET thumbup=thumbup+1 WHERE pageID = ' + pageID + ' AND floor = ' + floor;
    connection.query(sql,function(err){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
    })
});
module.exports = router; 