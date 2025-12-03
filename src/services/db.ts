import { Request, Response } from 'express';
import dbQuery from '../../db/dev/dbQuery';
import { DbResponse, ErrorResponse, ExpDB, SuccessResponse } from '../types';
import { status } from '../utils/status';

const getExp = async () => {
  const getModelQuery = `SELECT * FROM
  exp ORDER BY id DESC`;
  try {
    const dbResponse = (await dbQuery.query(getModelQuery, [])) as DbResponse;
    const data = dbResponse.rows;
    if (data[0] === undefined) {
      console.log('There are no job experiences');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return { data };
  } catch (error) {
    console.error('An error occurred fetching job experiences', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};
const addExp = async (
  req: Request,
  res: Response
): Promise<Response<SuccessResponse<ExpDB>> | Response<ErrorResponse>> => {
  const { name, description } = req.body;
  const createExpQuery = `INSERT INTO exp(name, description) VALUES($1, $2) returning *`;
  const values = [name, description];
  try {
    const { rows } = (await dbQuery.query(createExpQuery, values)) as DbResponse<ExpDB>;
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
const addInterviewApi = async (req: Request, res: Response) => {
  const { company, date, retro } = req.body;

  const values = [company, retro, date];

  try {
    const { rows } = await addInterview(values);
    const data = rows[0];
    return res.status(status.success).json({ data, status: 'success' });
  } catch (error) {
    console.error('An error occurred adding an interview', error);
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
    return res.status(status.success).json({ data: data[0] });
  } catch (error) {
    console.log('db error: ', error);
    return res.status(status.error).send({ data: {} });
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
        return res.status(status.success).send({ data });
      }
    }
  } catch (error) {
    console.log('An error occurred with interviews', error);
    return res.status(status.error).send({ data: [] });
  }
};

export { addExp, addInterviewApi, getExp, getInterview, useExperienceApi, useInterviewApi };
