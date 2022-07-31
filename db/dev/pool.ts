/* eslint-disable @typescript-eslint/no-var-requires */
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// postgres://transportUser:develop@localhost:5235/transport
const databaseConfig = { connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}` };
const pool = new Pool(databaseConfig);

export default pool;
