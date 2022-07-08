import express, { Request, Response } from "express";
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

server.use((request: Request, response: Response) => {
  response.status(404);
  response.json({error: 'Not Found.'});
});

server.listen(process.env.PORT);