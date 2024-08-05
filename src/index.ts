import corsMiddleware from './corsConfig';

import cookieParser from 'cookie-parser';
import { PORT } from './configs';
import express from 'express';
import morgan from 'morgan';


import { login_unif } from './connections/login_unificado';
import { userRouter } from './routes/user.routes';

const v1 = '/api/v1';

import 'dotenv/config';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(corsMiddleware)

app.use(v1, userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const testConnection = async () => {
  try {
    await login_unif.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();
