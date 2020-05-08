import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import handleResponse from './utils/handleResponse';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  gridList: {
    width: '100%',
    padding: '60px 30px',
    height: 700
  }
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 * AddModelForm
 *  input name="modelName"
 *
 */

const List = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={6}>
        {data
          .filter(file => file.mimeType.indexOf('image') > -1 || file.mimeType.indexOf('video') > -1)
          .map(file => (
            <GridListTile cols={2} key={file.webViewLink}>
              {file.hasThumbnail && file.thumbnailLink.length > 0 ? (
                <img src={getImageLink(file.thumbnailLink, 's550')} alt={file.title} />
              ) : null}
              <GridListTileBar
                title={<span>{file.name}</span>}
                subtitle={
                  <span>
                    created on: ${file.createdTime},<br />
                    <a href={file.webViewLink} target="_blank">
                      last seen: ${file.viewedByMeTime}`}
                    </a>
                  </span>
                }
                actionIcon={
                  <IconButton
                    aria-label={`info about ${file.name}`}
                    className={classes.icon}
                    onClick={() => {
                      console.log('file', file);
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
      </GridList>
    </div>
  );
};
const getImageLink = (link = '', endStr = 's220', split = 's220') => {
  const [base] = link.split(split);
  return `${base}${endStr}`;
};
const handlethumbNailLink = (thumbnailLink = '', mult = 0, begin = 0) => {
  const base = 220;
  let link = thumbnailLink.split('s220')[0];
  const links = [];
  for (let i = begin; i < mult + begin; i++) {
    links.push(`${link}s${base * (i + 1)}`);
  }
  return links;
};

const returnSorted = (files, sortString = 'createdTime-asc') => {
  return files
    .filter(file => (sortString.indexOf('viewed') > -1 ? file.viewedByMe : file))
    .sort((a, b) => {
      const asc = sortString.indexOf('asc') > -1;
      const prop = sortString.split('-')[0];
      const dateA = new Date(a[prop]);
      const dateB = new Date(b[prop]);
      return asc ? dateA < dateB : !(dateA > dateB);
    });
};

const Grid = ({ nextPageToken = '', files = [] }) => {
  const [data, setData] = useState(files);
  const [token, setToken] = useState(nextPageToken);
  const getMore = () => {
    fetch(`/get-more/${token}`)
      .then(handleResponse)
      .then(json => {
        setToken(json.data.nextPageToken);
        const newData = json.data.files.concat(data);
        setData(returnSorted(newData));
      })
      .catch(err => {
        console.log('err: ', err);
      });
  };
  const sortData = e => setData(returnSorted(data, e.target.value));
  return (
    <div>
      <section style={{ postion: 'fixed', width: '100%' }} className="controls">
        <fieldset>
          <button type="button" onClick={getMore}>
            {`Get 100 More : ${data.length}`}
          </button>
          <select onChange={sortData} defaultValue="createdTime-asc">
            <option value="">Choose Sort</option>
            <option value="createdTime-asc">Created - Earliest</option>
            <option value="createdTime-desc">Created - Latest</option>
            <option value="viewedByMeTime-asc">Viewed - Earliest</option>
            <option value="viewedByMeTime-desc">Viewed - Latest</option>
          </select>
        </fieldset>
      </section>
      <List data={data} />
    </div>
  );
};

Grid.defaultProps = {
  data: []
};
export default Grid;
