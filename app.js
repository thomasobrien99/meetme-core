var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const Yelp = require('node-yelp-api-v3');
const yelp = new Yelp({
  consumer_key: 'DiiyWCoTG_urZBffTsvx-Q',
  consumer_secret: 'yy9RTz6rMdxdmeORu45ULs9UnKcguW8qfB1ks6Xk0uPbwjxQrOx65ZYhXVcc4Z4E'
});

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*', (req, res) => {
  yelp.searchBusiness({ term: 'ice cream' })
  .then(results => {
    eval(require('locus'));
    console.log(results));
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
