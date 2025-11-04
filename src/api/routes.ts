import express, { Request, Response, Router } from 'express';
import { useDriveDB, useExperienceApi, useInterviewApi, useModelApi } from '../services/db';
import { getDriveList } from '../services/drive';
import { useDriveApi } from './drive';
import pool from '../../db/dev/pool';

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

router.post('/disconnect-db', async (req: Request, res: Response) => {
  try {
    const poolStats = {
      totalClients: pool.totalCount,
      idleClients: pool.idleCount,
      waitingClients: pool.waitingCount
    };

    console.log('Disconnecting database pool via API...');
    console.log('Pool status before disconnect:', poolStats);

    await pool.end();

    console.log('✅ Database connection pool closed successfully via API');

    return res.status(200).json({
      status: 'success',
      message: 'Database connection pool closed successfully',
      poolStats,
      warning: 'All subsequent database queries will fail. Restart the server to reconnect.'
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isAlreadyClosed = errorMessage.includes('ended') || errorMessage.includes('end on the pool');

    if (isAlreadyClosed) {
      return res.status(200).json({
        status: 'success',
        message: 'Database pool is already closed',
        poolStats: {
          totalClients: pool.totalCount,
          idleClients: pool.idleCount,
          waitingClients: pool.waitingCount
        }
      });
    }

    console.error('❌ Error disconnecting database pool:', errorMessage);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to disconnect database pool',
      error: errorMessage
    });
  }
});

export default router;
