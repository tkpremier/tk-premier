import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { getFlocklerEditorials, getEditorialById } from '../../../services/FlocklerService';
import App from './App';
import { defaultEditorialProps } from '../../PropTypes/proptypes';

const Root = () => {
  const [initialData, setInitialData] = useState({
    data: [],
    selectedEditorial: defaultEditorialProps
  });
  const [hasError, setError] = useState(false);
  useEffect(() => {
    getFlocklerEditorials()
      .then((eds) => {
        // const { flocklerId } = eds[0];
        setInitialData({
          data: eds,
          selectedEditorial: eds[0]
        });
        // getEditorialById(flocklerId)
        //   .then(ed => setInitialData({
        //     data: eds,
        //     selectedEditorial: ed
        //   }))
        //   .catch((err) => {
        //     console.log('getEditorialById err: ', err);
        //     setError(true);
        //   });
      })
      .catch((err) => {
        console.log('getFlocklerEditorials err: ', err);
        setError(true);
      });
  }, []);
  const { data, selectedEditorial } = initialData;
  return hasError
    ? (
      <p>There was an error fetching data.  Please try again in a few moments.</p>
    )
    : data.length > 0
      ? <App data={data} selectedEditorial={selectedEditorial} />
      : <p>Fetching that sweet sweet data</p>;
}

ReactDOM.render(
  <Root />,
  document.getElementById('flockler-mgmt-console')
);
