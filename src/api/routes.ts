import express, { Request, Response, Router } from 'express';
import { useDriveDB, useExperienceApi, useInterviewApi, useModelApi } from '../services/db';
import { getDriveList } from '../services/drive';
import { useDriveApi } from './drive';

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
router.use('/drive-list/:id', useDriveDB);
router.use('/drive-list', useDriveDB);
router.use('/model/:id', useModelApi);
router.use('/model', useModelApi);
router.use('/drive-file/:driveId', useDriveApi);
router.use('/experience', useExperienceApi);

export default router;
