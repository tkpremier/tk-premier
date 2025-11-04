import { Request, Response } from 'express';
import { getFileApi, updateFileApi } from './file';

export const useDriveApi = async (req: Request, res: Response) => {
  switch (req.method) {
    case 'PATCH': {
      return await updateFileApi(req, res);
    }
    default: {
      return await getFileApi(req, res);
    }
  }
};
