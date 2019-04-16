const jwt = require('jsonwebtoken');

const { secret } = require('../controllers/auth');

module.exports = (req, res, next) => {

    const authHeader = req.get('Authorization');

    console.log({authHeader});

    if ( !authHeader ) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    const token = authHeader.split(' ')[1];

    console.log({token});

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, secret);
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }

    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;

    next();

};