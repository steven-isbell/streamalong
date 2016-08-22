var app = require('../index.js');
var db = app.get('db');

module.exports = {
    addProgram: function(req, res, next) {
        db.add_program([req.body.name, req.body.city, req.body.phone_number, req.body.description, req.body.image], function(err, resp) {
            res.status(200).json('Program Added!');
        });
    },
    getPrograms: function(req, res, next) {
        db.get_all_programs(function(err, resp) {
            res.status(200).json(resp);
        });
    },
    deleteProgram: function(req, res, next) {
        db.delete_program(req.params.id, function(err, resp) {
            res.status(200).json('Program Removed!');
        });
    }
};
