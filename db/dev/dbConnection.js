
//db/dev/dbConnection.js

import pool from './pool';

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create DriveFiles Table
 */
const createDriveFilesTable = () => {
  const driveFilesCreateQuery = `CREATE TABLE IF NOT EXISTS drive
    (id VARCHAR(100) NOT NULL,
    drive_id VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    name VARCHAR(50) NOT NULL,
    web_view_link VARCHAR(100) NOT NULL,
    web_content_link VARCHAR(100) NOT NULL,
    created_on DATE NOT NULL)`;

  return pool.query(driveFilesCreateQuery);
};

/**
 * Create Model Table
 */
const createModelTable = () => {
  const modelCreateQuery = `CREATE TABLE IF NOT EXISTS model
    (id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    platform VARCHAR(100) NOT NULL,
    drive_ids VARCHAR(500)[],
    created_on DATE NOT NULL)`;
  return pool.query(modelCreateQuery);
};

/**
 * Create ClientTable Table
 * CREATE TABLE test
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL, 
  phone VARCHAR(100));
 */
const createClientTable = () => {
  const clientCreateQuery = `CREATE TABLE IF NOT EXISTS client
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  created_on DATE NOT NULL)`;
  return pool.query(clientCreateQuery);
};


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
 * Create Booking Table
 */
// const createBookingTable = () => {
//   const bookingCreateQuery = `CREATE TABLE IF NOT EXISTS booking(id SERIAL, 
//     trip_id INTEGER REFERENCES trip(id) ON DELETE CASCADE,
//     user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
//     bus_id INTEGER REFERENCES bus(id) ON DELETE CASCADE,
//     trip_date DATE, 
//     seat_number INTEGER UNIQUE,      
//     first_name VARCHAR(100) NOT NULL,
//     last_name VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL,      
//     created_on DATE NOT NULL,
//     PRIMARY KEY (id, trip_id, user_id))`;
//   pool.query(bookingCreateQuery)
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
 * Drop User Table
 */
const dropClientTable = () => pool.query('DROP TABLE IF EXISTS client').then(() => pool.end());

/**
 * Drop User Table
 */
const dropDriveFilesTable = () => pool.query('DROP TABLE IF EXISTS drive').then(() => pool.end());


/**
 * Drop Bus Table
 */
const dropModelTable = () => pool.query('DROP TABLE IF EXISTS model').then(() => pool.end());

// /**
//  * Drop Trip Table
//  */
// const dropTripTable = () => {
//   const tripDropQuery = 'DROP TABLE IF EXISTS trip';
//   pool.query(tripDropQuery)
//     .then((res) => {
//       console.log(res);
//       pool.end();
//     })
//     .catch((err) => {
//       console.log(err);
//       pool.end();
//     });
// };

// /**
//  * Drop Bus Table
//  */
// const dropBookingTable = () => {
//   const bookingDropQuery = 'DROP TABLE IF EXISTS booking';
//   pool.query(bookingDropQuery)
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
 * Create All Tables
 */
const createAllTables = () => Promise.all([
  createClientTable(), createDriveFilesTable(), createModelTable()
])
  .then(() => {
    console.log('all tables created values: ');
    pool.end();
  })
  .catch((err) => {
    console.log('error creating all tables: ', err);
    pool.end();
  });


/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropClientTable();
  dropDriveFilesTable();
  dropModelTable();
};

const dropAllTablesPromise = () => Promise.all([
  dropClientTable(),
  dropDriveFilesTable(),
  dropModelTable()
])
  .then((values) => {
    console.log('all tables dropped: ', values);
    pool.end();
  })
  .catch((err) => {
    console.log('error dropping all tables: ', err);
    pool.end();
  });

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


export {
  createAllTables,
  createDriveFilesTable,
  createClientTable,
  dropAllTables,
  dropDriveFilesTable,
  dropClientTable
};

require('make-runnable');
