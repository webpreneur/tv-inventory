const mongoose = require('mongoose');

const tvSchema = new mongoose.Schema({
    displaySizeInInches: {
        type: Number,
        required: '',
    },
    displayType: {
        type: String,
    },
    resolutionK: {
        type: Number,
    },
    outputs: {
        type: Array,
    },
    name: {
        type: String,
    },
    itemNo: {
        type: String,
    }
});

const TV = mongoose.model('TV', tvSchema);

module.exports = TV;




