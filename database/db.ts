import { Pool } from 'pg';


type DatabaseConfig = {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
};


const dbConfig: DatabaseConfig = {
  user: 'postgres',
  password: 'resha',
  host: 'localhost',
  port: 5432,
  database: 'userDatabase',
};


const pool = new Pool(dbConfig);

export default pool;


