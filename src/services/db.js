/* eslint-disable no-param-reassign */
import camelCase from 'lodash/camelCase';
import format from 'date-fns/format';
import uniq from 'lodash/uniq';
import dbQuery from '../../db/dev/dbQuery';
import {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken
} from '../utils/validations';
import { errorMessage, successMessage, status } from '../utils/status';

const getExp = async () => {
  const getModelQuery = `SELECT * FROM
  exp ORDER BY id DESC`;
  try {
    const { rows } = await dbQuery.query(getModelQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return { data: dbResponse };
  } catch (error) {
    console.log('An error occurred', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};
const addExp = async (req, res) => {
  const { name, description } = req.body;
  const createExpQuery = `INSERT INTO exp(name, description) VALUES($1, $2) returning *`;
  const values = [name, description];
  try {
    const { rows } = await dbQuery.query(createExpQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.success).json(successMessage);
  } catch (error) {
    console.log('db error: ', error);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};
const addInterview = async (data = []) => {
  const createExpQuery = `INSERT INTO interview(company, retro, date) VALUES($1, $2, $3) returning *`;
  if (data.length > 0) {
    const { rows } = await dbQuery.query(createExpQuery, data);
    return { rows };
  }
  return { rows: [] };
};
const addInterviewApi = async (req, res) => {
  const { company, date, retro } = req.body;

  const values = [company, retro, date];

  try {
    const { rows } = await addInterview(values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.success).json(successMessage);
  } catch (error) {
    console.log('db error: ', error);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};
const getInterview = async () => {
  const getModelQuery = `SELECT * FROM
  interview ORDER BY id DESC`;
  try {
    const { rows } = await dbQuery.query(getModelQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no interviews');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return { data: dbResponse };
  } catch (error) {
    console.log('An error occurred fetching interviews', error);
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [], error };
  }
};

const createAdmin = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  if (isEmpty(email) || isEmpty(firstName) || isEmpty(lastName) || isEmpty(password)) {
    errorMessage.error = 'Email, password, first name and last name field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email';
    return res.status(status.bad).send(errorMessage);
  }
  const values = [email, firstName, lastName, hashedPassword, isAdmin, createdOn];

  try {
    const { rows } = await dbQuery.query(createUserQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    const token = generateUserToken(
      dbResponse.email,
      dbResponse.id,
      dbResponse.is_admin,
      dbResponse.first_name,
      dbResponse.last_name
    );
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'Admin with that EMAIL already exist';
      return res.status(status.conflict).send(errorMessage);
    }
  }
};
/**
 * Update A User to Admin
 * @param {object} req
 * @param {object} res
 * @returns {object} updated user
 */
const updateUserToAdmin = async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  const { is_admin } = req.user;
  if (!is_admin === true) {
    errorMessage.error = 'Sorry You are unauthorized to make a user an admin';
    return res.status(status.bad).send(errorMessage);
  }
  if (isAdmin === '') {
    errorMessage.error = 'Admin Status is needed';
    return res.status(status.bad).send(errorMessage);
  }
  const findUserQuery = 'SELECT * FROM users WHERE id=$1';
  const updateUser = `UPDATE users
        SET is_admin=$1 WHERE id=$2 returning *`;
  try {
    const { rows } = await dbQuery.query(findUserQuery, [id]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User Cannot be found';
      return res.status(status.notfound).send(errorMessage);
    }
    const values = [isAdmin, id];
    const response = await dbQuery.query(updateUser, values);
    const dbResult = response.rows[0];
    delete dbResult.password;
    successMessage.data = dbResult;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};
const createDriveFile = async values => {
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
  drive(id, drive_id, type, name, web_view_link, web_content_link, thumbnail_link, created_time, viewed_time, created_on)
  VALUES($1, $1, $2, $3, $4, $5, $6, $7, $8, $9)
  returning *`;
  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  values.push(createdOn);
  const { rows } = await dbQuery.query(createDriveFileQuery, values);
  return rows;
};
const createDriveFileApi = async (req, res) => {
  const { id, name, webViewLink, webContentLink, mimeType, thumb } = req;
  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  let type = 'folder';
  if (mimeType.indexOf('image') > -1) {
    type = 'image';
  }
  if (mimeType.indexOf('video') > -1) {
    type = 'video';
  }
  const values = [id, type, name, webViewLink, webContentLink, createdOn];
  try {
    const rows = await createDriveFile(values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log('error?: ', error);
    // if (error.routine === '_bt_check_unique') {
    //   errorMessage.error = 'User with that EMAIL already exist';
    //   return res.status(status.conflict).send(errorMessage);
    // }
    // errorMessage.error = 'Operation was not successful';
    // return res.status(status.error).send(errorMessage);
    return 'Error';
  }
};

const createModel = async (req, res) => {
  const { driveIds, modelName, platform } = req.body;
  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
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
    const { rows } = await dbQuery.query(createModelQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.success).json(successMessage);
  } catch (error) {
    console.log('db error: ', error);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};
const createUser = async (req, res) => {
  const { email, firstName, lastName, password } = req.body;

  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  if (isEmpty(email) || isEmpty(firstName) || isEmpty(lastName) || isEmpty(password)) {
    errorMessage.error = 'Email, password, first name and last name field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email';
    return res.status(status.bad).send(errorMessage);
  }
  const hashedPassword = hashPassword(password);
  const createUserQuery = `INSERT INTO
          user(email, first_name, last_name, password, created_on)
          VALUES($1, $2, $3, $4, $5)
          returning *`;
  const values = [email, firstName, lastName, hashedPassword, createdOn];
  try {
    const { rows } = await dbQuery.query(createUserQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.first_name, dbResponse.last_name);
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(200).json(successMessage);
  } catch (error) {
    console.log('db error: ', error);
    if (error.routine === '_bt_check_unique') {
      errorMessage.error = 'User with that EMAIL already exist';
      return res.status(status.conflict).send(errorMessage);
    }
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};
const getDriveFile = async () => {
  const getDriveFileQuery = `SELECT * FROM
  drive ORDER BY created_time ASC`;
  try {
    const { rows } = await dbQuery.query(getDriveFileQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    const data = dbResponse.map(row =>
      Object.keys(row).reduce((o, key) => {
        o[camelCase(key)] = row[key];
        return o;
      }, {})
    );
    return {
      data
    };
  } catch (error) {
    console.log('An error occurred');
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};
const getModel = async () => {
  const getModelQuery = `SELECT * FROM
  model ORDER BY id DESC`;
  try {
    const { rows } = await dbQuery.query(getModelQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('There are no models');
      return { data: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    return {
      data: dbResponse
    };
  } catch (error) {
    console.log('An error occurred');
    // errorMessage.error = 'An error Occured';
    // return res.status(status.error).send(errorMessage);
    return { data: [] };
  }
};
const getModelApi = async (req, res) => {
  const getModelQuery = `SELECT * FROM
  model ORDER BY id DESC`;
  try {
    const { rows } = await dbQuery.query(getModelQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = 'There are no models';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};
/**
 * Signin User
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
const signInUser = async (req, res) => {
  const { email, password } = req.body;
  if (isEmpty(email) || isEmpty(password)) {
    errorMessage.error = 'Email or Password detail is missing';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email) || !validatePassword(password)) {
    errorMessage.error = 'Please enter a valid Email or Password';
    return res.status(status.bad).send(errorMessage);
  }
  const signinUserQuery = 'SELECT * FROM users WHERE email = $1';
  try {
    const { rows } = await dbQuery.query(signinUserQuery, [email]);
    const dbResponse = rows[0];
    if (!dbResponse) {
      errorMessage.error = 'User with this email does not exist';
      return res.status(status.notfound).send(errorMessage);
    }
    // if (!comparePassword(dbResponse.password, password)) {
    //   errorMessage.error = 'The password you provided is incorrect';
    //   return res.status(status.bad).send(errorMessage);
    // }
    const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.first_name, dbResponse.last_name);
    delete dbResponse.password;
    successMessage.data = dbResponse;
    successMessage.data.token = token;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

const updateInterview = async data => {
  const createExpQuery = `UPDATE interview
    SET company = $1, date = $2, retro = $3
    WHERE id = $4
    returning *`;
  if (data.length > 0) {
    const { rows } = await dbQuery.query(createExpQuery, data);
    return { rows };
  }
  return { rows: [] };
};

const updateInterviewApi = async (req, res) => {
  try {
    const { rows } = await updateInterview([req.body.company, req.body.date, req.body.retro, req.body.interviewId]);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      console.log('No updates made');
      return { rows: [] };
      // errorMessage.error = 'There are no models';
      // return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).json(successMessage);
  } catch (error) {
    console.log('db error: ', error);
    errorMessage.error = 'Operation was not successful';
    return res.status(status.error).send(errorMessage);
  }
};

const useInterviewApi = async (req, res) => {
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
        if (data.length === 0) {
          errorMessage.error = 'There are no interviews';
          return res.status(status.notfound).send(errorMessage);
        }
        return res.status(status.success).send({ data });
      }
    }
  } catch (error) {
    console.log('An error occurred', error);
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};
module.exports = {
  addExp,
  addInterviewApi,
  createAdmin,
  createDriveFile,
  createDriveFileApi,
  createModel,
  createUser,
  getDriveFile,
  getExp,
  getInterview,
  getModel,
  getModelApi,
  signInUser,
  updateUserToAdmin,
  useInterviewApi
};
