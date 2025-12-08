import format from 'date-fns/format';
import dbQuery from '../../../db/dev/dbQuery';
import { DbResponse, DriveDB, DriveInsertValue, DriveUpdatePayload, ODriveFile } from '../../types';
import { camelCaseObjectWithDates, normalizeColumnName } from './utils';

export const createDrive = async (values: DriveInsertValue[]): Promise<DbResponse['rows']> => {
  /*
    (id VARCHAR(100) NOT NULL,
    drive_id VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    web_view_link VARCHAR(100) NOT NULL,
    web_content_link VARCHAR(100) NOT NULL,
    thumbnail_link VARCHAR(100),
    created_time DATE NOT NULL,
    viewed_time DATE NOT NULL,
    created_on DATE NOT NULL)
  */
  const createDriveFileQuery = `INSERT INTO
  drive(id, drive_id, type, name, web_view_link, web_content_link, thumbnail_link, created_time, last_viewed, duration, model_id, description, size, created_on)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  returning *`;
  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  values.push(createdOn);
  const { rows } = (await dbQuery.query(createDriveFileQuery, values)) as DbResponse;
  return rows;
};

export const getDrive = async () => {
  const getDriveFileQuery = `SELECT * FROM
  drive ORDER BY created_time DESC`;
  try {
    const { rows: data } = (await dbQuery.query(getDriveFileQuery, [])) as DbResponse;
    if (data[0] === undefined) {
      console.log('There are no drive files');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }

    return {
      data: data.map((f: DriveDB) =>
        camelCaseObjectWithDates(f, ['createdOn', 'createdTime', 'lastViewed'])
      ) as Array<ODriveFile>
    };
  } catch (error) {
    return new Error(error);
  }
};

export const updateDrive = async (
  data: Array<string | number | Array<number>> | DriveUpdatePayload
): Promise<{ data: DbResponse['rows'] }> => {
  if (Array.isArray(data)) {
    const mutableData = [...data];
    const column = mutableData.shift();
    if (!column) {
      console.warn('updateDrive called without column name for legacy payload');
      return { data: [] };
    }
    const query = `UPDATE drive
  SET ${column} = array_cat(model_id, $1)
  WHERE id = $2`;
    try {
      const { rows } = (await dbQuery.query(query, mutableData)) as DbResponse;
      console.log('query', query, 'dta', mutableData, rows);
      return {
        data: rows
      };
    } catch (error) {
      console.log('An error occurred', error);
      return { data: [] };
    }
  }

  if (!data || typeof data !== 'object') {
    return { data: [] };
  }

  const payload = { ...data };
  const identifier = payload.id ?? payload.driveId ?? payload.drive_id;
  const identifierColumn = payload.id ? 'id' : 'drive_id';

  delete payload.id;
  delete payload.driveId;
  delete payload.drive_id;

  const entries = Object.entries(payload).filter(([, value]) => value !== undefined);

  if (!identifier) {
    console.warn('updateDrive called without identifier');
    return { data: [] };
  }

  if (entries.length === 0) {
    return { data: [] };
  }

  const setClause = entries.map(([key], index) => `${normalizeColumnName(key)} = $${index + 1}`).join(', ');
  const values = entries.map(([, value]) => value);
  values.push(identifier);

  const query = `UPDATE drive
  SET ${setClause}
  WHERE ${identifierColumn} = $${values.length}
  RETURNING *`;

  try {
    const { rows } = (await dbQuery.query(query, values)) as DbResponse;
    return {
      data: rows.map((f: DriveDB) => camelCaseObjectWithDates(f, ['createdOn', 'createdTime', 'lastViewed']))
    };
  } catch (error) {
    console.log('An error occurred', error);
    return { data: [] };
  }
};
