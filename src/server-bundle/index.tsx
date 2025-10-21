import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Main} from '../Main';

class ServerFactory {
  Main: (props: any) => any;
  constructor() {
    this.getSsr = this.getSsr.bind(this);
  }
  getSsr(): any {
    return ReactDOMServer.renderToString(<Main />);
  }
}

export default ServerFactory;
