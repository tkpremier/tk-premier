import { Request, Response } from 'express';
import { getModel, getAllModels, updateModel, createModel } from '../../services/db/model';
import { status } from '../../utils/status';
import { ContactDB } from '../../types';
import camelCase from 'lodash/camelCase';
import { format } from 'date-fns';
import { isEmpty } from '../../utils/validations';
import { ErrorResponse } from '../../types';

const createModelApi = async (req: Request, res: Response) => {
  try {
    const { driveIds, modelName, platform } = req.body;
    const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    let errorMessage: ErrorResponse;
    if (isEmpty(modelName) || isEmpty(platform)) {
      errorMessage.error = 'Name or platform cannot be empty';
      return res.status(status.bad).send(errorMessage);
    }
    const dbResponse = await createModel({ driveIds, modelName, platform, createdOn });
    const data = dbResponse.rows;
    return res.status(status.success).send({ data });
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
    const { data } = await updateModel(id, driveIds);
    const response = data.map((f: ContactDB) =>
      Object.keys(f).reduce(
        (o: { [key: string]: string | number | null | Array<string> | Date }, k: keyof ContactDB) => {
          o[camelCase(k)] =
            f[k] instanceof Date ? format(new Date(f[k] as ContactDB['createdOn']), "MM/dd/yyyy' 'HH:mm:ss") : f[k];
          return o;
        },
        {}
      )
    );
    return res.status(status.success).send(response);
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
