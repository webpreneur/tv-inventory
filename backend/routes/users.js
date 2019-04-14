const express = require('express');
const { body } = require('express-validator/check');

const { User } = require('../models');

const router = express.Router();

const { createUser } = require('../helpers/users');

router.route('/')
    .post([
        body('email')
            .isEmail()
            .withMessage('Please enter a vlaid email.')
            .custom( (value, { req }) => {
                return User.findOne({email: value}).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject('E-mail address already exists!');
                    }
                })
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({min: 5})
            .withMessage('Please provide a password with a min length of 5 characters.'),
    ], createUser);

module.exports = router;