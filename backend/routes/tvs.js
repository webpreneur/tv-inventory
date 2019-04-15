const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();
const {
    getTVs,
    createTV,
    getTV,
    updateTV,
    deleteTV
} = require('../helpers/tvs');
const isAuth = require('../middleware/is-auth');

router.route('/', isAuth)
    .get(getTVs)
    .post([
        body('displaySizeInInches')
            .trim()
            .isLength({min: 1}),
        body('displayType')
            .trim()
            .isLength({min: 1}),
        body('resolutionK')
            .trim()
            .isLength({min: 1}),
        body('outputs')
            .trim()
            .isLength({min: 1}),
        body('name')
            .trim()
            .isLength({min: 1}),
        body('itemNo')
            .trim()
            .isLength({min: 1}),
    ], createTV)

router.route('/:tvId', isAuth)
    .get(getTV)
    .put(updateTV)
    .delete(deleteTV)

module.exports = router;
