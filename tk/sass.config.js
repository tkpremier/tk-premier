var sass = require('node-sass');
var autoPrefixer = require('autoprefixer');
var postCSS = require('postcss');
var bourbon = require('bourbon');
var winston = require('winston');
var fs = require('fs');

var paths = [
  './PhillipsPublic.JavaScript/tk/src/styles/_components.scss',
  './PhillipsPublic.JavaScript/tk/src/styles/_vars.scss',
  './PhillipsPublic.JavaScript/tk/src/styles/fonts.scss',
  './PhillipsPublic.JavaScript/tk/src/styles/home.scss'

];

function compile(path) {
  winston.log('info', `Environment:  ${process.env.NODE_ENV}`);
  winston.log('info', 'Compiling css');
  const buildPath = path.replace('src/styles', 'assets').replace('scss', 'css');
  try {
    sass.render({
      file: path,
      includePaths: bourbon.includePaths,
      outputStyle: 'compressed',
      sourceMap: true,
      outFile: buildPath
    }, (err, result) => {
      if (err) {
        winston.log('error', 'sass error: ', err);
        // throw err;
      } else {
        postCSS([autoPrefixer])
          .process(result.css)
          .then((res) => {
            res.warnings().forEach((warning) => {
              winston.log('warning', warning.toString());
            });
            winston.log('info', 'sucessfully compiled sass');
            fs.writeFile(buildPath, res.css, (error) => {
              if (error) {
                winston.log('error', 'file write error: ', error);
                throw Error;
              } else {
                winston.log('info', 'successfully saved css');
                console.log('buildPath: ', buildPath);
                fs.writeFile(buildPath + '.map', res.map, (e) => {
                  if (e) {
                    winston.log('error', 'error: ', e);
                    throw e;
                  } else {
                    winston.log('info', 'sucessfully saved map');
                  }
                });
              }
            });
          });
      }
    });
  } catch (e) {
    console.log('e: ', e);
  }
}
console.log('process args: ', process.argv);
if (process.argv[2] === 'watch') {
  winston.log('info', 'watching sass for changes');
  paths.forEach(path => fs.watchFile(path, () => compile(path)));
} else {
  paths.forEach(compile);
}
