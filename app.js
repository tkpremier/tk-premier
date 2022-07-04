// Include the cluster module
const createError = require('http-errors');
const express = require('express');
var cors = require('cors');
const path = require('path');
const fsp = require('fs').promises;
const dotenv = require('dotenv');
const logger = require('morgan');
const ExpressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const { GraphQLID, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } = require('graphql');
const layout = require('./src/layout');
const { authorize, listFiles, getUser } = require('./src/services/drive');
const apiRoutes = require('./src/routes');
const { getDriveFile, getModel } = require('./src/services/db');
const getMovie = require('./src/services/movie');
const ServerFactory = require('./dist/app.bundle');

dotenv.config();

// google drive authenticate;
const getCredentials = () => ({
  installed: {
    client_id: '160250970666-eofi1rkudvcbhf3n3fheaf7acc3mak8c.apps.googleusercontent.com',
    project_id: 'quickstart-1557442132353',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: '_SifxYsgMaLTGfTJdvHlNrhv',
    redirect_uris: ['http://localhost:9000', 'http:// localhost:3000']
  }
});

const app = express();
app.use(cors());
const serverFactory = new ServerFactory();

/* 
  // GRAPHQL //
  const modelSchema = {
    name: String,
    dates: Array
  };
  const Model = mongoose.model('Model', modelSchema);

  const ModelType = new GraphQLObjectType({
    name: 'Model',
    fields: {
      id: { type: GraphQLID },
      firstname: { type: GraphQLString },
      dates: { type: GraphQLList(GraphQLString) }
    }
  });

  const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        models: {
          type: GraphQLList(ModelType),
          resolve: (root, args, context, info) => {
            return Model.find().exec();
          }
        },
        model: {
          type: ModelType,
          args: {
            id: { type: GraphQLNonNull(GraphQLID) }
          },
          resolve: (root, args, context, info) => {
            return Model.findById(args.id).exec();
          }
        }
      }
    })
  });
  const root = {
    query: () => {
      console.log('root');
      return `Hello world`;
    }
  };
  app.use('/graphql', ExpressGraphQL({
    schema: schema,
    graphiql: true,
    rootValue: root
  })); 
*/

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// app.use(webpackHotMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));

// react state
const initialState = {
  isFetching: true,
  name: 'Kyungtae',
  type: 'server'
};

// BEGIN controller fns
async function movieGame(req, res) {
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  const json = await getMovie()
    .then(movie => movie)
    .catch(err => {
      console.log('movie err: ', err);
      res.send(err);
    });
  // weird axios quirk
  // https://github.com/axios/axios/issues/836
  res.json(json.data);
}
async function getDrive() {
  const credentials = getCredentials();
  const auth = await authorize(credentials);
  const data = await listFiles(auth)
    .then(({ data }) => data.files)
    .catch(err => {
      console.log('listFiles err: ', err);
      return [];
    });
  return data;
}

async function getList(req, res) {
  const data = await getDrive();
  const content = serverFactory.getSsr('Grid', { data });
  const response = layout({
    initialState,
    title: 'Lists',
    componentType: 'Grid',
    data: JSON.stringify({ data }),
    content
  });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}

async function getModels(req, res) {
  const data = await getModel(req, res)
    .then(res => ({
      models: res.data
    }))
    .catch(err => {
      console.log('models err: ', err);
      return {
        models: []
      };
    });
  // const json = await listFiles(auth)
  const content = serverFactory.getSsr('ModelRoot', data);
  const response = layout({
    componentType: 'ModelRoot',
    content,
    data: JSON.stringify(data),
    title: 'Models'
  });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}
async function getMore(req, res) {
  const credentials = getCredentials();
  const auth = await authorize(credentials);
  const listMore = await listFiles(auth, req.params.token)
    .then(moreRes => moreRes)
    .catch(err => JSON.stringify(err));
  res.json(listMore);
}

async function getIndex(req, res) {
  const data = [];
  const content = serverFactory.getSsr('Main', { data });
  const response = layout({
    initialState,
    title: 'Google T',
    componentType: 'Main',
    content,
    data: JSON.stringify(data)
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

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/workers', express.static(path.resolve(__dirname, 'workers')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', getIndex);
app.get('/get-more/:token', getMore);
app.get('/list', getList);
app.get('/model', getModels);
app.get('/moviegame', movieGame);
app.get('/web-workers', webWorkers);
app.get('/test', mochaTest);
app.use('/api', apiRoutes);

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

var port = process.env.PORT || 9000;

app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
