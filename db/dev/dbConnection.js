"use strict";
exports.__esModule = true;
exports.dropClientTable = exports.dropDriveFilesTable = exports.dropAllTables = exports.createClientTable = exports.createDriveFilesTable = exports.createAllTables = void 0;
var pool_1 = require("./pool");
pool_1["default"].on('connect', function () {
    console.log('connected to the db');
});
/**
 * Create DriveFiles Table
 */
var createDriveFilesTable = function () {
    var driveFilesCreateQuery = "CREATE TABLE IF NOT EXISTS drive\n    (id VARCHAR(300) NOT NULL,\n    drive_id VARCHAR(300) NOT NULL,\n    type VARCHAR(300) NOT NULL,\n    name VARCHAR(300) NOT NULL,\n    web_view_link VARCHAR(300) NOT NULL,\n    web_content_link VARCHAR(300) NOT NULL,\n    thumbnail_link VARCHAR(300),\n    created_time DATE NOT NULL,\n    viewed_time DATE NOT NULL,\n    created_on DATE NOT NULL)";
    return pool_1["default"].query(driveFilesCreateQuery);
};
exports.createDriveFilesTable = createDriveFilesTable;
/**
 * Create Model Table
 */
var createModelTable = function () {
    var modelCreateQuery = "CREATE TABLE IF NOT EXISTS model\n    (id SERIAL PRIMARY KEY,\n    name VARCHAR(50) NOT NULL,\n    platform VARCHAR(100) NOT NULL,\n    drive_ids VARCHAR(500)[],\n    created_on DATE NOT NULL)";
    return pool_1["default"].query(modelCreateQuery);
};
/**
 * Create ClientTable Table
 * CREATE TABLE test
  (id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(100));
 */
var createClientTable = function () {
    var clientCreateQuery = "CREATE TABLE IF NOT EXISTS client\n  (id SERIAL PRIMARY KEY, \n  email VARCHAR(100) UNIQUE NOT NULL, \n  first_name VARCHAR(100), \n  last_name VARCHAR(100), \n  password VARCHAR(100) NOT NULL,\n  created_on DATE NOT NULL)";
    return pool_1["default"].query(clientCreateQuery);
};
exports.createClientTable = createClientTable;
// /**
//  * Create Trip Table
//  */
// const createTripTable = () => {
//   const tripCreateQuery = `CREATE TABLE IF NOT EXISTS trip
//     (id SERIAL PRIMARY KEY,
//     bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE,
//     origin VARCHAR(300) NOT NULL,
//     destination VARCHAR(300) NOT NULL,
//     trip_date DATE NOT NULL,
//     fare float NOT NULL,
//     status float DEFAULT(1.00),
//     created_on DATE NOT NULL)`;
//   pool.query(tripCreateQuery)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };
/**
 * Drop Client Table
 */
var dropClientTable = function () { return pool_1["default"].query('DROP TABLE IF EXISTS client').then(function () { return pool_1["default"].end(); }); };
exports.dropClientTable = dropClientTable;
/**
 * Drop User Table
 */
var dropDriveFilesTable = function () { return pool_1["default"].query('DROP TABLE IF EXISTS drive').then(function () { return pool_1["default"].end(); }); };
exports.dropDriveFilesTable = dropDriveFilesTable;
/**
 * Drop Bus Table
 */
var dropModelTable = function () { return pool_1["default"].query('DROP TABLE IF EXISTS model').then(function () { return pool_1["default"].end(); }); };
/**
 * Create All Tables
 */
var createAllTables = function () {
    return Promise.all([createClientTable(), createDriveFilesTable(), createModelTable()])
        .then(function () {
        console.log('all tables created values: ');
        pool_1["default"].end();
    })["catch"](function (err) {
        console.log('error creating all tables: ', err);
        pool_1["default"].end();
    });
};
exports.createAllTables = createAllTables;
/**
 * Drop All Tables
 */
var dropAllTables = function () {
    dropClientTable();
    dropDriveFilesTable();
    dropModelTable();
};
exports.dropAllTables = dropAllTables;
pool_1["default"].on('remove', function () {
    console.log('client removed');
    process.exit(0);
});
require('make-runnable');
