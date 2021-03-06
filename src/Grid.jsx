import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import GridItem from './GridItem';
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
const getImageLink = (link = '', endStr = 's220', split = 's220') => {
  const [base] = link.split(split);
  return `${base}${endStr}`;
};
const List = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={6}>
        {data.map(file => (
          // <GridItem {...file} key={file.webViewLink} />
          <GridListTile cols={2}>
            {file.thumbnailLink !== null ? (
              <img src={getImageLink(file.thumbnailLink, 's550', 's220')} alt={file.title} />
            ) : null}
            <GridListTileBar
              title={<span>{file.name}</span>}
              actionIcon={
                <IconButton
                  aria-label={`info about ${file.name}`}
                  className={classes.icon}
                  onClick={() => {
                    console.log(file);
                  }}
                >
                  <InfoIcon />
                </IconButton>
              }
            />

            {/* {formOpen ? <Form onSubmit={handleSubmit} /> : null} */}
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
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

const Grid = ({ data, nextPageToken }) => {
  const [sliceIndex, setSlice] = useState(100);
  const total = data.length;
  const [token, setToken] = useState(nextPageToken);
  const getMore = () => {
    if (total > sliceIndex + 100) {
      setSlice(sliceIndex + 100);
      return;
    }
    if (total > sliceIndex) {
      setSlice(total);
    }
  };
  console.log('data: ', data);
  // const shownData = data.slice(0, sliceIndex);
  return (
    <div>
      <section style={{ position: 'fixed', width: '100%', zIndex: '10' }} className="controls">
        <fieldset>
          <button type="button" onClick={getMore}>
            {`Get 100 More : ${data.length}`}
          </button>
          <select defaultValue="createdTime-asc">
            <option value="">Choose Sort</option>
            <option value="createdTime-asc">Created - Earliest</option>
            <option value="createdTime-desc">Created - Latest</option>
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
