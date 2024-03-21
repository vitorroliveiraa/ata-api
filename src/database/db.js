import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;
import { AppError } from '../shared/middlewares/errorMiddleware.js';

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING
});

export function query(text, params) { return pool.query(text, params); }
export function getClient() { return pool.connect(); }

export async function testDatabaseConnection() {
  try {
    const client = await getClient();
    const res = await client.query('SELECT NOW()');
    console.log('Conexão bem-sucedida:', res.rows[0]);
    client.release();
  } catch (err) {
    throw new AppError(`💥 Erro ao conectar no banco de dados.`);
  }
}