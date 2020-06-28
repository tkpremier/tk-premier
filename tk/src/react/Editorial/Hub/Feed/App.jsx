import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Link from 'redux-first-router-link';
import Links from './Links';
import { Placeholder, PlaceholderWithTracker } from './Placeholder';
import { useMqlMobile } from '../../../hooks/useMql';
import * as editorialHubReducers from './reducers';
import filterData from '../../../PhillipsFilter/reducers';
import { sortOptions } from '../../../Sort/reducers';
import { configureStoreWithRouter } from '../../../utils/configureStore';
import getInitialState from './initialState';
import routes from './routesMap';
import fetchFeedData from './fetchFeedData';

const Layout = lazy(() => import(/* webpackChunkName: "editorial-hub-feed" */ './Layout'));

const EditorialHubFeed = () => {
  const [appInitialized, fetchData] = useState(false);
  const [data, setData] = useState([]);
  const isMobile = useMqlMobile();
  useEffect(() => {
    if (appInitialized && data.length === 0) {
      fetchFeedData()
        .then(res => setData(res))
        .catch(err => console.log('err: ', err));
    }
  }, [appInitialized, data]);
  const store = configureStoreWithRouter(
    {
      ...editorialHubReducers,
      filterData,
      sortOptions
    },
    getInitialState(data, window.location.pathname, isMobile),
    routes,
    {
      basename: '/editorial'
    }
  );
  useEffect(() => {
    let currentState;
    const handleSubscribe = () => {
      const { headerNavClicked } = store.getState();
      const nextState = headerNavClicked;
      if (nextState !== currentState) {
        currentState = nextState;
        fetchData(nextState);
      }
    };
    const unsubscribe = store.subscribe(handleSubscribe);
    return unsubscribe;
  });
  return (
    <Provider store={store}>
      {appInitialized && data.length > 0
        ? (
          <Suspense fallback={<Placeholder />}>
            <Layout isMobile={isMobile} />
          </Suspense>
        )
        : <PlaceholderWithTracker onEnter={() => fetchData(true)} />
      }
      <Links>
        <Link
          className="editorial-hub__h1__a"
          onClick={() => window.scrollTo(0, document.body.scrollHeight)}
          to={{ type: 'ROUTES_INIT' }}
        >
          Articles & Video
        </Link>
        <a
          className="editorial-hub__h1__a editorial-hub__h1__a--last"
          href="https://instagram.com/phillipsauction"
          title="Phillips (@phillipsauction) - Instagram"
        >
          Instagram
        </a>
      </Links>
    </Provider>
  );
};

export default EditorialHubFeed;
