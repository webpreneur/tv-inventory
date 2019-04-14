const express = require('express');

const router = express.Router();

const { createUser } = require('../helpers/users');

router.route('/')
    .post(createUser)

module.exports = router;