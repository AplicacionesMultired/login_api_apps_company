import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { userRouter } from './routes/user.routes';
import { login_unif } from './connections/login_unificado';

const v1 = '/api/v1';

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors({
  origin: ['http://172.20.1.110:5173', 'http://localhost:5173'],
  credentials: true
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