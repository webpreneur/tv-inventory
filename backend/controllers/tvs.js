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

exports.createTV = (req, res) => {

    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        })
    }

    TV.create(req.body)
        .then((newTV) => res.status(201).json(newTV))
        .catch((err) => res.send(err));
}

exports.getTV = (req, res) => {
    TV.findById(req.params.tvId)
        .then((foundTV) => res.json(foundTV))
        .catch((err) => res.send(err));
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