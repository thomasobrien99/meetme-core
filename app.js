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

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/businesses/search', (req, res) => {
  yelp.searchBusiness({
    latitude: Number(req.query.lat),
    longitude: Number(req.query.lng),
    term: 'ice cream'
  })
  .then(results => {
    res.send(results);
  })
  .catch(err => {
    res.send(err);
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  eval(require('locus'))

  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  eval(require('locus'))

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send(500)
});

module.exports = app;
