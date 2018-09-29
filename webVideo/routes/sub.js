var express = require('express');
var router = express.Router();

router.get('/1',function(req,res,next){
    const list=[];
    const nameList=[];
    list[0]='1';
    list[1]='3';
    nameList[0]='课程导学';
    nameList[1]='集中趋势';
    res.render('sub',{list:list,nameList:nameList});
});

router.get('/2',function(req,res,next){
    const list=[];
    const nameList=[];
    nameList[0]='数据案例';
    list[0]='2';
    res.render('sub',{list:list,nameList:nameList});
});

router.get('/3',function(req,res,next){
    const list=[];
    const nameList=[];
    list[0]='3';
    nameList[0]='数据案例';
    res.render('sub',{list:list,nameList:nameList});
});

router.get('/4',function(req,res,next){
    const list=[];
    const nameList=[];
    list[0]='4';
    nameList[0]='数据案例';
    res.render('sub',{list:list,nameList:nameList});
});

router.get('/5',function(req,res,next){
    const list=[];
    const nameList=[];
    list[0]='5';
    nameList[0]='数据案例';
    res.render('sub',{list:list,nameList:nameList});
});

router.get('/6',function(req,res,next){
    const list=[];
    const nameList=[];
    list[0]='6';
    nameList[0]='数据案例';
    res.render('sub',{list:list,nameList:nameList});
});

router.get('/7',function(req,res,next){
    const list=[];
    const nameList=[];
    list[0]='7';
    nameList[0]='数据案例';
    res.render('sub',{list:list,nameList:nameList});
});

router.get('/8',function(req,res,next){
    const list=[];
    const nameList=[];
    list[0]='8';
    nameList[0]='数据案例';
    res.render('sub',{list:list,nameList:nameList});
});

router.get('/9',function(req,res,next){
    const list=[];
    const nameList=[];
    list[0]='9';
    nameList[0]='编码实现';
    res.render('sub',{list:list,nameList:nameList});
});

module.exports = router; 