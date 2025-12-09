import { format } from 'date-fns';
import { omit } from 'lodash';
import camelCase from 'lodash/camelCase';
import uniq from 'lodash/uniq';
import dbQuery from '../../../db/dev/dbQuery';
import { ContactDB, DbResponse } from '../../types';
import { camelCaseObject, camelCaseObjectWithDates } from './utils';

export const createModel = async data => {
  const { createdOn, driveIds, modelName, platform } = data;
  const hasIds = Array.isArray(driveIds) && driveIds.length > 0;
  const createModelQuery = hasIds
    ? `INSERT INTO model(name, platform, created_on, drive_ids) VALUES($1, $2, $3, $4) RETURNING *`
    : `INSERT INTO model(name, platform, created_on) VALUES($1, $2, $3) RETURNING *`;
  const values = [modelName, platform, createdOn];
  if (hasIds) {
    values.push(uniq(driveIds));
  }
  try {
    // Check if the column is GENERATED ALWAYS AS IDENTITY
    const identityInfo = await dbQuery.query(
      `SELECT is_identity, identity_generation 
       FROM information_schema.columns 
       WHERE table_name = 'model' AND column_name = 'id'`,
      []
    );
    const isGeneratedAlways =
      identityInfo.rows[0]?.is_identity === 'YES' && identityInfo.rows[0]?.identity_generation === 'ALWAYS';
    console.log('Is GENERATED ALWAYS AS IDENTITY:', isGeneratedAlways);

    // Get current max id
    const maxIdResult = await dbQuery.query(`SELECT MAX(id) as max_id FROM model`, []);
    const maxId = maxIdResult.rows[0]?.max_id ?? 0;
    console.log('Current MAX(id) in model table:', maxId);

    // For GENERATED ALWAYS AS IDENTITY columns, use ALTER TABLE ... RESTART WITH
    // For regular SERIAL columns, use setval
    const nextId = maxId + 1;
    console.log('Setting next available id to:', nextId);

    if (isGeneratedAlways) {
      // Use ALTER TABLE to restart the identity column
      // RESTART WITH doesn't support parameterized queries, so we use a literal value
      // nextId is safe to interpolate as it's derived from MAX(id) + 1
      await dbQuery.query(`ALTER TABLE model ALTER COLUMN id RESTART WITH ${nextId}`, []);
      console.log('Identity column restarted to:', nextId);
    } else {
      // Use setval for regular SERIAL sequences
      const setvalResult = await dbQuery.query(`SELECT setval('model_id_seq', $1, false)`, [nextId]);
      console.log('Sequence setval result:', setvalResult.rows[0]);
    }

    // For GENERATED ALWAYS AS IDENTITY columns, we must NOT include id in the INSERT
    // The sequence sync above ensures the next auto-generated value is correct
    // Just use the original query without id
    const dbResponse = (await dbQuery.query(createModelQuery, values)) as DbResponse;
    return dbResponse;
  } catch (error) {
    console.error('createModel db error: ', error);
    return error;
  }
};

export const getAllModels = async () => {
  const getModelQuery = `SELECT * FROM
  model ORDER BY id DESC`;
  try {
    const { rows } = await dbQuery.query(getModelQuery, []);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return {
      data: dbResponse.map((f: ContactDB) =>
        Object.keys(f).reduce((o: { [key: string]: Date | Array<string> | number | string }, k: keyof ContactDB) => {
          o[camelCase(k)] =
            f[k] instanceof Date ? format(new Date(f[k] as ContactDB['createdOn']), "MM/dd/yyyy' 'HH:mm:ss") : f[k];
          return o;
        }, {})
      )
    };
  } catch (error) {
    console.error('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

export const getModel = async (id: number) => {
  const getModelQuery = `SELECT
	model.name as model_name, drive.name, drive.thumbnail_link, drive.model_id, model.id, model.drive_ids, drive.drive_id, drive.type, drive.created_time, drive.last_viewed FROM model INNER JOIN drive
	ON drive.drive_id = ANY(model.drive_ids) WHERE model.id = $1
	ORDER BY drive.created_time DESC`;
  const value = [id];
  try {
    const { rows } = (await dbQuery.query(getModelQuery, value)) as DbResponse<
      ContactDB & { drive_ids?: Array<string> }
    >;
    console.log('db response row: ', rows, rows.length);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [], driveIds: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    const data = camelCaseObject(
      omit(
        dbResponse[0] as unknown as Record<string, unknown> & { drive_ids?: Array<string> },
        'thumbnail_link',
        'created_time',
        'last_viewed',
        'drive_ids',
        'drive_id',
        'name',
        'type'
      )
    );
    data.driveFiles = dbResponse.map(
      (f: ContactDB & { createdTime: Date; lastViewed: Date }) =>
        camelCaseObjectWithDates(
          omit(f as unknown as Record<string, unknown>, 'drive_ids', 'model_id', 'model_name', 'id'),
          ['createdTime', 'lastViewed']
        ) as unknown as Record<string, unknown> & { createdTime: Date; lastViewed: Date }
    ) as Array<Record<string, unknown> & { createdTime: Date; lastViewed: Date }>;
    return {
      data: [data]
    };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

export const updateModel = async (modelId: number, driveIds: Array<string>) => {
  /**
   *  const query = `UPDATE model
  SET ${data.shift()} = array_cat(drive_ids, $1)
  WHERE id = $2`;
  console.log('data: [model_id, id] ', data);
   */
  console.log('driveIds: ', driveIds);
  const query = `UPDATE model
  SET drive_ids = $1
  WHERE id = $2
  RETURNING *`;
  try {
    const { rows } = (await dbQuery.query(query, [driveIds, modelId])) as DbResponse<ContactDB>;
    return {
      data: rows.map((f: ContactDB) => camelCaseObjectWithDates(f as unknown as Record<string, unknown>, ['createdOn']))
    };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};
