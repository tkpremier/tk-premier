import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Department from './DepartmentPages.container';
import { configureStore } from '../utils/configureStore';
import HeroEditor from './Editors/HeroEditor.container';
import BuyNowEditor from './Editors/BuyNowEditor.container';
import * as deptReducers from './reducers';
import * as cmsReducers from './reducers.cms';
import setInitialState from './setInitialState';
import HighlightsEditorContainer from './Editors/HighlightsEditor.container';

const CMSDepartments = ({ department, editable, userJSON }) => {
  const store = configureStore(
    { ...deptReducers, ...cmsReducers },
    setInitialState({ editable, department, userJSON })
  );
  return (
    <Provider store={store}>
      <Department
        {...department}
        BuyNow={BuyNowEditor}
        Hero={HeroEditor}
        Highlights={HighlightsEditorContainer}
        editable
      />
    </Provider>
  );
};


CMSDepartments.propTypes = {
  department: PropTypes.shape(PropTypes.object).isRequired,
  editable: PropTypes.bool.isRequired,
  userJSON: PropTypes.string.isRequired
};

export { CMSDepartments };
