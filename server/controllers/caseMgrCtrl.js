const app = require('../index.js');
const db = app.get('db');
const bcrypt = require('bcryptjs');

module.exports = {

    requireAuth: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },
    addCM: function(req, res, next) {
        /************************************************************************
        THIS IS A TERRIBLE WAY TO DO THIS. THIS SIGN UP IS FOR DEMONSTRATION ONLY.
        *************************************************************************/
        // const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        db.add_case_manager([req.body.name, req.body.department, req.body.contact_number, req.body.email, req.body.username, req.body.password, req.body.cm_image], function(err, resp) {
            console.log(resp);
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.status(200).send(true);
            }
        });
    },
    updateCM: function(req, res, next) {
        db.update_CM_information(req.params.id, function(err, resp) {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.status(200).json('Case Manager Updated!');
            }
        });
    },
    removeCM: function(req, res, next) {
        db.remove_CM(req.body.id, function(err, resp) {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.status(200).json('Profile Deleted!');
            }
        });
    },
    getOne: function(req, res, next) {
        db.get_one_manager(req.params.id, function(err, resp) {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.status(200).json(resp);
            }
        });
    },
    login: function(req, res, next) {
        db.get_user_by_username(req.body.username, function(err, resp) {
            console.log(resp);
            if (req.body.password === resp[0].password) {
                res.status(200).json(resp);
            } else {
                res.status(400).json('Login Failed');
            }
        });
    },
    logout: function(req, res, next) {
        if (req.user) {
            req.logout();
            res.redirect('/#/');
        } else {
            res.redirect('/');
        }

    },
};
