import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorMessage, status } from '../utils/status';
dotenv.config();
/**
   * Verify Token
   * @param {object} req expressjs req
   * @param {object} res expressjs res
   * @param {object} next
   * @returns {object|void} response object 
   */
 type ErrorResponse = {
  error: string
}
const verifyToken = async (req, res, next) => {
  const { token } = req.headers;
  let errorMessage: ErrorResponse;
  if (!token) {
  
    errorMessage.error = 'Token not provided';
    return res.status(status.bad).send(errorMessage);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = {
      email: decoded.email,
      user_id: decoded.user_id,
      is_admin: decoded.is_admin,
      first_name: decoded.first_name,
      last_name: decoded.last_name
    };
    next();
  } catch (error) {
    errorMessage.error = 'Authentication Failed';
    return res.status(status.unauthorized).send(errorMessage);
  }
};

export default verifyToken;