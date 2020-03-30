
import { Pool } from 'pg';
import dotenv from 'dotenv';
// postgres://transportUser:develop@localhost:5235/transport
dotenv.config();

const databaseConfig = { connectionString: `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}` };
const pool = new Pool(databaseConfig);

export default pool;