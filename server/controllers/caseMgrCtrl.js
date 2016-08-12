var app = require('../index.js');
var db = app.get('db');

module.exports = {

    requireAuth: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },
    addCM: function(req, res, next) {
        db.add_case_manager([req.body.name, req.body.department, req.body.contact_number, req.body.email, req.body.user_role, req.body.username, req.body.password, req.body.cm_image], function(err, resp) {
            console.log(resp);
            res.status(200).json('Case Manager Added!');
        });
    },
    updateCM: function(req, res, next) {
        db.update_CM_information(req.params.id, function(err, resp) {
            res.status(200).json('Case Manager Updated!');
        });
    },
    removeCM: function(req, res, next) {
        db.remove_CM(req.body.id, function(err, resp) {
            res.status(200).json('Profile Deleted!');
        });
    },
    getOne: function(req, res, next) {
        db.get_one_manager(req.params.id, function(err, resp) {
            res.status(200).json(resp);
        });
    },
    addProgram: function(req, res, next) {
        db.add_program([req.body.name, req.body.city, req.body.phone_number, req.body.description, req.body.image], function(err, resp) {
            res.status(200).json('Program Added!');
        });
    },
    getPrograms: function(req, res, next) {
        db.get_all_programs(function(err, resp) {
            res.status(200).json(resp);
        });
    }

};
