var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var passport = require('passport');
var config = require('./config.json');
var connString = "postgres://stevenisbell@localhost/streamalong";

var app = module.exports = express();
var db = app.get('db');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../public'));
var databaseObject = massive.connectSync({connectionString : connString});
app.set('db', databaseObject);
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var clientCtrl = require('./controllers/clientCtrl');
var cmCtrl = require('./controllers/caseMgrCtrl');

//endpoints

app.get('/manager/:id', cmCtrl.getOne);
app.get('/clients', clientCtrl.getAll);
app.get('/clients/:id', clientCtrl.getOne);
app.get('/programs', cmCtrl.getPrograms);

app.post('/managers', cmCtrl.addCM);
app.post('/clients', clientCtrl.addClient);
app.post('/programs', cmCtrl.addProgram);

app.put('/clients/:id', clientCtrl.updateClient);
app.put('/managers/:id', cmCtrl.updateCM);

app.delete('clients/:id', clientCtrl.removeClient);
app.delete('managers/:id', cmCtrl.removeCM);

//auth
app.get('/', cmCtrl.requireAuth, function(req, res) {
  return res.sendFile(__dirname+'/public/app/component/home/home.html');
});

// app.post('/manager/login', cmCtrl.login);
// need logout endpoint














app.listen(config.port, function () {
  console.log('Listening on Port: ', config.port);
});
