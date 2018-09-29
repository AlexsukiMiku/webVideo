var express = require('express');
var router = express.Router();
var request = require('request');
var sha1 = require('js-sha1');
// var numClient=0;
router.use('/',function(req,res,next){
  if(req.session.userName){
      next();
  }
  else{
      console.log(req.session.userName);
      res.redirect('/login');
  }
});

router.get('/', function(req, res, next){
      // var now= new Date();
      // var year=now.getFullYear();
      // var month=now.getMonth()+1;
      // var day=now.getDate();
      // var time=Date.UTC(year,month,day);
      // var AppSeret="ee08df57be9f";
      // var Nonce="12345";
      // sha1(AppSeret+Nonce+time);
      // var hash = sha1.create();
      // //console.log(hash.hex());
      // // hash.update();
      // // hash.hex();
      // var cid="85d6a903c35e4237943b07f64dff1d27";
      // console.log(time+" "+hash.hex());
      // request({
      //   url: "https://vcloud.163.com/app/channelstats",
      //   method: "POST", 
      //   json: true,
      //   headers: {
      //       "content-type": "application/json;charset=utf-8",
      //       "AppKey": "7e17017816c359e7799ffbe4d6b8091a",
      //       "Nonce": "12345",
      //       "CurTime": time,
      //       "CheckSum": hash.hex(),
      //   },
      //   body:cid
      // },function(error,request,body){
      //   console.log(body);
      // });
      res.render('live');
});

router.get('/publish', function(req, res, next){
    if(req.session.userName==='zys'){
      res.render('publish');
    }else{
      res.render('error');
    }
});


module.exports = router;