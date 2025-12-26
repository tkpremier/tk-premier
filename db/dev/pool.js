import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

// postgres://transportUser:develop@localhost:5235/transport
const databaseConfig = {
  connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`
};
const pool = new pg.Pool(databaseConfig);

export default pool;
