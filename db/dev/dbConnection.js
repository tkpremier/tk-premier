import pool from './pool';

const fs = require('fs');

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
 * Update Model Table
 */
const createDriveFilesFromJson = async () => {
  // `INSERT INTO
  // drive(id, drive_id, type, name, web_view_link, web_content_link, created_on)
  // VALUES($1, $1, $2, $3, $4, $5, $6)
  // returning *`;
  fs.readFile('drive-files-dump.json', (err, data) => {
    if (err) {
      console.log('huh???: ', err);
      return false;
    }
    const files = JSON.parse(data);
    files.forEach(async (file) => {
      const {
        createdTime,
        id,
        mimeType,
        name,
        thumbnailLink,
        webContentLink,
        webViewLink,
        viewedByMeTime
      } = file;
      const createDriveFileQuery = `INSERT INTO
  drive(id, drive_id, type, name, web_view_link, web_content_link, created_on)
  VALUES($1, $1, $2, $3, $4, $5, $6)
  returning *`;
      const value = [id, mimeType, name, webViewLink, webContentLink, createdTime];
      const client = await pool.connect();
      await client.query(createDriveFileQuery, value)
        .then((res) => {
          console.log('res: ', res);
          return res;
        })
        .catch((err) => {
          console.log('err?: ', err);
          return err;
        });;
      client.release();
    });
  });
};
/**
 * Drop Client Table
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

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


export {
  createAllTables,
  createDriveFilesFromJson,
  createDriveFilesTable,
  createClientTable,
  dropAllTables,
  dropDriveFilesTable,
  dropClientTable
};

require('make-runnable');
