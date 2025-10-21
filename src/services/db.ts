/* eslint-disable no-param-reassign */
import { Response, Request } from 'express';
import format from 'date-fns/format';
import { camelCase, isNull, uniq } from 'lodash';
import dbQuery from '../../db/dev/dbQuery';
import { isEmpty } from '../utils/validations';
import { status } from '../utils/status';
import { ContactDB, DriveFile, ODriveFile } from '../types';

interface DbResponse {
  rows: Array<any>;
}

interface ErrorResponse {
  error: string;
}

type SuccessResponse = {
  data: Array<any> | any;
};

const getExp = async () => {
  const getModelQuery = `SELECT * FROM
  exp ORDER BY id DESC`;
  try {
    const dbResponse = (await dbQuery.query(getModelQuery, [])) as DbResponse;
    const data = dbResponse.rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return { data };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};
const addExp = async (req: Request, res: Response): Promise<any> => {
  const { name, description } = req.body;
  const createExpQuery = `INSERT INTO exp(name, description) VALUES($1, $2) returning *`;
  const values = [name, description];
  try {
    const { rows } = (await dbQuery.query(createExpQuery, values)) as DbResponse;
    const data = rows[0];
    return res.status(status.success).json({ data, status: 'success' });
  } catch (error) {
    console.log('add exp?');
    console.log('Error: ', error);
    return res.status(status.error).send(error);
  }
};
const addInterview = async (data = []) => {
  const createExpQuery = `INSERT INTO interview(company, retro, date) VALUES($1, $2, $3) returning *`;
  if (data.length > 0) {
    const { rows } = (await dbQuery.query(createExpQuery, data)) as DbResponse;
    return { rows };
  }
  return { rows: [] };
};
const addInterviewApi = async (req: Request, res: Response): Promise<any> => {
  const { company, date, retro } = req.body;

  const values = [company, retro, date];

  try {
    const { rows } = await addInterview(values);
    const data = rows[0];
    return res.status(status.success).json({ data, status: 'success' });
  } catch (error) {
    let errorMessage: ErrorResponse;
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};
const getInterview = async () => {
  const getModelQuery = `SELECT * FROM
  interview ORDER BY date DESC`;
  try {
    const { rows } = (await dbQuery.query(getModelQuery, [])) as DbResponse;
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no interviews');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    console.log(Object.keys(dbResponse[0]).map(k => `typeof ${k} === ${typeof dbResponse[0][k]}`));
    return { data: dbResponse };
  } catch (error) {
    console.log('An error occurred fetching interviews', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [], error };
  }
};

// const createAdmin = async (req, res) => {
//   const { email, firstName, lastName, password } = req.body;

//   const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
//   let errorMessage: ErrorResponse;
//   if (isEmpty(email) || isEmpty(firstName) || isEmpty(lastName) || isEmpty(password)) {
//     errorMessage.error = 'Email, password, first name and last name field cannot be empty';
//     return res.status(status.bad).send(errorMessage);
//   }
//   if (!isValidEmail(email)) {
//     errorMessage.error = 'Please enter a valid Email';
//     return res.status(status.bad).send(errorMessage);
//   }
//   const values = [email, firstName, lastName, hashedPassword, isAdmin, createdOn];

//   try {
//     const { rows } = await dbQuery.query(createUserQuery, values);
//     const dbResponse = rows[0];
//     delete dbResponse.password;
//     const token = generateUserToken(
//       dbResponse.email,
//       dbResponse.id,
//       dbResponse.is_admin,
//       dbResponse.first_name,
//       dbResponse.last_name
//     );
//     successMessage.data = dbResponse;
//     successMessage.data.token = token;
//     return res.status(status.created).send(successMessage);
//   } catch (error) {
//     if (error.routine === '_bt_check_unique') {
//       errorMessage.error = 'Admin with that EMAIL already exist';
//       return res.status(status.conflict).send(errorMessage);
//     }
//   }
// };
// const updateUserToAdmin = async (req, res) => {
//   const { id } = req.params;
//   const { isAdmin } = req.body;

//   const { is_admin } = req.user;
//   if (!is_admin === true) {
//     errorMessage.error = 'Sorry You are unauthorized to make a user an admin';
//     return res.status(status.bad).send(errorMessage);
//   }
//   if (isAdmin === '') {
//     errorMessage.error = 'Admin Status is needed';
//     return res.status(status.bad).send(errorMessage);
//   }
//   const findUserQuery = 'SELECT * FROM users WHERE id=$1';
//   const updateUser = `UPDATE users
//         SET is_admin=$1 WHERE id=$2 returning *`;
//   try {
//     const { rows } = await dbQuery.query(findUserQuery, [id]);
//     const dbResponse = rows[0];
//     if (!dbResponse) {
//       errorMessage.error = 'User Cannot be found';
//       return res.status(status.notfound).send(errorMessage);
//     }
//     const values = [isAdmin, id];
//     const response = await dbQuery.query(updateUser, values);
//     const dbResult = response.rows[0];
//     delete dbResult.password;
//     successMessage.data = dbResult;
//     return res.status(status.success).send(successMessage);
//   } catch (error) {
//     errorMessage.error = 'Operation was not successful';
//     return res.status(status.error).send(errorMessage);
//   }
// };
// const createDriveFile = async values => {
//   /*
//     (id VARCHAR(100) NOT NULL,
//     drive_id VARCHAR(100) NOT NULL,
//     type VARCHAR(100) NOT NULL,
//     name VARCHAR(100) NOT NULL,
//     web_view_link VARCHAR(100) NOT NULL,
//     web_content_link VARCHAR(100) NOT NULL,
//     thumbnail_link VARCHAR(100),
//     created_time DATE NOT NULL,
//     viewed_time DATE NOT NULL,
//     created_on DATE NOT NULL)
//   */
//   const createDriveFileQuery = `INSERT INTO
//   drive(id, drive_id, type, name, web_view_link, web_content_link, thumbnail_link, created_time, viewed_time, created_on)
//   VALUES($1, $1, $2, $3, $4, $5, $6, $7, $8, $9)
//   returning *`;
//   const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
//   values.push(createdOn);
//   const { rows } = (await dbQuery.query(createDriveFileQuery, values)) as DbResponse;
//   return rows;
// };

// interface IDriveRequest extends Request {
//   id: string;
//   name: string;
//   webViewLink: string;
//   webContentLink: string;
//   mimeType: string;
// }
// const createDriveFileApi = async (req: Request, res: Response) => {
//   const { id, name, webViewLink, webContentLink, mimeType, thumb } = req;
//   let type = 'folder';
//   if (mimeType.indexOf('image') > -1) {
//     type = 'image';
//   }
//   if (mimeType.indexOf('video') > -1) {
//     type = 'video';
//   }
//   const values = [id, type, name, webViewLink, webContentLink, thumb];
//   try {
//     const rows = await createDriveFile(values);
//     const data = rows[0];
//     return res.status(status.created).send({ data });
//   } catch (error) {
//     console.log('error?: ', error);
//     // if (error.routine === '_bt_check_unique') {
//     //   errorMessage.error = 'User with that EMAIL already exist';
//     //   return res.status(status.conflict).send(errorMessage);
//     // }
//     // errorMessage.error = 'Operation was not successful';
//     return res.status(status.error).send(errorMessage);
//     return 'Error';
//   }
// };

const createModel = async (req, res) => {
  const { driveIds, modelName, platform } = req.body;
  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  let errorMessage: ErrorResponse;
  if (isEmpty(modelName) || isEmpty(platform)) {
    errorMessage.error = 'Name or platform cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  const hasIds = Array.isArray(driveIds) && driveIds.length > 0;
  const createModelQuery = hasIds
    ? `INSERT INTO model(name, platform, created_on, drive_ids) VALUES($1, $2, $3, $4) returning *`
    : `INSERT INTO model(name, platform, created_on) VALUES($1, $2, $3) returning *`;
  const values = [modelName, platform, createdOn];
  if (hasIds) {
    values.push(uniq(driveIds));
  }
  try {
    const { rows } = (await dbQuery.query(createModelQuery, values)) as DbResponse;
    const dbResponse = rows[0];
    let successMessage: SuccessResponse;
    successMessage.data = dbResponse;
    return res.status(status.success).json(successMessage);
  } catch (error) {
    console.log('db error: ', error);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};
// const createUser = async (req, res) => {
//   const { email, firstName, lastName, password } = req.body;
//   const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
//   let errorMessage: ErrorResponse;
//   if (isEmpty(email) || isEmpty(firstName) || isEmpty(lastName) || isEmpty(password)) {
//     errorMessage.error = 'Email, password, first name and last name field cannot be empty';
//     return res.status(status.bad).send(errorMessage);
//   }
//   if (!isValidEmail(email)) {
//     errorMessage.error = 'Please enter a valid Email';
//     return res.status(status.bad).send(errorMessage);
//   }
//   const hashedPassword = hashPassword(password);
//   const createUserQuery = `INSERT INTO
//           user(email, first_name, last_name, password, created_on)
//           VALUES($1, $2, $3, $4, $5)
//           returning *`;
//   const values = [email, firstName, lastName, hashedPassword, createdOn];
//   try {
//     const { rows } = (await dbQuery.query(createUserQuery, values)) as DbResponse;
//     const dbResponse = rows[0];
//     delete dbResponse.password;
//     const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.first_name, dbResponse.last_name);
//     let successMessage: SuccessResponse;
//     successMessage.data = dbResponse;
//     successMessage.data.token = token;
//     return res.status(200).json(successMessage);
//   } catch (error) {
//     console.log('db error: ', error);
//     if (error.routine === '_bt_check_unique') {
//       errorMessage.error = 'User with that EMAIL already exist';
//       return res.status(status.conflict).send(errorMessage);
//     }
//     errorMessage.error = 'Operation was not successful';
//     return res.status(status.error).send(errorMessage);
//   }
// };
// const getDriveFile = async () => {
//   const getDriveFileQuery = `SELECT * FROM
//   drive ORDER BY created_time ASC`;
//   try {
//     const { rows } = (await dbQuery.query(getDriveFileQuery)) as DbResponse;
//     const dbResponse = rows;
//     if (dbResponse[0] === undefined) {
//       console.log('There are no models');
//       return { data: [] };
//       // errorMessage.error = 'There are no models';
//       // return res.status(status.notfound).send(errorMessage);
//     }
//     const data = dbResponse.map(row =>
//       Object.keys(row).reduce((o, key) => {
//         o[camelCase(key)] = row[key];
//         return o;
//       }, {})
//     );
//     return {
//       data
//     };
//   } catch (error) {
//     console.log('An error occurred');
//     // errorMessage.error = 'An error Occured';
//     // return res.status(status.error).send(errorMessage);
//     return { data: [] };
//   }
// };
// const getModel = async () => {
//   const getModelQuery = `SELECT * FROM
//   model ORDER BY id DESC`;
//   try {
//     const { rows } = await dbQuery.query(getModelQuery);
//     const dbResponse = rows;
//     if (dbResponse[0] === undefined) {
//       console.log('There are no models');
//       return { data: [] };
//       // errorMessage.error = 'There are no models';
//       // return res.status(status.notfound).send(errorMessage);
//     }
//     return {
//       data: dbResponse
//     };
//   } catch (error) {
//     console.log('An error occurred');
//     // errorMessage.error = 'An error Occured';
//     // return res.status(status.error).send(errorMessage);
//     return { data: [] };
//   }
// };
// const getModelApi = async (req, res) => {
//   const getModelQuery = `SELECT * FROM
//   model ORDER BY id DESC`;
//   try {
//     const { rows } = await dbQuery.query(getModelQuery);
//     const dbResponse = rows;
//     if (dbResponse[0] === undefined) {
//       errorMessage.error = 'There are no models';
//       return res.status(status.notfound).send(errorMessage);
//     }
//     successMessage.data = dbResponse;
//     return res.status(status.success).send(successMessage);
//   } catch (error) {
//     errorMessage.error = 'An error Occured';
//     return res.status(status.error).send(errorMessage);
//   }
// };
/**
 * Signin User
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
// const signInUser = async (req, res) => {
//   const { email, password } = req.body;
//   if (isEmpty(email) || isEmpty(password)) {
//     errorMessage.error = 'Email or Password detail is missing';
//     return res.status(status.bad).send(errorMessage);
//   }
//   if (!isValidEmail(email) || !validatePassword(password)) {
//     errorMessage.error = 'Please enter a valid Email or Password';
//     return res.status(status.bad).send(errorMessage);
//   }
//   const signinUserQuery = 'SELECT * FROM users WHERE email = $1';
//   try {
//     const { rows } = await dbQuery.query(signinUserQuery, [email]);
//     const dbResponse = rows[0];
//     if (!dbResponse) {
//       errorMessage.error = 'User with this email does not exist';
//       return res.status(status.notfound).send(errorMessage);
//     }
//     // if (!comparePassword(dbResponse.password, password)) {
//     //   errorMessage.error = 'The password you provided is incorrect';
//     //   return res.status(status.bad).send(errorMessage);
//     // }
//     const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.first_name, dbResponse.last_name);
//     delete dbResponse.password;
//     successMessage.data = dbResponse;
//     successMessage.data.token = token;
//     return res.status(status.success).send(successMessage);
//   } catch (error) {
//     errorMessage.error = 'Operation was not successful';
//     return res.status(status.error).send(errorMessage);
//   }
// };
const createDriveFile = async (values: string[]): Promise<DbResponse['rows']> => {
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
  drive(id, drive_id, type, name, web_view_link, web_content_link, thumbnail_link, created_time, last_viewed, duration, model_id, created_on)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  returning *`;
  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  values.push(createdOn);
  const { rows } = (await dbQuery.query(createDriveFileQuery, values)) as DbResponse;
  return rows;
};
const createDriveApi = async (req: Request, res: Response) => {
  console.log('newDrive data: ', req.body);
  const values = Object.keys(req.body).map(k => req.body[k]);
  console.log('new drive files values: ', values);
  try {
    const rows = await createDriveFile(values);
    const data = rows[0];
    return res.status(status.created).send({ data });
  } catch (error) {
    console.log('error?: ', error);
    return res.status(status.error).send({ data: [] });
  }
};
const updateDrive = async data => {
  const query = `UPDATE drive
  SET ${data.shift()} = array_cat(model_id, $1)
  WHERE id = $2`;
  try {
    const { rows } = (await dbQuery.query(query, data)) as DbResponse;
    console.log('query', query, 'dta', data, rows);
    const dbResponse = rows;
    // if (dbResponse[0] === undefined) {
    //   console.log("No updates");
    //   return { data: [] };
    //   // errorMessage.error = 'There are no models';
    //   // return res.status(status.notfound).send(errorMessage);
    // }
    return {
      data: dbResponse
    };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

export const updateDriveApi = async (req: Request, res: Response) => {
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
const updateInterview = async data => {
  const createExpQuery = `UPDATE interview
    SET company = $1, date = $2, retro = $3
    WHERE id = $4
    returning *`;
  if (data.length > 0) {
    const { rows } = (await dbQuery.query(createExpQuery, data)) as DbResponse;
    return { rows };
  }
  return { rows: [] };
};

const updateExp = async (req: Request, res: Response) => {
  try {
    const query = `UPDATE exp
    SET name = $1, description = $2
    WHERE id = $3
    returning *`;
    const { rows } = await dbQuery.query(query, [req.body.name, req.body.description, req.body.id]);
    // const { rows } = await updateInterview([req.body.company, req.body.date, req.body.retro, req.body.interviewId]);
    const data = rows;
    if (data[0] === undefined) {
      console.log('No updates made');
      return { rows: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return res.status(status.success).json({ data });
  } catch (error) {
    console.log('db error: ', error);
    return res.status(status.error).send({ data: [] });
  }
};

const updateInterviewApi = async (req: Request, res: Response) => {
  try {
    const { rows } = await updateInterview([req.body.company, req.body.date, req.body.retro, req.body.interviewId]);
    const data = rows;
    if (data[0] === undefined) {
      console.log('No updates made');
      return { rows: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return res.status(status.success).json({ data });
  } catch (error) {
    console.log('db error: ', error);
    return res.status(status.error).send({ data: [] });
  }
};

const useExperienceApi = async (req: Request, res: Response) => {
  try {
    switch (req.method) {
      case 'POST': {
        const response = await addExp(req, res);
        return response;
      }
      case 'PUT': {
        const response = await updateExp(req, res);
        return response;
      }
      default: {
        const { data } = await getExp();
        if (data.length === 0) {
          return res.status(status.success).send({ data });
        }
        return res.status(status.success).send({ data });
      }
    }
  } catch (error) {
    console.log('An error occurred', error);
    return res.status(status.error).send({ data: [] });
  }
};

const useInterviewApi = async (req: Request, res: Response) => {
  try {
    switch (req.method) {
      case 'POST': {
        const response = await addInterviewApi(req, res);
        return response;
      }
      case 'PUT': {
        const response = await updateInterviewApi(req, res);
        return response;
      }
      default: {
        const { data } = await getInterview();
        console.log('data: ', data);
        return res.status(status.success).send({ data });
      }
    }
  } catch (error) {
    console.log('An error occurred', error);
    return res.status(status.error).send({ data: [] });
  }
};

const getAllContacts = async () => {
  const getModelQuery = `SELECT * FROM
  model ORDER BY id DESC`;
  try {
    const { rows } = (await dbQuery.query(getModelQuery, [])) as DbResponse;
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
    console.log('An error occurred');
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

const getModel = async (id: number) => {
  const getModelQuery = `SELECT
	model.name as model_name, drive.name, drive.model_id, model.id, model.drive_ids, drive.drive_id, drive.type FROM model INNER JOIN drive
	ON drive.drive_id = ANY(model.drive_ids) WHERE model.id = $1
	ORDER BY model.id ASC`;
  const value = [id];
  try {
    const { rows } = (await dbQuery.query(getModelQuery, value)) as DbResponse;
    console.log('db response row: ', rows, rows.length);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [], driveIds: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return {
      driveIds: dbResponse[0].drive_ids || [],
      data: dbResponse.map((f: ContactDB) =>
        Object.keys(f).reduce((o: { [key: string]: Date | Array<string> | number | string }, k: keyof ContactDB) => {
          o[camelCase(k)] =
            f[k] instanceof Date ? format(new Date(f[k] as ContactDB['createdOn']), "MM/dd/yyyy' 'HH:mm:ss") : f[k];
          return o;
        }, {})
      )
    };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [], driveIds: [] };
  }
};

const getModelApi = async (req: Request, res: Response) => {
  try {
    const { data } = req.params.id ? await getModel(parseInt(req.params.id) || 0) : await getAllContacts();
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
const updateModel = async (data: Array<string | number | Array<string>>) => {
  const query = `UPDATE model
  SET ${data.shift()} = array_cat(drive_ids, $1)
  WHERE id = $2`;
  console.log('data: [model_id, id] ', data);
  try {
    const { rows } = (await dbQuery.query(query, data)) as DbResponse;
    const dbResponse = rows;
    // if (dbResponse[0] === undefined) {
    //   console.log("No updates");
    //   return { data: [] };
    //   // errorMessage.error = 'There are no models';
    //   // return res.status(status.notfound).send(errorMessage);
    // }
    console.log('updateModel success: ', rows);
    return {
      data: dbResponse
    };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};

export const updateModelApi = async (req: Request, res: Response) => {
  try {
    const { data } = await updateModel(req.body);
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
const useModelApi = async (req: Request, res: Response) => {
  try {
    switch (req.method) {
      case 'POST': {
        const response = await createModel(req, res);
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

const getDrive = async (id?: string) => {
  ``;
  const getDriveFileQuery = `SELECT * FROM
  drive ORDER BY created_time DESC`;
  try {
    const { rows } = (await dbQuery.query(getDriveFileQuery, [])) as DbResponse;
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no drive files');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }

    return {
      data: dbResponse.map((f: DriveFile) =>
        Object.keys(f).reduce(
          (o: { [key: string]: string | number | null | Array<number> }, k: keyof DriveFile): ODriveFile => {
            const dateKeys = ['createdOn', 'createdTime', 'lastViewed'];
            const key = camelCase(k);
            o[key] =
              dateKeys.indexOf(key) > -1
                ? key === 'createdOn' || key === 'createdTime'
                  ? format(new Date(f[k] as DriveFile['createdOn'] | DriveFile['createdTime']), "MM/dd/yyyy' 'HH:mm:ss")
                  : !isNull(f[k])
                  ? format(new Date(f[k] as DriveFile['lastViewed']), "MM/dd/yyyy' 'HH:mm:ss")
                  : f[k]
                : f[k];
            return o;
          },
          {}
        )
      ) as Array<DriveFile>
    };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};
const getDriveApi = async (req: Request, res: Response) => {
  try {
    const { data } = await getDrive();
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
const useDriveApi = async (req: Request, res: Response) => {
  switch (req.method) {
    case 'POST': {
      return await createDriveApi(req, res);
    }
    case 'PUT': {
      return await updateDriveApi(req, res);
    }
    default: {
      return await getDriveApi(req, res);
    }
  }
};
export {
  addExp,
  addInterviewApi,
  createModel,
  getExp,
  getInterview,
  useExperienceApi,
  useInterviewApi,
  useDriveApi,
  useModelApi
};
