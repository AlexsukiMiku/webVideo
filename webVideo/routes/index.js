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

/* GET home page. */
router.use('/',function(req,res,next){
	res.locals.name=req.session.userName;
	next();
});


router.get('/', function(req, res, next){
  res.render('index');
});

//搜索功能
router.post('/result',function(req,res,next){
  var searchVar = req.body.research;
  var string1 = searchVar.toLowerCase();
  var string2 = '';
	var length = string1.length;
	
  if(length != 0 && string1 != ' ' && string1 != '　'){
		for(var i = 0; i < length; i++){
		  if(string1.charAt(i) == ' '||string1.charAt(i) == '　')
		    string2 += '+';
		  else
			  string2 += string1.charAt(i);
		}
		var inputResult = string2.split('+');
		doSearch(inputResult);
		// console.log(str);
		// if(str != null){
		// 	/* 生成链接页面的方法 */
		// 	res.send(str);
		// 	// res.render('sub');
		// }
		// else{
		// 	res.send('本站没有关于'+searchVar+'的内容！');
		// }
	}
	else{
    res.send('请输入要搜索的关键字!');
	}


  function doSearch(inputResult){
		console.log('进入搜索');
		var tmpStr = '';
		var sql = 'SELECT * FROM pages WHERE (title LIKE "%'+inputResult[0]+'%" OR title LIKE "'+inputResult[0]+'%" OR title LIKE "%'+inputResult[0]+'" OR title LIKE "'+inputResult[0]+'")';
		var length1 = inputResult.length;
		var stringr='';
		tmpStr += sql;
		/* 可加入逻辑关系判断 */
		for(var i = 1; i < length1; i++){
			tmpStr += ' AND (title LIKE "%'+inputResult[i]+'%" OR title LIKE "'+inputResult[i]+'%" OR title LIKE "%'+inputResult[i]+'" OR title LIKE "'+inputResult[i]+'")';
    }
    console.log(tmpStr)
		connection.query(tmpStr,function(err,result){
			if(err){
				console.log('[SELECT ERROR] - ',err.message);
				return;
			}
			var list=[];
			for(var j = 0; j < result.length; j++){
				list += result[j].idtitle;
			}
			console.log(list);
			/* 生成链接页面的方法 */
			res.render('sub',{list:list})

		});
		// connection.end();
  }
});

module.exports = router; 
