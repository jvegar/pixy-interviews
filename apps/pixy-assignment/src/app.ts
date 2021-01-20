import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

const url = 'http://';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req: Request, res: Response) => {
  return res.json({
    status: 'success',
    app: 'pixy-assignment',
  });
});
export default app;
