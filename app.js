// Include the cluster module
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fs = require('fs');
const fsp = require('fs').promises;
const dotenv = require('dotenv');
const logger = require('morgan');
const ExpressGraphQL = require("express-graphql");
const mongoose = require('mongoose');
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema
} = require("graphql");
const layout = require('./src/layout');
const { authorize, listFiles, getFile, getUser } = require('./src/services/drive');
const apiRoutes = require('./src/routes');
const { createDriveFile } = require('./src/services/db');
const getMovie = require('./src/services/movie');
const ServerFactory = require('./dist/app.bundle');

dotenv.config();

// google drive authenticate;
async function getCredentials() {
  return fsp.readFile('./credentials.json', { encoding: 'utf8' })
    .then(res => JSON.parse(res));
}
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

const app = express();
const serverFactory = new ServerFactory();


// GRAPHQL //

const root = {
  query: () => {
    console.log('root');
    return `Hello world`;
  }
};
app.use('/api', apiRoutes);

app.use('/graphql', ExpressGraphQL({
  schema: schema,
  graphiql: true,
  rootValue: root
}));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
// app.use(webpackHotMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));

const initialState = {
  isFetching: true,
  name: 'Kyungtae',
  type: 'server'
};

// Movie game
async function movieGame(req, res) {
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  const json = await getMovie()
    .then(movie => movie)
    .catch((err) => {
      console.log('movie err: ', err);
      res.send(err);
    });
  // weird axios quirk
  // https://github.com/axios/axios/issues/836
  res.json(json.data);
}

async function listRouter(req, res) {
  const credentials = await getCredentials().then(cred => cred);
  const auth = await authorize(credentials);
  const data = await listFiles(auth)
    .then((res) => {
      const files = res.data.files.map((file) => {
        // const {
        //   id,
        //   name,
        //   webViewLink,
        //   webContentLink,
        //   mimeType
        // } = file;
        // createDriveFile({
        //   id,
        //   name,
        //   mimeType,
        //   webViewLink,
        //   webContentLink
        // });
        return createDriveFile(fileData).then().catch();
        return {
          ...file,
          type: file.mimeType
        };
      });
      return { files, nextPageToken: res.data.nextPageToken };
    })
    .catch((err) => {
      console.log('listFiles err: ', err);
      return {
        files: [],
        nextPageToken: ''
      }
    });
  // const json = await listFiles(auth)
  const content = serverFactory.getSsr('Grid', { data });
  const response = layout({
    initialState,
    title: 'Lists',
    componentType: 'Grid',
    data: JSON.stringify(data),
    content
  });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}
async function getMore(req, res) {
  const credentials = await getCredentials().then(cred => cred);
  const auth = await authorize(credentials);
  const listMore = await listFiles(auth, req.params.token)
    .then(moreRes => moreRes)
    .catch(err => JSON.stringify(err));
  res.json(listMore);
}

async function contiguous(req, res) {
  const response = layout({
    title: 'Algorithms and Data Structures',
    type: 'algos',
    data: ''
  });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}

async function indexRouter(req, res) {
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


app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/workers', express.static(path.resolve(__dirname, 'workers')))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', indexRouter);
app.get('/list', listRouter);
app.get('/moviegame', movieGame);
app.get('/web-workers', webWorkers);
app.get('/test', mochaTest);
app.get('/get-more/:token', getMore);
app.get('/contiguous/', contiguous);


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