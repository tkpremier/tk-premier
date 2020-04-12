const express = require('express');
const { createUser, createDriveFile, createAdmin, signInUser, updateUserToAdmin } = require('./services/db');

const router = express.Router();
router.post('/admin', createAdmin);
router.put('/admin', updateUserToAdmin);
router.post('/login', signInUser);
router.post('/user', createUser);
router.post('/drive-file', createDriveFile);

module.exports = router;
