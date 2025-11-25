import express, { ErrorRequestHandler, Request, Response } from 'express';
import { auth, claimEquals } from 'express-openid-connect';
import createError from 'http-errors';
import logger from 'morgan';
import path from 'path';
import apiRoutes from './api/routes';

const app = express();
app.set('trust proxy', 1);

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_URL,
    routes: {
      login: false,
      logout: false
    }
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
app.use(express.urlencoded({ extended: true }));

app.get('/', getIndex);
app.get('/login', (_req, res) => {
  res.oidc.login({ returnTo: `${process.env.CLIENT_URL}/` });
});
app.post('/callback', (_req, _res, next) => next()); // handled by express-openid-connect internally

app.get('/logout', (_req, res) => {
  res.oidc.logout({ returnTo: `${process.env.CLIENT_URL}/` });
});

app.get('/profile', claimEquals('email', 'kkim31@gmail.com'), async (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
const allowed = new Set([
  process.env.CLIENT_URL!, // e.g. https://tkpremier.com or http://localhost:3000
  'https://www.tkpremier.com'
]);
app.use('/api', (req, res, next) => {
  const o = req.headers.origin as string | undefined;
  if (!o || allowed.has(o)) {
    if (o) res.setHeader('Access-Control-Allow-Origin', o);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,Content-Type,Accept,X-Requested-With');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use('/api', apiRoutes);

app.get('/healthz', (_req, res) => {
  res.status(200).send('ok');
});
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
