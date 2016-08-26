const app = require('../index.js');
const db = app.get('db');
const bcrypt = require('bcrypt');

module.exports = {
    checkAuth: (req, res, next) => {
        if (req.user) {
            res.status(200).json(req.user);
        }
        else if (!req.user) {
            res.status(200).json('unauthorized');
        }
    },
    requireAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        else {return res.redirect('/');}
    },
    addCM: (req, res, next) => {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        db.add_case_manager([req.body.name, req.body.department, req.body.contact_number, req.body.email, req.body.username, req.body.password, req.body.cm_image], (err, resp) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.status(200).send(true);
            }
        });
    },
    updateCM: (req, res, next) => {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        db.update_CM_information([req.body.name, req.body.department, req.body.contact_number, req.body.email, req.body.username, req.body.password, req.body.cm_image, req.params.id], (err, resp) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.status(200).json('Case Manager Updated!');
            }
        });
    },
    removeCM: (req, res, next) => {
        db.remove_CM(req.body.id, (err, resp) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.status(200).json('Profile Deleted!');
            }
        });
    },
    getOne: (req, res, next) => {
        db.get_one_manager(req.params.id, (err, resp) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                return res.status(200).json(resp);
            }
        });
    },
    logout: (req, res, next) => {
        if (req.user) {
            req.logout();
            res.redirect('/#/');
        } else {
            res.redirect('/');
        }

    },
};
