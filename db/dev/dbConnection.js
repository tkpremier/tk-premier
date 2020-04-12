
//db/dev/dbConnection.js

import pool from './pool';

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create User Table
 * CREATE TABLE test
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL, 
  phone VARCHAR(100));
 */
const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100), 
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  created_on DATE NOT NULL)`;

  pool.query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

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

  pool.query(driveFilesCreateQuery)
    .then((res) => {
      console.log('driveFilesCreate res', res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
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
const dropUserTable = () => {
  const usersDropQuery = 'DROP TABLE IF EXISTS users';
  pool.query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropDriveFilesTable = () => {
  const driveFilesDropQuery = 'DROP TABLE IF EXISTS drive';
  pool.query(driveFilesDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// /**
//  * Drop Bus Table
//  */
// const dropBusTable = () => {
//   const busDropQuery = 'DROP TABLE IF EXISTS bus';
//   pool.query(busDropQuery)
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
const createAllTables = () => {
  createUserTable();
  createDriveFilesTable();
};


/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropDriveFilesTable();
  dropUserTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


export {
  createAllTables,
  createDriveFilesTable,
  createUserTable,
  dropAllTables,
  dropDriveFilesTable,
  dropUserTable
};

require('make-runnable');
