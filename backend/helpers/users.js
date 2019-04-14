const db = require('../models');

exports.createUser = (req, res) => {
    db.User.create(req.body)
        .then((newUser) => res.status(201).json(newUser))
        .catch((err) => res.send(err));
}

module.exports = exports;
