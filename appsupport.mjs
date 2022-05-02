import createError from 'http-errors';
import { port } from "./app.mjs";
import { server } from "./app.mjs";
import debug from "debug";
import { close as closeSequelize } from './models/lead.mjs';
const log = debug('sales-lead:server');
const errorLog = debug('sales-lead:server-error');

export function normalisePort(val) {
  const port = parseInt(val);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

export function onError(error) {
  errorLog(error);

  const bind = typeof port === "string"
    ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

export function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string"
    ? "pipe " + addr : "port " + addr.port;
  log(`Listening on ${bind}`);
}

export function handle404(req, res, next) {
  next(createError(404));
}

export function basicErrorHandler(err, req, res, next) {
  //  defer to built-in error handler if headersSent
  if (res.headersSent) {
    return next(err);
  }
  //  set locals, only provideing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === "development" ? err : {};
  //  render the error page
  res.status(err.status || 500);
  res.render('error');
}

async function catchProcessDeath() {
  log('urk...');
  await closeSequelize();
  server.close();
  process.exit(0);
}

process.on('SIGTERM', catchProcessDeath);
process.on('SIGINT', catchProcessDeath);
process.on('SIGHUP', catchProcessDeath);
process.on('exit', () => {log('exiting...'); });

process.on('uncaughtException', (err) => {
  console.error(`Program crashed! \n --- ${(err.stack || err)}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled rejection at Promise:  \n`,`Error code: ${reason.code} \n`, `Cause ::: ${reason.error}`);
  process.exit(1);
});

