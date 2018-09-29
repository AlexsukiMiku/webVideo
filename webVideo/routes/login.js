var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: '517524653@qq.com',
        //这里密码不是qq密码，是你设置的smtp密码
        pass: 'zteltoltnduxcbce'
    }
});

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
    var data={};
    // if (uname.length < 1) {
    //     data.message='请填写用户名';
    //     res.json({code:400,data});
    // }
    
     var reg = /^[a-zA-Z0-9_-]{3,9}$/;
     var reg2 = /^[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$/;
    // if(!reg.test(input1)&&!reg2.test(input2)){
    //     data.message='请输入正确的用户名！';
    //     res.json({code:400,data});
    // }
        
    // if (pwd.length < 1) {
    //      data.message='请选择或填写密码！';
    //      res.json({code:400,data});
    // }
    if(reg.test(uname)){
    
     connection.query('select * from user where name = "'+uname+'";',function(err,rows,result){
      if(rows.length==0){
          data.type='fail';
          data.message = "用户名或密码错误";
          res.json({code: 400, data});
       }else{
    		 if(rows[0].password == pwd){
                
                if(req.session.userName){
                    data.type = "fail";
                    data.message = "已有用户登录，登录失败！";
                    res.json({code:400,data});
                }
                else{
    			    data.type = "success";
                    data.message = "登录成功！";
                    req.session.userName=rows[0].name;
                    req.body.username=rows[0].name;
                    res.json({code:200});
                }
    		 }else{
    			data.type = "fail";
                data.message = "用户名或密码错误";
                res.json({code: 400, data});
    		}
    	}

    });
    }else if(reg2.test(uname)){
    connection.query('select * from user where email = "'+uname+'";',function(err,rows,result){
        if(rows.length==0){
            data.type='fail';
            data.message = "用户名或密码错误";
            res.json({code: 400, data});
         }else{
               if(rows[0].password == pwd){
                if(req.session.userName){
                    console.log(req.session.userName)
                    data.type = "fail";
                    data.message = "已有用户登录，登录失败！";
                    res.json({code:400,data});
                }else{
                    data.type = "success";
                    data.message = "登录成功！";
                    req.session.userName=rows[0].name;
                    req.body.username=rows[0].name;
                    res.json({code:200});
                }
               }else{
                  data.type = "fail";
                  data.message = "用户名或密码错误";
                  res.json({code: 400, data});
              }
          }
  
      });

    }

});

router.get('/reset',function(req,res,next){
    res.render('reset');
});

router.post('/reset',function(req,res,next){
    var data={};
    var target=req.body.username;
    caches=target;
    var randNum = "",
        range = 4,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
     
        // 随机产生
        for(var i=0; i<range; i++){
            pos = Math.round(Math.random() * (arr.length-1));
            randNum += arr[pos];
        }
    localStorage=randNum;
    connection.query('select * from user where email = "'+target+'";',function(err,rows,result){
        if(rows.length==0){
            data.message='邮箱不存在';
            res.json({code:400,data})
        }else{
            var mailOptions = {
                from: '517524653@qq.com', // 发件地址
                to: target, // 收件列表
                subject: 'Hello ', // 标题
                //text和html两者只支持一种
                text: randNum, // 标题
                // html: '<b></b>' // html 内容
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    data.message='邮箱发送错误';
                    res.json({code:400,data})
                }
                // console.log('Message sent: ' + info);
                data.message='发送成功'
                res.json({code:200,data});
            });

        }
    });

    
});

router.post('/check',function(req,res,next){
    var captcha=req.body.captcha;
    var data={};
    var randNum=localStorage;
    console.log(randNum);
    if(captcha==randNum){
        data.message='验证成功';
        res.json({code:200,data});
    }else{
        data.message='验证码错误'
        res.json({code:400,data});
    }
});

router.get('/newpwd',function(req,res,next){
   res.render('newpwd');
});

router.post('/newpwd',function(req,res,next){
    var pwd=req.body.password;
    var email=caches;
    connection.query('UPDATE USER SET password="'+pwd+'" WHERE email="'+email+'"',function (err,rs) {
        if (err) throw err;
        res.json({code:200});
      })
 });
module.exports = router;