// Include the cluster module
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const logger = require('morgan');
const layout = require('./src/layout');
const ServerFactory = require('./dist/tk.bundle');

dotenv.config();


const app = express();
const serverFactory = new ServerFactory();

async function getLotPage(req, res) {
  const content = serverFactory.getSsr('LotPage');
  const response = layout({
    title: 'PhillipsTK - Lot',
    componentType: 'lotpage',
    content
  });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}
async function getIndex(req, res) {
  const content = serverFactory.getSsr('Home');
  const response = layout({
    title: 'PhillipsTK',
    componentType: 'home',
    content
  });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}

const webWorkers = (req, res) => {
  const response = layout({ title: 'Lab 49 Prep', type: 'web-worker' });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
};

const mochaTest = (req, res) => {
  const response = layout({ title: 'Lab 49 Prep', type: 'web-worker' });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
};
// END controller fns
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', getIndex);
app.get('/lot', getLotPage);
app.get('/web-workers', webWorkers);
app.get('/test', mochaTest);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  if (err.status !== 404) {
    console.log('err: ', err);
  }
  res.status(err.status || 500);
  res.send(err);
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
