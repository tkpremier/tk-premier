import express, { Request, Response, Router } from 'express';
import {
  //   createModel,
  //   createUser,
  //   signInUser,
  //   updateUserToAdmin,
  useDriveApi,
  useExperienceApi,
  useInterviewApi,
  useModelApi
} from '../services/db';
import { getDriveList, getFileApi } from '../services/drive';

type RequestWithQuery = Request & {
  query?: {
    [key: string]: string;
  };
};

const router = express.Router() as Router;
router.use('/interview', useInterviewApi);
router.get('/drive-google', async (req: RequestWithQuery, res: Response) => {
  try {
    const response = await getDriveList(req.query.nextPage);
    res.status(200).send(response.data);
  } catch (e) {
    console.log('there was an error: ', e);
    res.status(500).send({ files: [], nextPageToken: '' });
  }
});
router.use('/drive-list/:id', useDriveApi);
router.use('/drive-list', useDriveApi);
router.use('/model/:id', useModelApi);
router.use('/model', useModelApi);
router.get('/drive-file/:driveId', getFileApi);
// router.get('/model', getModel);
// router.post('/model', createModel);
// router.post('/user', createUser);
router.use('/experience', useExperienceApi);
export default router;
