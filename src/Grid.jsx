import React, { useState } from 'react';
import handleResponse from './utils/handleResponse';

const handlethumbNailLink = (thumbnailLink = "", mult = 0, begin = 0) => {
  const base = 220;
  let link = thumbnailLink.split('s220')[0];
  const links = [];
  for (let i = begin; i < (mult + begin); i++) {
    links.push(`${link}s${base * (i + 1)}`)
  }
  return links;
};

const returnSorted = (files, sortString = 'createdTime-asc') => {
  return files.filter(file => sortString.indexOf('viewed') > -1
    ? (file.viewedByMe)
    : file
    )
  .sort((a, b) => {
    const asc = sortString.indexOf('asc') > -1;
    const prop = sortString.split('-')[0];
    const dateA = new Date(a[prop]);
    const dateB = new Date(b[prop]);
    return asc ? (dateA < dateB) : !(dateA > dateB)
  });  
}

const Grid = ({ nextPageToken = '', files =  [] }) => {
  const [ data , setData ] = useState(files);
  const [ token, setToken ] = useState(nextPageToken);
  const getMore = () => {
    fetch(`/get-more/${token}`)
      .then(handleResponse)
      .then((json) => {
        // if (typeof window !== 'undefined' && typeof window.localStorage.getItem('data') !== 'undefined') {
        //   const nameModifiedThumb = json.data.files.map(model => `{ name: ${model.name}, modifiedTime: ${model.modifiedTime}, thumbnailLink: ${model.thumbnailLink} }`);
        //   const prev = window.localStorage.getItem('data');
        //   const concat = nameModifiedThumb.concat(prev);
        //   window.localStorage.setItem('data', concat);
        //     const worker = new Worker('/workers/worker.js');
        //     worker.postMessage('worker set');
        //     console.log('worker? ', worker);
        //     worker.onmessage = (e) => {
        //       console.log('back in the main thread: ', e);
        //     }
        // }
        setToken(json.data.nextPageToken);
        setData(returnSorted(json.data.files.concat(data)));
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };
  const sortData = e => setData(returnSorted(data, e.target.value));
  return (
    <div style={{ 'postion': 'fixed', 'width': '100%', 'minHeight': '25px' }}>
      <section className="controls">
        <fieldset>
          <button onClick={(e) => { if (window) {
            window.localStorage.clear();
          } }}
          >
            Clear
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
      <ul>
      {data.map((file, i) => (
        <li>
          <button onClick={() => { console.log('file',  file);}} >Get File info</button>
          <p>{`Name: ${file.name}, created on: ${file.createdTime}, last seen: ${file.viewedByMeTime}`}</p>
          <p>
            <a href={file.webViewLink}>Web view Link</a>
            <a href={file.webContentLink}>Download</a>
          </p>
          
          <div>
          {file.thumbnailLink && file.thumbnailLink.length > 0
            ? handlethumbNailLink(file.thumbnailLink, 2).map(link => <img src={link} />)
            : null
          }
          </div>
          <button
           type="button"
            onClick={getMore}
          >
            { `Get 100 More : ${data.length}` }
          </button>
        </li>
      ))}
    </ul>
    </div>
  );
};

Grid.defaultProps = {
  data: []
};
export default Grid;
