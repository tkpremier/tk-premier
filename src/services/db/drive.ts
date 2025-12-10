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

export const getDrive = async (id?: string) => {
  const getDriveFileQuery = id
    ? `SELECT * FROM
  drive WHERE id = $1`
    : `SELECT * FROM
  drive ORDER BY created_time DESC`;
  const values = id ? [id] : [];
  try {
    const { rows: data } = (await dbQuery.query(getDriveFileQuery, values)) as DbResponse;
    if (data[0] === undefined) {
      console.log('There are no drive files');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }

    return {
      data: data.map((f: DriveDB) =>
        camelCaseObjectWithDates(f, ['createdOn', 'createdTime', 'lastViewed'], 'MM/dd/yyyy')
      ) as Array<ODriveFile>
    };
  } catch (error) {
    return new Error(error);
  }
};

export const deleteDrive = async (id: string) => {
  const deleteDriveFileQuery = `DELETE FROM drive WHERE id = $1 RETURNING *`;
  const values = [id];
  try {
    const { rows: data } = (await dbQuery.query(deleteDriveFileQuery, values)) as DbResponse;
    if (data[0] === undefined) {
      console.log('Drive file not found');
      return { data: [] };
    }

    const deletedDrive = data[0] as DriveDB & { model_id?: Array<number> | null; drive_id: string };
    const modelIds = deletedDrive.model_id;
    const driveId = deletedDrive.drive_id;

    // If model_id is not empty, update each model's drive_ids array
    if (modelIds && Array.isArray(modelIds) && modelIds.length > 0) {
      for (const modelId of modelIds) {
        const updateModelQuery = `UPDATE model
          SET drive_ids = array_remove(drive_ids, $1)
          WHERE id = $2`;
        try {
          console.log(`updating model ${modelId} by removing ${driveId} from drive_ids`);
          await dbQuery.query(updateModelQuery, [driveId, modelId]);
        } catch (error) {
          console.log(`Error updating model ${modelId} after drive deletion:`, error);
          // Continue with other model updates even if one fails
        }
      }
    }

    return {
      data: data.map((f: DriveDB) =>
        camelCaseObjectWithDates(f, ['createdOn', 'createdTime', 'lastViewed'], 'MM/dd/yyyy')
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
  WHERE id = $2
  RETURNING *`;
    try {
      const { rows } = (await dbQuery.query(query, mutableData)) as DbResponse;
      console.log('query', query, 'dta', mutableData, rows);
      return {
        data: rows.map((f: DriveDB) =>
          camelCaseObjectWithDates(f, ['createdOn', 'createdTime', 'lastViewed'], 'MM/dd/yyyy')
        )
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
      data: rows.map((f: DriveDB) =>
        camelCaseObjectWithDates(f, ['createdOn', 'createdTime', 'lastViewed'], 'MM/dd/yyyy')
      )
    };
  } catch (error) {
    console.log('An error occurred', error);
    return { data: [] };
  }
};
