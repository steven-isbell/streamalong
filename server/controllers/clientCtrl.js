const app = require('../index.js');
const db = app.get('db');

module.exports = {

    getAll: (req, res, next) => {
        db.get_all_clients(req.params.id, (err, resp) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(resp);
            }
        });
    },
    getOne: (req, res, next) => {
        db.get_one_client(req.params.id, (err, resp) => {
            res.status(200).json(resp);
        });
    },
    addClient: (req, res, next) => {
        db.add_client([req.body.name, req.body.age, req.body.date_of_birth, req.body.case_manager, req.body.case_manager_id, req.body.client_image], (err, resp) => {
            if (err) {
                return res.status(400).json('Wrong ID Entered!');
            } else {
                res.status(200).json('Client Added!');
            }
        });
    },
    removeClient: (req, res, next) => {
        db.delete_client(req.params.id, (err, resp) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json('Client Deleted!');
            }
        });
    }
};
