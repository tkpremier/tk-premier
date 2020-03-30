const React = require('react');
const ReactDOMServer = require('react-dom/server');
import Main from './Main';

export default function ssr(props) {
  return ReactDOMServer.renderToString(<Main />);
}
