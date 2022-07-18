const express = require('express');
const { getDriveListApi, getFileApi } = require('./services/drive');
const {
  addExp,
  addInterviewApi,
  createAdmin,
  createDriveFileApi,
  createModel,
  createUser,
  getInterviewApi,
  signInUser,
  updateUserToAdmin,
  useInterviewApi
} = require('./services/db');

const router = express.Router();
router.use('/interview', useInterviewApi);
// router.get('/interview', getInterviewApi);
// router.post('/interview', addInterviewApi);
router.get('/drive-list', getDriveListApi);
router.post('/admin', createAdmin);
router.put('/admin', updateUserToAdmin);
router.get('/drive-file', getFileApi);
router.post('/drive-file', createDriveFileApi);
router.post('/login', signInUser);
// router.get('/model', getModel);
router.post('/model', createModel);
router.post('/user', createUser);
router.post('/experience', addExp);
module.exports = router;
