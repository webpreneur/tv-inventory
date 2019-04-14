const mongoose = require('mongoose');
const DB_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-3h7dy.mongodb.net/${process.env.DB_DATABASE}`;

mongoose.set('debug', true);
mongoose.connect(`${DB_URI}?retryWrites=true`, { useNewUrlParser: true });

mongoose.Promise = Promise;

module.exports = {
    DB_URI,
    TV: require("./tv"),
    User: require("./user"),
}

