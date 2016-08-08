var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.json');

var app = module.export = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));

//endpoints












app.listen(config.port, function () {
  console.log('Listening on Port: ', config.port);
});
