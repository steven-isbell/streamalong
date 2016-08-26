var app = require('../index.js');
var db = app.get('db');

module.exports = {
    addProgram: (req, res, next) => {
        db.add_program([req.body.name, req.body.city, req.body.phone_number, req.body.description, req.body.image], (err, resp) => {
            if (err) {res.status(400).json(err);}
            else {res.status(200).json('Program Added!');}
        });
    },
    getPrograms: (req, res, next) => {
        db.get_all_programs(function(err, resp) {
            if (err) {res.status(400).json(err);}
            else {res.status(200).json(resp);}
        });
    },
    deleteProgram: function(req, res, next) {
        db.delete_program(req.params.id, (err, resp) => {
            if (err) {res.status(400).json(err);}
            else {res.status(200).json('Program Removed!');}
        });
    }
};
