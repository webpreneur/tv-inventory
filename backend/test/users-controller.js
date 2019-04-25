const expect = require('chai').expect;
const mongoose = require('mongoose');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const check = require('express-validator/check');

const {
    User,
} = require('../models');

const {
    createUser,
} = require('../controllers/users');

let createdUsersId = '';

describe('Users Controller', function() {

    before(function(done) {
        mongoose
            .connect(
                `${process.env.TEST_DB_URI}?retryWrites=true`,
                { useNewUrlParser: true }
            )
            .then((result) => {
                done();
            })
            .catch(err => console.error(err))
    })

    it('should add a created user to the users collection', function(done) {

        const req = {
            body: {
                email: 'test@smith.co.uk',
                password: 'someVeryStrongPassword',
            }
        };

        const res = {
            status: function() {
                return this;
            },
            json: function() {}
        };

        createUser(req, res, () => {})
            .then(savedUser => {

                createdUsersId = savedUser._id;

                expect(savedUser).to.have.property('email', 'test@smith.co.uk');
                expect(savedUser).to.have.property('_id');

                done();
            });

    });

    it('should throw an error with a statuscode of 422, if the express validator produces errors', async () => {

        sinon.stub(check, 'validationResult');

        check.validationResult.returns({
            isEmpty: () => false,
            array: () => [],
        });

        const result = await createUser({}, {}, () => {});

        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 422);
        expect(result).to.have.property('data');

        check.validationResult.restore();

    });

    it('should throw an error with a status code of 500, if the server cannot create the new user', async () => {

        sinon.stub(User, 'create');
        User.create.throws();

        const req = {
            body: {
                email: 'test@smith.co.uk',
                password: 'someVeryStrongPassword',
            }
        };

        const res = {
            status: function() {
                return this;
            },
            json: function() {},
            send: () => {},
        };

        const result = await createUser(req, res, () => {})

        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 500);
        expect(result).to.have.property('reason', 'The server failed to create the new user!');

        User.create.restore();

    });

    it('should throw an error with a status code of 500, if the server cannot hash the password', async () => {

        sinon.stub(bcrypt, 'hash');
        bcrypt.hash.throws();

        const req = {
            body: {
                email: 'test@smith.co.uk',
                password: 'someVeryStrongPassword',
            }
        };

        const res = {
            status: function() {
                return this;
            },
            json: function() {},
            send: () => {},
        };

        const result = await createUser(req, res, () => {})

        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 500);
        expect(result).to.have.property('reason', 'The server failed to hash the given password!');

        bcrypt.hash.restore();

    });

    after(function(done) {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    });

});
