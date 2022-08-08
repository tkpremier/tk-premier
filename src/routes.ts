/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
var express = require('express');
import { getDriveListApi, getFileApi } from './services/drive';
import {
    addExp,
  //   createModel,
  //   createUser,
  //   signInUser,
  //   updateUserToAdmin,
  useInterviewApi
} from './services/db';

const router = express.Router();
router.use('/interview', useInterviewApi);
router.get('/drive-list', getDriveListApi);
router.get('/drive-file', getFileApi);
// router.get('/model', getModel);
// router.post('/model', createModel);
// router.post('/user', createUser);
router.post('/experience', addExp);
export default router;
