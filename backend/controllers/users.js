const check = require('express-validator/check');
const bcrypt = require('bcryptjs');

const { User } = require('../models');

exports.createUser = async (req, res, next) => {

    const errors = check.validationResult(req);

    try {
        if ( !errors.isEmpty() ) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
    } catch(err) {
        return err;
    }

    const {
        email,
        password,
    } = req.body;

    try {

        const hashedPw = await bcrypt.hash(password, 12);

        try {

            const newUser = await User.create({
                email,
                password: hashedPw,
            })
            res.status(201).json(newUser);

            return newUser;

        } catch (err) {

            err.statusCode = 500;
            err.reason = 'The server failed to create the new user!';

            res.send(err);
            return err;
        }

    } catch(err) {

        err.statusCode = 500;
        err.reason = 'The server failed to hash the given password!';

        next(err);

        return err;
    }
}

module.exports = exports;
