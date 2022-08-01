import React from 'react';
import { hydrate } from 'react-dom';
import Main from './Main';

interface TKWindow extends Window {
  __client: string;
  __cType: string;
}

declare let window: TKWindow;

(function (clientData = '[]', componentType = 'Main'): any {
  class ComponentFactory {
    Main: (props: any) => any;
    constructor() {
      this.hydrate = this.hydrate.bind(this);
      this.Main = Main;
    }
    hydrate(str = 'Main', props = {}) {
      const Component = this[str];
      console.log('hello');
      hydrate(<Component {...props} />, document.querySelector('#app'));
    }
  }
  const compFactory = new ComponentFactory();
  compFactory.hydrate(componentType, JSON.parse(clientData));
})(window.__client, window.__cType);
