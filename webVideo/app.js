var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var logger = require('morgan');
var ejs = require('ejs');


//路由路径
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var subRouter = require('./routes/sub');
var videoRouter = require('./routes/video');
var liveRouter = require('./routes/live');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(8080);
var numClients = 0;
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

//session配置
var identityKey = 'skey';
app.use(session({
  name: identityKey,
  secret: 'Alex', // 用来对session id相关的cookie进行签名
  store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
  resave: false, // 是否每次都重新保存会话，建议false
  cookie: {
    maxAge: 10000 * 1000 // 有效期，单位是毫秒
  }
}));
//路由注册
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);
app.use('/sub',subRouter);
app.use('/video',videoRouter);
app.use('/live',liveRouter);

app.get('/logout', function (req, res) {
   req.session.destroy(function(err) {
        if(err){
          res.json({ret_code: 2, ret_msg: '退出登录失败'});
          return;
        }
        res.clearCookie(identityKey);
        res.redirect('/');
      });
});

io.on('connection', function(socket) {  
  numClients++;
  socket.emit('stats', { numClients: numClients });
  console.log('Connected clients:', numClients);
  socket.on('disconnect', function() {
  numClients--;
  socket.emit('stats', { numClients: numClients });
  console.log('Connected clients:', numClients);
});
});

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
