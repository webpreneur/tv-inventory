const expect = require('chai').expect;
const sinon = require('sinon');

const { User } = require('../models');
const {
    login,
    logout,
} = require('../controllers/auth');

describe('Auth Controller - Login', function() {
    it('should throw an error with code 500 if accessing the database fails', function(done) {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        };

        login(req, {}, () => {})
            .then(result => {
                expect(result).to.be.an('error');
                expect(result).to.have.property('statusCode', 500);
                done();
            });

        User.findOne.restore();
    });
});

describe('Auth Controller - Logout', function() {

    it('should throw an error if session destroy was unsuccessful', function() {

        const req = {
            session: {
                destroy: function(cb) {

                    const err = { message: 'some fake error message'};

                    cb(err);

                }
            }
        };

        expect(logout.bind(this, req, {}, () => {})).to.throw();

    });

    it('should send a JSON with status: \'logged out\' if logout was successful', function(done) {

        const req = {
            session: {
                destroy: function(cb) {

                    cb(false);

                }
            }
        };

        const res = {
            send: function(response) {
                return JSON.parse(response);
            }
        }

        logout(req, res, () => {})
            .then( result => {
                expect(result).to.have.property('status', 'logged out');
                done();
            });

    });


});

