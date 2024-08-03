import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';

import { userRouter } from './routes/user.routes';
import { login_unif } from './connections/login_unificado';

const v1 = '/api/v1';

const app = express();
const port = process.env.PORT || 3000;

// const CARTERA_FRONTEND = process.env.CARTERA_FRONTEND as string;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(express.json());

app.use(v1, userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
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