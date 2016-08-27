const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const cookie = require('cookie-parser');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const moment = require('moment');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config/config');
const auth = require('./config/auth');
const connString = "postgres://postgres:buddy111@localhost/journey";
const path = require('path');

const app = module.exports = express();

app.use(cookie());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// var corsOptions = {
//     origin: 'http://localhost:3000'
// };
app.use(cors());
app.use(express.static(__dirname + './../public'));
const databaseObject = massive.connectSync({
    connectionString: connString
});
app.set('db', databaseObject);
const db = app.get('db');

// Session and Passport

app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'html');

// Controllers

const clientCtrl = require('./controllers/clientCtrl');
const cmCtrl = require('./controllers/caseMgrCtrl');
const programCtrl = require('./controllers/programCtrl');

//endpoints

app.get('/manager/:id', cmCtrl.getOne);
app.get('/clients/:id', clientCtrl.getAll);
app.get('/client/:id', clientCtrl.getOne);
app.get('/programs', programCtrl.getPrograms);
app.get('/checkAuth', cmCtrl.checkAuth);

app.post('/signup', cmCtrl.addCM);
app.post('/client', clientCtrl.addClient);
app.post('/programs', programCtrl.addProgram);

app.put('/manager/:id', cmCtrl.updateCM);

app.delete('/client/:id', clientCtrl.removeClient);
app.delete('/managers/:id', cmCtrl.removeCM);
app.delete('/program/:id', programCtrl.deleteProgram);

//auth
const passportJS = require('./config/passportFile');

//auth endpoints
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/'
}));

app.post('/auth/local', passport.authenticate('local'), (req, res) => {
        res.status(200).redirect('/home');
});

app.get('/home', cmCtrl.requireAuth, (req, res) => {
    res.redirect('/#/home');
});

app.get('/logout', cmCtrl.logout);

app.get('/me', (req, res, next) => {
    res.send(req.user);
});

// Port Ready
app.listen(config.port, () => {
    console.log('Listening on Port: ', config.port);
});
