/* eslint-disable @typescript-eslint/no-var-requires */
var pool = require('./pool');

function query(queryText, params) {
  return new Promise((resolve, reject) => {
    pool.query(queryText, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
module.exports = {
  query
};