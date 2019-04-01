const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-3h7dy.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true`,
    { useNewUrlParser: true },
);

mongoose.Promise = Promise;

module.exports.TV = require("./tv");
