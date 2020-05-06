const React = require('react');
const ReactDOMServer = require('react-dom/server');
import Grid from './Grid';
import Main from './Main';
import ModelRoot from './Models';
class ServerFactory {
  constructor() {
    this.getSsr = this.getSsr.bind(this);
    this.Grid = Grid;
    this.Main = Main;
    this.ModelRoot = ModelRoot;
  }
  getSsr(str = 'Main', props = {}) {
    const Component = this[str];
    return ReactDOMServer.renderToString(<Component {...props} />);
  }
}

export default ServerFactory;
