var app = require('../index.js');
var db = app.get('db');

module.exports = {

    getAll: function(req, res, next) {
        db.get_all_clients(function(err, resp) {
            console.log(resp);
            res.status(200).json(resp);
        });
    },
    getOne: function(req, res, next) {
        db.get_one_client(req.params.id, function(err, resp) {
            res.status(200).json(resp);
        });
    },
    addClient: function(req, res, next) {
        db.add_client([req.body.name, req.body.age, req.body.date_of_birth, req.body.department, req.body.case_manager, req.body.case_manager_id, req.body.image], function(err, resp) {
            console.log(resp);
            res.status(200).json('Client Added!');
        });
    },
    updateClient: function(req, res, next) {
        db.update_client_information(req.params.id, function(err, resp) {
            res.status(200).json('Client Information Updated!');
        });
    },
    removeClient: function(req, res, next) {
        db.delete_client(req.params.id, function(err, resp) {
            res.status(200).json('Client Deleted!');
        });
    }
};
