var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next){
  res.redirect('register');//重定向至注册页面
});
module.exports = router;
