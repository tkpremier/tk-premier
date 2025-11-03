import pool from './pool';

function query(queryText, params) {
  return new Promise((resolve, reject) => {
    pool
      .query(queryText, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
export default {
  query
};
