const express = require('express');
const router = express.Router();
const {
    getTVs, createTV, getTV, updateTV, deleteTV
} = require('../helpers/tvs');

router.route('/')
    .get(getTVs)
    .post(createTV)

router.route('/tvId')
    .get(getTV)
    .put(updateTV)
    .delete(deleteTV)

module.exports = router;
