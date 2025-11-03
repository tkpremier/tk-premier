import cors from 'cors';
import express, { ErrorRequestHandler, Request, Response } from 'express';
import { auth, requiresAuth } from 'express-openid-connect';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';
import apiRoutes from './api/routes';

const app = express();
app.use(cors());
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_URL
  })
);

async function getIndex(req: Request, res: Response) {
  res.send(`Welcome to the server!  Are you authenticated? ${req.oidc.isAuthenticated()}`);
}

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use('/build', express.static(path.resolve(__dirname, 'build')));
app.use('/workers', express.static(path.resolve(__dirname, 'workers')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', getIndex);
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});

// error handler
const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  if (err.status !== 404) {
    console.log('err: ', err);
  }
  res.status(err.status || 500);
  res.send(err);
};
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
