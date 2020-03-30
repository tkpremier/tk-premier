import React from 'react';
import { hydrate } from 'react-dom';
import Main from './Main';

(function(data = '[]') {
  hydrate(<Main />, document.querySelector('#app'));
})(window.__client);
