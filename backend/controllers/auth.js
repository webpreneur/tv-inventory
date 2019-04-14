const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/');

exports.postLogin = (req, res, next) => {

    const { email, password } = req.body;
    let loadedUser;

    console.log(email);

    User.findOne({
        email: email
    })
        .then(user => {
            if (!user) {
                const error = new Error('A user with this email address could not be found.');
                error.statusCode = 401;
                throw error;
            }
            loadedUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then( isEqual => {
            if ( !isEqual ) {
                const error = new Error('Wrong password');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString()
                },
                '$D_Jq*+zGufkpbYh&vc2A_ejh_&T3#w_*2acTJLgBx@kPGLLP2',
                { expiresIn: '1h' }
            );
            res.status(200).json({ token, userId: loadedUser._id.toString() });
        })
        .catch(err => {
            if ( !err.statusCode ) {
                err.statusCode = 500;
            }
            next(err);
        })
}
exports.postLogout = (req, res, next) => {
    req.session.destroy( err => {
        if (err) {
            console.error(err);
        } else {
            res.send(JSON.stringify({status: 'logged out'}))
        }
    });
}

module.exports = exports;
