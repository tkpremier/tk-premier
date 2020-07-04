import React from 'react';
import { hydrate } from 'react-dom';
import { HomePage } from '../react/HomePage/HomePage.root';

(function () {
  hydrate(<HomePage />, document.querySelector('#app'));
})();
