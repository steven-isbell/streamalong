var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.json');
var connString = "postgres://stevenisbell@localhost/streamalong";

var app = module.exports = express();
var db = app.get('db');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + './../public'));
var databaseObject = massive.connectSync({connectionString : connString});
app.set('db', databaseObject);
app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false
}));
var clientCtrl = require('./controllers/clientCtrl');
var cmCtrl = require('./controllers/caseMgrCtrl');

//endpoints

app.get('/clients', clientCtrl.getAll);
app.get('/clients/:id', clientCtrl.getOne);

app.post('/manager', cmCtrl.addCM);
app.post('/clients', clientCtrl.addClient);

app.put('/clients/:id', clientCtrl.updateClient);
app.put('/manager/:id', cmCtrl.updateCM);

app.delete('clients/:id', clientCtrl.removeClient);
app.delete('manager/:id', cmCtrl.removeCM);

// app.post('/manager/login', cmCtrl.login);
// need logout endpoint














app.listen(config.port, function () {
  console.log('Listening on Port: ', config.port);
});
