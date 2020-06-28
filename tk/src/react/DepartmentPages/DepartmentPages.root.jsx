import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import Department from './DepartmentPages.container';
import { configureStore } from '../utils/configureStore';
import * as deptReducers from './reducers';
import * as userReducers from '../PhillipsUser/reducers';
import setInitialState from './setInitialState';
import BuyNow from './BuyNow.container';
import Highlights from './Highlights.container';
import DeptHero from './DeptHero';

const DepartmentPages = ({ department, userJSON }) => {
  const store = configureStore(
    {
      ...deptReducers,
      ...userReducers
    },
    setInitialState({ department, userJSON })
  );
  return (
    <Provider store={store}>
      <Department
        BuyNow={BuyNow}
        Hero={DeptHero}
        Highlights={Highlights}
      />
    </Provider>
  );
};

DepartmentPages.defaultProps = {
  userJSON: '{}',
  editable: false
};

DepartmentPages.propTypes = {
  userJSON: PropTypes.string,
  departmentName: PropTypes.string,
  department: PropTypes.shape(PropTypes.object).isRequired,
  DeptBanner: PropTypes.element.isRequired,
  editable: PropTypes.bool
};

export { DepartmentPages };
