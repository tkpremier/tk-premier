import React from 'react';
import { Provider } from 'react-redux';
import ConsignmentForm from '../Consignments/ConsignmentForm';
import createInitialUserState from '../PhillipsUser/createInitialUserState';
import { configureStore } from '../utils/configureStore';
import { user, userForm } from '../PhillipsUser/reducers';
import * as consignReducers from '../Consignments/reducers';

const PrivateSales = ({
  apiUrl,
  countries,
  language,
  mediums,
  userJSON
}) => {
  const { user: userState, userForm: userFormState } = createInitialUserState(JSON.parse(userJSON));
  const store = configureStore(
    { ...consignReducers, user, userForm },
    {
      user: userState,
      userForm: userFormState,
      makers: [],
      makersFetched: false,
      selectedMaker: {
        makerId: null,
        makerName: ''
      },
      language: language
    }
  );
  return (
    <Provider store={store}>
      <ConsignmentForm
        apiUrl={apiUrl}
        countries={countries}
        language={language}
        mediums={mediums}
        formTitle="Submit a consignment"
        isPrivate
      />
    </Provider>
  );
};

export { PrivateSales };
