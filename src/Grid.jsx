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

const Grid = ({ data }) => {
  const [ nextData , setNextData ] = useState(data);
  const getMore = () => {
    fetch(`/get-more/${nextData.nextPageToken}`)
      .then(handleResponse)
      .then((json) => {
        setNextData({
          ...nextData,
          files: returnSorted(nextData.files.concat(json.data.files)),
          nextPageToken: json.data.nextPageToken
        });
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };
  const sortData = (e) => {
    const sorted = returnSorted(nextData.files, e.target.value);
      setNextData({
        ...nextData,
        files: sorted
      });
  }
  return (
    <div>
      <section className="controls">
        <fieldset>
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
      {nextData.files.map((file, i) => (
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
            { `Get 100 More : ${nextData.files.length}` }
          </button>
        </li>
      ))}
    </ul>
    </div>
  );
};

export default Grid;
