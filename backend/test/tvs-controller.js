require('dotenv').config();

const expect = require('chai').expect;
const type = require('type-detect');
const mongoose = require('mongoose');


const {
    TV,
} = require('../models');

const {
    login,
    logout,
} = require('../controllers/auth');

const {
    getTVs,
    createTV,
    getTV,
    updateTV,
    deleteTV
} = require('../controllers/tvs');

let createdTvsId = '';

describe('TVs Controller', function() {

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

    it('should add a created tv to the tvs collection', function(done) {

        const req = {
            body: {
                displaySizeInInches: 1,
                displayType: 'led',
                resolutionK: 4,
                outputs: ['hdmi', 'vga'],
                name: 'Visio 2019',
                itemNo: 'jibberishKU',
                _id: '5cb8b6531e5fd02d5cf33b03'
            }
        };

        const res = {
            status: function() {
                return this;
            },
            json: function() {}
        };

        createTV(req, res, () => {})
            .then(savedTv => {

                createdTvsId = savedTv._id;

                expect(savedTv).to.have.property('displaySizeInInches', 1);
                expect(savedTv).to.have.property('displayType', 'led');
                expect(savedTv).to.have.property('resolutionK', 4);
                expect(savedTv).to.have.property('outputs');
                expect(savedTv).to.have.property('name', 'Visio 2019');
                expect(savedTv).to.have.property('itemNo', 'jibberishKU');
                expect(savedTv).to.have.property('_id');
                done();
            });

    });

    it('should return the tvs from the db', function(done) {

        const res = {
            status: function() {
                return this;
            },
            json: function() {}
        };

        getTVs({}, res, () => {})
            .then(tvs => {
                console.log({ getTVs: tvs });
                expect(tvs).to.be.an('array');
                done();
            });
    });

    it('should return a tv from the db', function(done) {

        const req = {
            params: {
                tvId: createdTvsId,
            }
        };

        const res = {
            status: function() {
                return this;
            },
            json: function() {}
        };

        getTV(req, res, () => {})
            .then( foundTV => {
                expect(foundTV).to.have.property('displaySizeInInches', 1);
                expect(foundTV).to.have.property('displayType', 'led');
                expect(foundTV).to.have.property('resolutionK', 4);
                expect(foundTV).to.have.property('outputs');
                expect(foundTV).to.have.property('name', 'Visio 2019');
                expect(foundTV).to.have.property('itemNo', 'jibberishKU');
                expect(foundTV).to.have.property('_id');
                done();
            });

    });

    it('should update a tv in the db', function(done) {

        const req = {
            params: {
                tvId: createdTvsId,
            },
            body: {
                displaySizeInInches: 2,
                displayType: 'plazma',
                resolutionK: 8,
                outputs: ['hdmi', 'vga'],
                name: 'Visio 2019',
                itemNo: 'jibberishKU',
                _id: '5cb8b6531e5fd02d5cf33b03'
            }
        };

        const res = {
            status: function() {
                return this;
            },
            json: function() {}
        };

        updateTV(req, res, () => {})
            .then( updatedTv => {
                expect(updatedTv).to.have.property('displaySizeInInches', 2);
                expect(updatedTv).to.have.property('displayType', 'plazma');
                expect(updatedTv).to.have.property('resolutionK', 8);
                expect(updatedTv).to.have.property('outputs');
                expect(updatedTv).to.have.property('name', 'Visio 2019');
                expect(updatedTv).to.have.property('itemNo', 'jibberishKU');
                expect(updatedTv).to.have.property('_id');
                done();
            });

    });

    it('should delete a tv from the db', function(done) {

        const req = {
            params: {
                tvId: createdTvsId,
            }
        };

        const res = {
            status: function() {
                return this;
            },
            json: function() {}
        };

        deleteTV(req, res, () => {})
            .then( (result) => {
                expect(result).to.be.true;
                done();
            });

    });

    after(function(done) {
        TV.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    });

});
