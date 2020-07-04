import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../utils/configureStore';
import createInitialUserState from '../PhillipsUser/createInitialUserState';
import * as homePageReducers from './reducers';
import * as userReducers from '../PhillipsUser/reducers';
import HomePageContainer from './HomePage.container';
import home from '../../../mock/home.json';

const initialState = props => {
  return {
    elements: props
  };
};

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log('errors: ', error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const store = configureStore(
      {
        ...homePageReducers,
        ...userReducers
      },
      initialState(home)
    );
    return hasError ? (
      <section className="homepage" id="homepage">
        There was an error rendering the page. Please check the console for more information.
      </section>
    ) : (
      <Provider store={store}>
        <HomePageContainer editable={false} />
      </Provider>
    );
  }
}

export { HomePage };
