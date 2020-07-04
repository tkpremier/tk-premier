import React from 'react';
import { hydrate } from 'react-dom';
import OpenSeadragon from 'openseadragon';
import { LotPage } from '../react/LotPage/LotPageClient.root';

(function () {
  window.OpenSeadragon = OpenSeadragon;
  hydrate(<LotPage />, document.querySelector('#app'));
})();
