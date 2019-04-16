const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const { User } = require('../models');

exports.createUser = async (req, res) => {

    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    const { email, password } = req.body;

    try {

        const hashedPw = await bcrypt.hash(password, 12);

        try {

            const newUser = await User.create({
                email,
                password: hashedPw,
            })
            res.status(201).json(newUser);

        } catch (err) {
            res.send(err);
        }

    } catch(err) {

        if ( !err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);

    }

}

module.exports = exports;
