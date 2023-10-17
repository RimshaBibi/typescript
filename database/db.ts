import { Pool } from 'pg';
import dotenv from "dotenv"
dotenv.config()


type DatabaseConfig = {
  user: any;
  password: any;
  host: any;
  port: any;
  database: string;
};


const dbConfig: DatabaseConfig = {
  user:process.env.dbUser,
  password: process.env.dbPassword,
  host: process.env.host,
  port:process.env.dbPort,
  database: 'userDatabase',
};


const pool = new Pool(dbConfig);

export default pool;


