import 'fetch-ponyfill';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import HomePageEditor from './HomePageEditor';
import HomePageContainer from '../../HomePage/HomePage.container';
import reducer from '../../reducers/homepageCMS';
import { setMakersList } from '../../actions/actions';

class HomePageCMS extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    const initialState = {
      currentHeroIndex: 0,
      editable: props.editable,
      elements: { ...props.data },
      loaded: true,
      makersList: [],
      modal: {
        type: 'add',
        visible: false,
        isRequestPending: false,
        elementType: 'default',
        response: {
          status: 200,
          message: ''
        }
      },
      selectedElement: null
    };
    this.store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
  }

  static getDerivedStateFromError(error) {
    console.log('errors: ', error);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidMount() {
    const apiDomain = document.getElementsByTagName('body')[0].dataset.apidomain;
    fetch(`${apiDomain}/lookup/makers`)
      .then(response => response.json())
      .then(({ makers }) => {
        this.store.dispatch(setMakersList(makers));
      })
      .catch((err) => {
        console.log('err: ', err);
        this.store.dispatch(setMakersList([]));
      });
  }

  render() {
    const { hasError } = this.state;
    return hasError
      ? (
        <section className="homepage" id="homepage">
          There was an error rendering the page.  Please check the console for more information.
        </section>
      )
      : (
        <Provider store={this.store}>
          <HomePageEditor>
            <HomePageContainer editable />
          </HomePageEditor>
        </Provider>
      );
  }
}

HomePageCMS.propTypes = {
  data: PropTypes.shape().isRequired,
  editable: PropTypes.bool.isRequired
};

export { HomePageCMS };
