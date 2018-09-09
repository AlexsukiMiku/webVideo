var express = require('express');
var router = express.Router();

router.get('/1',function(req,res,next){
    const list=[];
    list[0]='1';
    list[1]='3';
    res.render('sub',{list:list});
});

router.get('/2',function(req,res,next){
    const list=[];
    list[0]='2';
    res.render('sub',{list:list});
});

router.get('/3',function(req,res,next){
    const list=[];
    list[0]='3';
    res.render('sub',{list:list});
});

module.exports = router; 