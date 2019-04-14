exports.postLogin = (req, res, next) => {
    req.session.isLoggednIn = true;
    res.send(JSON.stringify({status: 'logged in'}))
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
