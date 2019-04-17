const { validationResult } = require('express-validator/check');

const { TV } = require('../models');

exports.getTVs = async (req, res) => {

    try {

        const tvs = await TV.find();

        res.status(200).json(tvs);

    } catch (err) {

        if ( !err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);

    }

}

exports.createTV = async (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        })
    }

    try {

        const newTV = await TV.create(req.body);
        res.status(201).json(newTV);
        return newTV;

    } catch (err) {
        res.send(err);
    }
}

exports.getTV = async (req, res) => {
    try {
        const foundTV = await TV.findById(req.params.tvId);
        if( !foundTV ) {
            const error = new Error('TV not found.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(foundTV);
    } catch (err) {
        if ( !err.statusCode ) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateTV = (req, res) => {
    TV.findOneAndUpdate(
        { _id: req.params.tvId },
        req.body,
        { new: true }
    )
        .then((tv) => res.json(tv))
        .catch((err) => res.send(err))
}

exports.deleteTV = (req, res) => {
    TV.remove({_id: req.params.tvId})
        .then(() => res.json({message: 'We deleted it!'}))
        .catch((err) => res.send(err));
}

module.exports = exports;