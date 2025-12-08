import format from 'date-fns/format';
import camelCase from 'lodash/camelCase';
import isNull from 'lodash/isNull';
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

// Convert snake_case keys to camelCase
export const camelCaseObject = <T extends Record<string, unknown>>(obj: T): Record<string, unknown> =>
  Object.keys(obj).reduce((acc, key) => {
    acc[camelCase(key)] = obj[key];
    return acc;
  }, {} as Record<string, unknown>);

// Format date fields in an object
export const formatDateFields = (
  obj: Record<string, unknown>,
  dateKeys: string[] = ['createdOn', 'createdTime', 'lastViewed'],
  dateFormat: string = "MM/dd/yyyy' 'HH:mm:ss"
): Record<string, unknown> =>
  Object.keys(obj).reduce((acc, key) => {
    let value = obj[key];

    if (dateKeys.includes(key) && value != null) {
      if (key === 'createdOn' || key === 'createdTime') {
        value = format(new Date(value as string | number | Date), dateFormat);
      } else if (!isNull(value)) {
        value = format(new Date(value as string | number | Date), dateFormat);
      }
    }

    acc[key] = value;
    return acc;
  }, {} as Record<string, unknown>);

// Combined function that converts snake_case to camelCase and formats dates
export const camelCaseObjectWithDates = <T extends Record<string, unknown>>(
  obj: T,
  dateKeys: string[] = ['createdOn', 'createdTime', 'lastViewed'],
  dateFormat: string = "MM/dd/yyyy' 'HH:mm:ss"
): Record<string, unknown> => {
  const camelCased = camelCaseObject(obj);
  return formatDateFields(camelCased, dateKeys, dateFormat);
};
