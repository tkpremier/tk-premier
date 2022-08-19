/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
// Include the cluster module
import createError from 'http-errors';
import express from 'express';
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
import layout from './layout';
import { getDriveList } from './services/drive';
import apiRoutes from './routes';
import getMovie from './services/movie';
import ServerFactory from './server-bundle';

const app = express();
app.use(cors());

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

// BEGIN controller fns
// async function movieGame(req, res) {
//   res.setHeader('Cache-Control', 'assets, max-age=604800');
//   const json = await getMovie()
//     .then(movie => movie)
//     .catch(err => {
//       console.log('movie err: ', err);
//       res.send(err);
//     });
//   const data = await json;
//   // weird axios quirk
//   // https://github.com/axios/axios/issues/836
//   res.json(data);
// }

async function getList(req, res) {
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  try {
    const json = await getDriveList(req.query.nextPage);
  const response = layout({
    title: 'Lists',
    componentType: 'Grid',
    data: JSON.stringify({ data: json }),
    content: 'Data'
  });
  res.send(response);
  } catch(e) {
    res.send(layout({
      title: 'Lists',
      componentType: 'Grid',
      data: JSON.stringify({ data: e }),
      content: 'There was an error'
    }));
  }
  
}

async function getIndex(req, res) {
  const data = [];
  console.log(ServerFactory);
  const serverFactory = new ServerFactory();
  const response = layout({
    title: 'Google T',
    componentType: 'Main',
    content: serverFactory.getSsr(),
    data: JSON.stringify(data)
  });
  res.setHeader('Cache-Control', 'assets, max-age=604800');
  res.send(response);
}

// const webWorkers = (req, res) => {
//   const response = layout({ title: 'Lab 49 Prep', type: 'web-worker' });
//   res.setHeader('Cache-Control', 'assets, max-age=604800');
//   res.send(response);
// };

// const mochaTest = (req, res) => {
//   const response = layout({ title: 'Lab 49 Prep', type: 'web-worker' });
//   res.setHeader('Cache-Control', 'assets, max-age=604800');
//   res.send(response);
// };
// END controller fns

console.log('dirname: ', __dirname);

app.use('/dist', express.static(path.resolve(__dirname, 'dist')));
app.use('/build', express.static(path.resolve(__dirname, 'build')));
app.use('/workers', express.static(path.resolve(__dirname, 'workers')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', getIndex);
app.get('/list', getList);
// app.get('/moviegame', movieGame);
// app.get('/web-workers', webWorkers);
// app.get('/test', mochaTest);
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

const port = process.env.PORT || 9000;

app.listen(port, function () {
  console.log('Server running at http://127.0.0.1:' + port + '/');
});
