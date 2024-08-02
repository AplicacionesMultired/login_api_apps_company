import express, { Request, Response } from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.get('/dataTime', async (req, res) => {
  try {
    const response = await fetch('http://worldtimeapi.org/api/timezone/America/Bogota')
    const data = await response.json()

    const { datetime } = data // "2024-02-23T09:38:19.557255-05:00"

    const fecha = datetime.split('T')[0]
    const hora = datetime.split('T')[1].split('.')[0]

    res.json({ fecha, hora })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener la fecha y hora' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});