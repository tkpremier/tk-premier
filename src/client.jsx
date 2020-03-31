import React from 'react';
import { hydrate } from 'react-dom';
import Main from './Main';
import Grid from './Grid';

(function (clientData = '[]', componentType = 'Main') {
  class ComponentFactory {
    constructor() {
      this.Main = Main;
      this.Grid = Grid;
      this.hydrate = this.hydrate.bind(this);
    }
    hydrate(str = 'Main', props = {}) {
      const Component = this[str];
      console.log('hydrate props: ', props);
      hydrate(<Component {...props} />, document.querySelector('#app'));
    }
  }
  const compFactory = new ComponentFactory();
  compFactory.hydrate(componentType, JSON.parse(clientData));
})(window.__client, window.__cType);
