import React from 'react';

const Panel = props => (
  <li>
    <button
      onClick={() => { console.log('file',  file);}}
    >
      Get File info
    </button>
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
);

export default Panel;