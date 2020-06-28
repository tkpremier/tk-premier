import PropTypes from 'prop-types';
import { StaticRouter, BrowserRouter, Route } from 'react-router-dom';

const { createBrowserHistory } = require('history');

const SearchPage = () => (
  <StaticRouter basename="/search">
    <Route path="/:query/:type?" component={AppCont} />
  </StaticRouter>
);

const SearchPageClient = (props) => {
  const history = createBrowserHistory();
  return (
    <BrowserRouter basename="/search" history={history}>
      <Route
        path="/:query/:type?"
        render={rteProps => (<AppCont {...rteProps} />)}
      />
    </BrowserRouter>
  );
};

SearchPage.propTypes = {
  searchQuery: PropTypes.string.isRequired
};

export { SearchPage, SearchPageClient };
