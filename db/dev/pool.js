"use strict";
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-var-requires */
var Pool = require('pg').Pool;
var dotenv = require('dotenv');
dotenv.config();
// postgres://transportUser:develop@localhost:5235/transport
var databaseConfig = { connectionString: "postgres://".concat(process.env.PGUSER, ":").concat(process.env.PGPASSWORD, "@").concat(process.env.PGHOST, ":").concat(process.env.PGPORT, "/").concat(process.env.PGDATABASE) };
var pool = new Pool(databaseConfig);
exports["default"] = pool;
