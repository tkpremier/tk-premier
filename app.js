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
  GraphQLSchema,
  buildSchema
} = require("graphql");

const layout = require('./src/layout');
const { authorize, listFiles, getFile, getUser } = require('./src/services/drive');
const getMovie = require('./src/services/movie');
const ssr = require('./dist/app.bundle');

dotenv.config();

// mongoose.connect("mongodb://127.0.0.1:27017/tk-premier", {useNewUrlParser: true});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('connected to database: ');
// });

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

// GRAPHQL //

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

};

const returnSorted = (files, sortString = 'createdTime-asc') => {
  return files.filter(file => sortString.indexOf('viewed') > -1
    ? (file.viewedByMe)
    : file)
    .sort((a, b) => {
      const asc = sortString.indexOf('asc') > -1;
      const prop = sortString.split('-')[0];

      const dateA = new Date(a[prop]);
      const dateB = new Date(b[prop]);
      if (asc) {
        if (dateA.valueOf() < dateB.valueOf()) {
          return -1;
        }
        if (dateA.valueOf() > dateB.valueOf()) {
          return 1;
        }
      } else if (!asc) {
        if (dateA.valueOf() > dateB.valueOf()) {
          return -1;
        }
        if (dateA.valueOf() < dateB.valueOf()) {
          return 1;
        }
      }
      return 0;
    });
};

async function listRouter(req, res) {
  const credentials = await fsp.readFile('./credentials.json', { encoding: 'utf8'});
  const auth = await authorize(JSON.parse(credentials));
  console.log('auth: ', auth);
  const data = await listFiles(auth)
    .then((res) => {
      console.log('res: ', res);
      return { ...res, files: res.data.files };
  })
    .catch((err) => {
      console.log('listFiles err: ', err);
      const jsonErr = JSON.stringify({
        files: [],
        nextPageToken: err.toString()
      });
      return {
        files: []
      }
    });
  // const json = await listFiles(auth)
  const content = ssr({ data });
  const response = layout({
    initialState,
    title: 'Lists',
    type: 'server',
    data: JSON.stringify(json),
    content
  });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}
async function getMore(req, res) {
  const auth = await authorize();
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
};

async function indexRouter(req, res) {
  
  const response = layout({
    initialState,
    title: 'Google T',
    type: 'react',
    data: []
  });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
  // const json = JSON.parse(data);
};

const webWorkers = (req, res) => {
  const response = layout({ title: 'Lab 49 Prep', type: 'web-worker' });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}

const mochaTest = (req, res) => {
  const response = layout({ title: 'Lab 49 Prep', type: 'web-worker' });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}


app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/workers', express.static(path.resolve(__dirname, 'workers')))
app.use(logger('dev'));
// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

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