import { Request, Response } from 'express';
import { deleteFileApi, getFileApi, updateFileApi } from './file';

export const useDriveApi = async (req: Request, res: Response) => {
  switch (req.method) {
    case 'DELETE': {
      return await deleteFileApi(req, res);
    }
    case 'PATCH': {
      return await updateFileApi(req, res);
    }
    default: {
      return await getFileApi(req, res);
    }
  }
};
