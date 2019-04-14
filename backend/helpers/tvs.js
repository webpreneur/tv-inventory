const { validationResult } = require('express-validator/check');

const db = require('../models');

exports.getTVs = (req, res) => {
    db.TV.find()
        .then((tvs) => res.json(tvs))
        .catch((err) => res.send(err));
}

exports.createTV = (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Validation failed, entered data is incorrect.',
            errors: errors.array()
        })
    }

    db.TV.create(req.body)
        .then((newTV) => res.status(201).json(newTV))
        .catch((err) => res.send(err));
}

exports.getTV = (req, res) => {
    db.TV.findById(req.params.tvId)
        .then((foundTV) => res.json(foundTV))
        .catch((err) => res.send(err));
}

exports.updateTV = (req, res) => {
    db.TV.findOneAndUpdate(
        { _id: req.params.tvId },
        req.body,
        { new: true }
    )
        .then((tv) => res.json(tv))
        .catch((err) => res.send(err))
}

exports.deleteTV = (req, res) => {
    db.TV.remove({_id: req.params.tvId})
        .then(() => res.json({message: 'We deleted it!'}))
        .catch((err) => res.send(err));
}

module.exports = exports;