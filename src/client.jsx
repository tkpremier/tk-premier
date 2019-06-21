
import React from 'react';
import { hydrate } from 'react-dom';
import Grid from './Grid';

(function (props) {
  hydrate(
    <Grid data={props.data} />,
    document.querySelector('#app')
  );
}(window.__client));
