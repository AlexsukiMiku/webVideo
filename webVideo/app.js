var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');



//路由路径
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();

//数据库定义
var mysql      = require('mysql');
//创建连接
var connection = mysql.createConnection({
host     : 'localhost',
port     : '3306',
user     : 'root',
password : 'wadym686680*#',
database : 'videodb'
});
//执行创建连接 
connection.connect();
var  sql = 'SELECT * FROM name';
var  addSql = 'INSERT INTO name(id,name,sex) VALUES(?,?,?)';

//视图层的定义
app.set('views', path.join(__dirname, 'views'));
/* app.set('view engine', 'jade'); */
//进行模板的设置https://www.cnblogs.com/-nothing-/p/4943354.html
app.engine('html', ejs.__express);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//路由注册
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
