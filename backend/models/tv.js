const mongoose = require('mongoose');

const tvSchema = new mongoose.Schema({
    displaySizeInInches: {
        type: Number,
        required: true,
    },
    displayType: {
        type: String,
        required: true,
    },
    resolutionK: {
        type: Number,
        required: true,
    },
    outputs: {
        type: Array,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    itemNo: {
        type: String,
        required: true,
    }
});

const TV = mongoose.model('TV', tvSchema, 'tvs');

module.exports = TV;




