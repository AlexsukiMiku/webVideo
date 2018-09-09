var express = require('express');
var router = express.Router();
const fs = require('fs');

router.use('/',function(req,res,next){
   if(req.session.userName){
       next();
   }
   else{
       console.log(req.session.userName);
       res.redirect('/login');
   }
});

router.get('/1',function(req,res,next){
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
      p.then(function (list) {
          console.log(list[0]);
          // 在回调中获得目录后，将目录以及页面响应给浏览器
          res.render('video',{list:list[0]});
      },function (err) {
          console.log(err);
      });
    //}else{
    //    res.redirect('/login')
    //}
});

router.get('/2',function(req,res,next){
    console.log(req.session.userName);
    const list = [];
    var flag = false;
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
    p.then(function (list) {
        console.log(list[3]);
        // 在回调中获得目录后，将目录以及页面响应给浏览器
        res.render('video',{list:list[1]});
    },function (err) {
        console.log(err);
    });
});

router.get('/3',function(req,res,next){
      console.log(req.session.userName);
      const list = [];
      var flag = false;
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
      p.then(function (list) {
          console.log(list[3]);
          // 在回调中获得目录后，将目录以及页面响应给浏览器
          res.render('video',{list:list[2]});
      },function (err) {
          console.log(err);
      });
});

router.get('/4',function(req,res,next){
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
    p.then(function (list) {
        console.log(list[3]);
        // 在回调中获得目录后，将目录以及页面响应给浏览器
        res.render('video',{list:list[3]});
    },function (err) {
        console.log(err);
    });
});

//评论区提交
router.post('/1',function(req,res,next){
    
});
module.exports = router; 