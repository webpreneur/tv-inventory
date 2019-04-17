require('dotenv').config();

const expect = require('chai').expect;
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

console.log(process.env.TEST_DB_URI);

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
                itemNo: 'jibbersishKU',
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
                console.log(savedTv);
                expect(savedTv).to.have.property('displaySizeInInches');
                expect(savedTv).to.have.property('displayType');
                expect(savedTv).to.have.property('resolutionK');
                expect(savedTv).to.have.property('outputs');
                expect(savedTv).to.have.property('name');
                expect(savedTv).to.have.property('itemNo');
                expect(savedTv).to.have.property('_id');
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
