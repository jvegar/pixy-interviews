---
to: apps/<%= h.changeCase.param(name) %>/src/app.ts
---
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req: Request, res: Response) => {
  return res.json({
    status: 'success',
    app: '<%= h.changeCase.param(name) %>',
  });
});

export default app;
