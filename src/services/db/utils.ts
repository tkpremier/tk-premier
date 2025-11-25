import snakeCase from 'lodash/snakeCase';
import dbQuery from '../../../db/dev/dbQuery';
import { DbResponse, DriveRowIdentifier } from '../../types';

export const getExistingDriveIdentifiers = async (): Promise<Map<string, string>> => {
  const query = `SELECT id, drive_id FROM drive`;
  try {
    const { rows } = (await dbQuery.query(query, [])) as DbResponse<DriveRowIdentifier>;
    return rows.reduce<Map<string, string>>((acc, row) => {
      if (row.drive_id) {
        acc.set(row.drive_id, row.id);
      }
      return acc;
    }, new Map());
  } catch (error) {
    console.log('An error occurred', error);
    return new Map();
  }
};

export const normalizeColumnName = (key: string): string => {
  if (key.includes('_')) {
    return key;
  }
  return snakeCase(key);
};
