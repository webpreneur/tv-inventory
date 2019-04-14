const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const db = require('../models');

exports.createUser = (req, res) => {

    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const { email, password } = req.body;

    bcrypt.hash(password, 12)
        .then(hashedPw => {
            db.User.create({
                email,
                password: hashedPw,
            })
                .then( newUser => res.status(201).json(newUser))
                .catch( err => res.send(err));
        })
        .catch(err => {
            if ( !err.statusCode ) {
                err.statusCode = 500;
            }
            next(err);
        });


}

module.exports = exports;
