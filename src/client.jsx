
import React from 'react';
import { hydrate } from 'react-dom';
import Grid from './Grid';

(function ({ data = []}) {
  
  hydrate(
    (<div>
      <a href="/">Drive</a>
      <a href="/list">List</a>
      <Grid data={data} />
    </div>),
    document.querySelector('#app')
  );
}(window.__client));
