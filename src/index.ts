import express, { Request, Response, NextFunction } from 'express';
import http from 'http';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import * as dotenv from 'dotenv'
import mongoose from 'mongoose';
import router from './routes/routes';

import NotesController from './controllers/notesController';
const notesController = new NotesController

dotenv.config();

const app = express();

app.use(cors ({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use('/', router);

async function creatingNote() {
  await notesController.createNote();
}

creatingNote();

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
})

const MONGO_URL = process.env.MONGO_URL

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));