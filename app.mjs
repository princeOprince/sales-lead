import express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as http from "http";
import __dirname  from './approotdir.mjs';
import {
    normalisePort, onError, onListening, handle404, basicErrorHandler
} from "./appsupport.mjs";

import { router as indexRouter } from './routes/index.mjs';
import { router as usersRouter } from './routes/users.mjs';

export const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(handle404);

// error handler
app.use(basicErrorHandler);

export const port = normalisePort(process.env.PORT || '3000');
app.set('port', port);

export const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

