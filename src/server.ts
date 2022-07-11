import express, { Request, Response, ErrorRequestHandler } from "express";
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import { MulterError } from 'multer';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use('/', apiRoutes)

server.use((request: Request, response: Response) => {
  response.status(404);
  response.json({error: 'Not Found.'});
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400);

  if(err instanceof MulterError) {
    res.json({ error: err.code });
  } else {
    res.json({ error: 'Ocorreu algum erro' })
  }
}

server.use(errorHandler);

server.listen(process.env.PORT);