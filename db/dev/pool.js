import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// postgres://transportUser:develop@localhost:5235/transport
const databaseConfig = {
  connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`
};
const pool = new pg.Pool(databaseConfig);

export default pool;
