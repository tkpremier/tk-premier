'use strict';
exports.__esModule = true;
var pool_1 = require('./pool');
exports['default'] = {
  /**
   * DB Query
   * @param {string} queryText
   * @param {object} params
   * @returns {Promise}
   */
  query: function (queryText, params) {
    return new Promise(function (resolve, reject) {
      pool_1['default']
        .query(queryText, params)
        .then(function (res) {
          resolve(res);
        })
        ['catch'](function (err) {
          reject(err);
        });
    });
  }
};
