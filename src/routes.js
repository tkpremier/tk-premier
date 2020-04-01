const express = require('express');
const { createUser, createDriveFile } = require('./services/db');

const router = express.Router();
router.post('/user', createUser);
router.post('/drive-file', createDriveFile);

module.exports = router;
