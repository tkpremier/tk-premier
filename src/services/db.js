import format from 'date-fns/format';
import dbQuery from '../../db/dev/dbQuery';
import {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  isEmpty,
  generateUserToken,
} from '../utils/validations';

import {
  errorMessage, successMessage, status
} from '../utils/status';

const createAdmin = async (req, res) => {
  // const {
  //   email, first_name, last_name, password,
  // } = req.body;

  // const { is_admin } = req.user;

  // const isAdmin = true;
  // const created_on = moment(new Date());

  // if (!is_admin === false) {
  //   errorMessage.error = 'Sorry You are unauthorized to create an admin';
  //   return res.status(status.bad).send(errorMessage);
  // }

  // if (isEmpty(email) || isEmpty(first_name) || isEmpty(last_name) || isEmpty(password)) {
  //   errorMessage.error = 'Email, password, first name and last name field cannot be empty';
  //   return res.status(status.bad).send(errorMessage);
  // }
  // if (!isValidEmail(email)) {
  //   errorMessage.error = 'Please enter a valid Email';
  //   return res.status(status.bad).send(errorMessage);
  // }
  // if (!validatePassword(password)) {
  //   errorMessage.error = 'Password must be more than five(5) characters';
  //   return res.status(status.bad).send(errorMessage);
  // }
  // const hashedPassword = hashPassword(password);
  // const createUserQuery = `INSERT INTO
  //     users(email, first_name, last_name, password, is_admin, created_on)
  //     VALUES($1, $2, $3, $4, $5, $6)
  //     returning *`;
  const {
    email, firstName, lastName, password
  } = req.body;

  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  if (isEmpty(email) || isEmpty(firstName) || isEmpty(lastName) || isEmpty(password)) {
    errorMessage.error = 'Email, password, first name and last name field cannot be empty';
    return res.status(status.bad).send(errorMessage);
  }
  if (!isValidEmail(email)) {
    errorMessage.error = 'Please enter a valid Email';
    return res.status(status.bad).send(errorMessage);
  }
  const values = [
    email,
    firstName,
    lastName,
    hashedPassword,
    isAdmin,
    createdOn,
  ];

  try {
    const { rows } = await dbQuery.query(createUserQuery, values);
    const dbResponse = rows[0];
    delete dbResponse.password;
    const token = generateUserToken(dbResponse.email, dbResponse.id, dbResponse.is_admin, dbResponse.first_name, dbResponse.last_name);
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
    const values = [
      isAdmin,
      id,
    ];
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
/**
   * Create A User
   * @param {object} req request object
   * @param {object} res
   * @returns {object} reflection object
   */
const createUser = async (req, res) => {
  const {
    email, firstName, lastName, password
  } = req.body;

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
        users(email, first_name, last_name, password, created_on)
        VALUES($1, $2, $3, $4, $5)
        returning *`;
  const values = [
    email,
    firstName,
    lastName,
    hashedPassword,
    createdOn
  ];
  console.log('values: ', values);

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

const createDriveFile = async (req, res) => {
  const {
    id, name, webViewLink, webContentLink, mimeType
  } = req;
  const createdOn = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  let type = 'folder';
  if (mimeType.indexOf('image') > -1) {
    type = 'image';
  }
  if (mimeType.indexOf('video') > -1) {
    type = 'video';
  }
  const createDriveFileQuery = `INSERT INTO
        drive(id, drive_id, type, name, web_view_link, web_content_link, created_on)
        VALUES($1, $1, $2, $3, $4, $5, $6)
        returning *`;
  const values = [
    id,
    type,
    name,
    webViewLink,
    webContentLink,
    createdOn
  ]; try {
    const { rows } = await dbQuery.query(createDriveFileQuery, values);
    const dbResponse = rows[0];
    return dbResponse;
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

module.exports = {
  createAdmin,
  createDriveFile,
  createUser,
  signInUser,
  updateUserToAdmin
};
