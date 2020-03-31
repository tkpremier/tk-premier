const express = require('express');
const { createUser } = require('./services/db');

const router = express.Router();

router.post('/user', createUser);

module.exports = router;
