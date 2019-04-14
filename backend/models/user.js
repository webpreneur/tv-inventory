const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: '',
    },
    password: {
        type: String,
        required: '',
    }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;




