var sass = require('node-sass');
var autoPrefixer = require('autoprefixer');
var postCSS = require('postcss');
var bourbon = require('bourbon');
var winston = require('winston');
var fs = require('fs');

var sassPaths = {
  'react': [
    './PhillipsPublic.JavaScript/src/react/styles/_articker.scss',
    './PhillipsPublic.JavaScript/src/react/styles/_components.scss',
    './PhillipsPublic.JavaScript/src/react/styles/_vars.scss',
    './PhillipsPublic.JavaScript/src/react/styles/artistlanding.scss',
    './PhillipsPublic.JavaScript/src/react/styles/artistsbulletin.scss',
    './PhillipsPublic.JavaScript/src/react/styles/artistsmakers.scss',
    './PhillipsPublic.JavaScript/src/react/styles/auctionpage.scss',
    './PhillipsPublic.JavaScript/src/react/styles/calendarpage.scss',
    './PhillipsPublic.JavaScript/src/react/styles/careers.scss',
    './PhillipsPublic.JavaScript/src/react/styles/cmsforms.scss',
    './PhillipsPublic.JavaScript/src/react/styles/cms-ui.scss',
    './PhillipsPublic.JavaScript/src/react/styles/consignmentspage.scss',
    './PhillipsPublic.JavaScript/src/react/styles/departments.scss',
    './PhillipsPublic.JavaScript/src/react/styles/departments.cms.scss',
    './PhillipsPublic.JavaScript/src/react/styles/editorials.scss',
    './PhillipsPublic.JavaScript/src/react/styles/exhibitions.scss',
    './PhillipsPublic.JavaScript/src/react/styles/grid_columns.scss',
    './PhillipsPublic.JavaScript/src/react/styles/lotpage.scss',
    './PhillipsPublic.JavaScript/src/react/styles/myartists.scss',
    './PhillipsPublic.JavaScript/src/react/styles/myfavorites.scss',
    './PhillipsPublic.JavaScript/src/react/styles/phillipsnav.scss',
    './PhillipsPublic.JavaScript/src/react/styles/press.scss',
    './PhillipsPublic.JavaScript/src/react/styles/proposals.scss',
    './PhillipsPublic.JavaScript/src/react/styles/reacthomepage.scss',
    './PhillipsPublic.JavaScript/src/react/styles/searchpage.scss',
    './PhillipsPublic.JavaScript/src/react/styles/upcominglotspage.scss',
    './PhillipsPublic.JavaScript/src/react/styles/cataloguesubs.scss',
    './PhillipsPublic.JavaScript/src/react/styles/cataloguebuy.scss',
    './PhillipsPublic.JavaScript/src/react/styles/pastAuctions.scss',
    './PhillipsPublic.JavaScript/src/react/styles/styleguide.scss',
    './PhillipsPublic.JavaScript/src/react/styles/team.scss',
    './PhillipsPublic.JavaScript/src/react/styles/useraccount.scss',
    './PhillipsPublic.JavaScript/src/react/styles/galleryone.scss',
    './PhillipsPublic.JavaScript/src/react/styles/stripethankyou.scss'
  ],
  'cms': [
    './PhillipsPublic.CMS/Content/Site.scss'
  ]
};

const checkImport = path => path.indexOf('/styles/_') > -1;

function compile(path) {
  winston.log('info', `Environment:  ${process.env.NODE_ENV}`);
  winston.log('info', 'Compiling css');
  const isImport = checkImport(path);
  const buildPath = path.replace('src/react/styles', 'dist').replace('scss', 'css');
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
                fs.writeFile(buildPath + '.map', res.map || '', (e) => {
                  if (e) {
                    winston.log('error', 'error: ', e);
                    throw e;
                  } else {
                    winston.log('info', 'sucessfully saved map');
                  }
                });
                if (process.argv[3] === 'watch' && isImport) {
                  sassPaths.react.forEach((path) => {
                    if (!checkImport(path)) {
                      compile(path);
                    }
                  })
                };
              }
            });
          });
      }
    });
  } catch (e) {
    console.log('e: ', e);
  }
}

const paths = (typeof process.argv[2] !== 'undefined') ?
  sassPaths[process.argv[2]] :
  sassPaths.react.concat(sassPaths.cms);

if (process.argv[3] === 'watch') {
  winston.log('info', 'watching sass for changes');
  paths.forEach(path => fs.watchFile(path, () => compile(path)));
} else {
  paths.forEach(compile);
}
