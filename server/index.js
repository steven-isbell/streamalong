const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const cookie = require('cookie-parser');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config/config');
const auth = require('./config/auth');
const connString = "postgres://stevenisbell@localhost/streamalong";
const path = require('path');

const app = module.exports = express();


app.use(cookie());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var corsOptions = {
    origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));
app.use(express.static(__dirname + './../public'));
const databaseObject = massive.connectSync({
    connectionString: connString
});
app.set('db', databaseObject);
const db = app.get('db');

// Session and Passport

app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
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

app.post('/signup', cmCtrl.addCM);
app.post('/client', clientCtrl.addClient);
app.post('/programs', programCtrl.addProgram);
app.post('/login', cmCtrl.login);

app.put('/client/:id', clientCtrl.updateClient);
app.put('/manager/:id', cmCtrl.updateCM);

app.delete('/client/:id', clientCtrl.removeClient);
app.delete('/managers/:id', cmCtrl.removeCM);
app.delete('/program/:id', programCtrl.deleteProgram);

//auth

passport.use(new GoogleStrategy({
    clientID: auth.googleAuth.consumerKey,
    clientSecret: auth.googleAuth.consumerSecret,
    callbackURL: auth.googleAuth.callbackURL
}, (token, refreshToken, profile, done) => {
    db.case_managers.findOne({
        google_id: profile.id
    }, (err, case_manager) => {
        if (err) {
            done(err, null);
        }
        else if (case_manager) {
            console.log("found manager", err, case_manager);
            done(null, case_manager);
        }
        else {
            db.case_managers.insert({
                name: profile.displayName,
                email: profile.emails[0].value,
                cm_image: profile.photos[0].value,
                google_id: profile.id
            }, (err, newManager) => {
                console.log("new manager", case_manager);
            });
            done(null, case_manager);
        }
    });

}));

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/'
}));

passport.use(new LocalStrategy(function(username, password, done) {
    db.get_user_by_username([username], function(err, user) {
        console.log(user, err);
        user = user[0];
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (user.password != password) {
            return done(null, false);
        }
        return done(null, user);
    });
}));

app.post('/auth/local', passport.authenticate('local'), function(req, res) {
        res.status(200).redirect('/home');
});

app.get('/home', cmCtrl.requireAuth, function(req, res) {
    res.redirect('/#/home');
});

app.get('/logout', cmCtrl.logout);



app.get('/me', function(req, res, next) {
    res.send(req.user);
});

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

// Port Ready
app.listen(config.port, function() {
    console.log('Listening on Port: ', config.port);
});
