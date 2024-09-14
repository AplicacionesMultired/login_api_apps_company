import { Sequelize } from 'sequelize';
import 'dotenv/config';

const DB_NAME = process.env.DB_MAR_NAME as string
const DB_USER = process.env.DB_MAR_USER as string
const DB_PASS = process.env.DB_MAR_PASS as string
const DB_HOST = process.env.DB_MAR_HOST as string
const DB_PORT = parseInt(process.env.DB_MAR_PORT as string)

const marcacion = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port : DB_PORT,
  dialect: 'mariadb',
  timezone: '-05:00',
});

export { marcacion };