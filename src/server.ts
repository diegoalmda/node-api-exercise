import express, { Request, Response } from "express";
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';

dotenv.config();

const server = express();

server.use(cors({
  origin: '*',
  methods: ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use('/api', apiRoutes)

server.use((request: Request, response: Response) => {
  response.status(404);
  response.json({error: 'Not Found.'});
});

server.listen(process.env.PORT);