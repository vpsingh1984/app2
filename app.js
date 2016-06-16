var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydb');

var UserSchema = new mongoose.Schema({
  firstname: 'string',
  lastname: 'string'
});
var User = mongoose.model('User', UserSchema);

var user1 = new User();
user1.firstname = 'Sandra';
user1.lastname = 'Williams';

user1.save(function(err, user1){
  if (err) {
    res.err(err);
  };
});


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// app.use(function(req, res, next){
//   console.log('Request Received');
//   next();
// });

// app.get('/', function(req, res, next){
//   res.end('Get request receive at application root')
// });

// app.post('/', function(req, res, next){
//   res.end('Post request receive at application root')
// });

// app.get('/user', function(req, res, next){
//   res.end('Get details of the users');
// });

// app.get('/user/:id', function(req, res, next){
//   res.end('Get detail of the user with id :' + req.params.id);
// });











// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
