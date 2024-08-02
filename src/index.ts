import express from 'express';
import 'dotenv/config';

import { userRouter } from './routes/user.routes';

const v1 = '/api/v1';

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.use(v1, userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});