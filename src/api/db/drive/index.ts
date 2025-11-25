import { Request, Response } from 'express';
import { createDrive, getDrive, updateDrive } from '../../../services/db/drive';
import { ErrorResponse } from '../../../types';
import { status } from '../../../utils/status';

const createDriveRow = async (req: Request, res: Response) => {
  console.log('newDrive data: ', req.body);
  const values = Object.keys(req.body).map(k => req.body[k]);
  console.log('new drive files values: ', values);
  try {
    const rows = await createDrive(values);
    const data = rows[0];
    return res.status(status.created).send({ data });
  } catch (error) {
    console.log('error?: ', error);
    return res.status(status.error).send({ data: [] });
  }
};

export const updateDriveRow = async (req: Request, res: Response) => {
  try {
    const { data } = await updateDrive(req.body);
    // if (data && data.length === 0) {
    //   errorMessage.error = 'No updates to be made';
    //   return res.status(status.notfound).send(errorMessage);
    // }
    return res.status(status.success).send(data);
  } catch (error) {
    console.log('An error occurred', error);
    let errorMessage: ErrorResponse;
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};

const getDriveRows = async (req: Request, res: Response) => {
  try {
    console.log('getDriveRows');
    const response = await getDrive();
    if (response instanceof Error) {
      throw response;
    }
    if (response && response.data.length === 0) {
      return res.status(status.notfound).send({ data: {} });
    }
    return res.status(status.success).send({ data: response.data });
  } catch (error) {
    console.error('getDriveRows error: ', error);
    return res.status(status.error).send({ data: {} });
  }
};

export const useDriveDB = async (req: Request, res: Response) => {
  switch (req.method) {
    case 'POST': {
      return await createDriveRow(req, res);
    }
    case 'PUT': {
      return await updateDriveRow(req, res);
    }
    default: {
      return await getDriveRows(req, res);
    }
  }
};
