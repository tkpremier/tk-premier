const React = require('react');
const ReactDOMServer = require('react-dom/server');
import Main from './Main';
import Grid from './Grid';

class ServerFactory {
  constructor() {
    this.Main = Main;
    this.Grid = Grid;
    this.getSsr = this.getSsr.bind(this);
  }
  getSsr(str = 'Main', props = {}) {
    const Component = this[str];
    return ReactDOMServer.renderToString(<Component {...props} />);
  }
}

export default ServerFactory;
