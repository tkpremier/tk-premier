import { format } from 'date-fns';
import { Request, Response } from 'express';
import uniq from 'lodash/uniq';
import { createModel, getAllModels, getModel, updateModel } from '../../services/db/model';
import { camelCaseObjectWithDates } from '../../services/db/utils';
import { ContactDB } from '../../types';
import { status } from '../../utils/status';
import { isEmpty } from '../../utils/validations';

const createModelApi = async (req: Request, res: Response) => {
  try {
    const { driveIds, modelName, platform } = req.body;
    const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    if (isEmpty(modelName) || isEmpty(platform)) {
      throw Error('Name or platform cannot be empty');
    }
    const dbResponse = await createModel({ driveIds, modelName, platform, createdOn });
    const data = dbResponse.rows;
    return res.status(status.success).send({
      data: data.map((m: ContactDB) =>
        camelCaseObjectWithDates(m as unknown as Record<string, unknown>, ['createdOn'])
      ) as ContactDB[]
    });
  } catch (error) {
    console.error('createModelApi error: ', error);
    return res.status(status.error).send({ data: [] });
  }
};

const getModelApi = async (req: Request, res: Response) => {
  try {
    const { data } = req.params.id ? await getModel(parseInt(req.params.id) || 0) : await getAllModels();
    const dbResponse = data;
    if (dbResponse[0] === undefined) {
      return res.status(status.notfound).send({ data: {} });
    }
    return res.status(status.success).send({ data });
  } catch (error) {
    console.log('error: ', error);
    return res.status(status.error).send({ data: {} });
  }
};

const updateModelApi = async (req: Request, res: Response) => {
  try {
    const { id, driveIds } = req.body;
    const { data } = await updateModel(id, uniq(driveIds));
    return res.status(status.success).send({ data });
  } catch (error) {
    console.log('error: ', error);
    return res.status(status.error).send(error);
  }
};
export const useModelApi = async (req: Request, res: Response) => {
  try {
    switch (req.method) {
      case 'POST': {
        const response = await createModelApi(req, res);
        return response;
      }
      case 'PUT': {
        const response = await updateModelApi(req, res);
        return response;
      }
      default: {
        return await getModelApi(req, res);
      }
    }
  } catch (error) {
    console.log('An error occurred', error);
    return res.status(status.error).send({ data: [] });
  }
};
