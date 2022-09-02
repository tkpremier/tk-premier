/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
var express = require('express');
import { getDriveList, getFileApi } from './services/drive';
import {
  //   createModel,
  //   createUser,
  //   signInUser,
  //   updateUserToAdmin,
  useExperienceApi,
  useInterviewApi
} from './services/db';

const router = express.Router();
router.use('/interview', useInterviewApi);
router.get('/drive-list', async (req, res) => {
  const response = await getDriveList(req.query.nextPage);
  res.status(200).send(
    JSON.stringify({
      files: response.data.files,
      nextPageToken: response.data.nextPageToken
    })
  );
});
router.get('/drive-file', getFileApi);
// router.get('/model', getModel);
// router.post('/model', createModel);
// router.post('/user', createUser);
router.use('/experience', useExperienceApi);
export default router;
