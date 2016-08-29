const app = require('../index.js');
const auth = require('./auth');
const db = app.get('db');
const bcrypt = require('bcrypt');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.use(new GoogleStrategy({
    clientID: auth.googleAuth.consumerKey,
    clientSecret: auth.googleAuth.consumerSecret,
    callbackURL: auth.googleAuth.callbackURL,
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

passport.use(new LocalStrategy((username, password, done) => {
    db.get_user_by_username([username], (err, user) => {
        console.log(user, err);
        user = user[0];
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
    });
}));


passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;
