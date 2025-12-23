import { Request, Response } from 'express';
import { deleteDriveFile, getFile, updateFile } from '../../services/drive';

export const getFileApi = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await getFile(req.params.driveId.toString());
    return res.status(200).send(data);
  } catch (e) {
    console.error('getFileApi error: ', e);
    return res.status(500).send(e);
  }
};

export const updateFileApi = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await updateFile(req.params.driveId.toString(), req.body);
    return res.status(200).send(data);
  } catch (e) {
    console.error('updateFileApi error: ', e);
    return res.status(500).send(e);
  }
};

export const deleteFileApi = async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await deleteDriveFile(req.params.driveId.toString());
    return res.status(200).send(data);
  } catch (e) {
    console.error('deleteFileApi error: ', e);
    return res.status(500).send(e);
  }
};
