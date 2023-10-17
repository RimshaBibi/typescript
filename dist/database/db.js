"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dbConfig = {
    user: 'postgres',
    password: 'resha',
    host: 'localhost',
    port: 5432,
    database: 'userDatabase',
};
const pool = new pg_1.Pool(dbConfig);
exports.default = pool;
