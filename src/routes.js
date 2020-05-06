const express = require('express');
const {
  createAdmin,
  createDriveFile,
  createModel,
  createUser,
  signInUser,
  updateUserToAdmin
} = require('./services/db');

const router = express.Router();
router.post('/admin', createAdmin);
router.put('/admin', updateUserToAdmin);
router.post('/drive-file', createDriveFile);
router.post('/login', signInUser);
// router.get('/model', getModel);
router.post('/model', createModel);
router.post('/user', createUser);

module.exports = router;
