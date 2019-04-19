const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models/');

const secret = '$D_Jq*+zGufkpbYh&vc2A_ejh_&T3#w_*2acTJLgBx@kPGLLP2';

exports.secret = secret;

exports.login = async (req, res, next) => {

    const {
        email,
        password,
    } = req.body;

    let loadedUser;

    try {

        // check if the user exists
        const user = await User.findOne({ email });

        if ( !user ) {
            const error = new Error('A user with this email address could not be found.');
            error.statusCode = 401;
            throw error;
        }

        loadedUser = user;

        // check if the password is ok
        const isEqual = await bcrypt.compare(password, user.password);

        if ( !isEqual ) {
            const error = new Error('Wrong password');
            error.statusCode = 401;
            throw error;
        }

        // create jwt token
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            secret,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            token,
            userId: loadedUser._id.toString(),
        });

        return;

    } catch(err) {

        if ( !err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);

        return err;

    }
}

exports.logout = (req, res, next) => {

    const result = {};

    const destroyCallback = function(result, err) {

        if (err) {
            console.error(err);
            const error = new Error('Unsuccessful logout');
            error.details = err;
            throw error;
        } else {
            result.status = 'logged out';
            res.send(JSON.stringify({status: 'logged out'}));
        }
    }

    req.session.destroy(
        destroyCallback.bind(this, result)
    );

    return Promise.resolve(result);
}

module.exports = exports;
