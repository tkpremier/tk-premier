import React from 'react';
import PropTypes from 'prop-types';
import Editorial from './Editorial';
import { makerEditorialPropType } from '../PropTypes/proptypes';

const Editorials = ({ makerEditorials, env }) => {
  return (
    <div className="row" id="editorials-list">
      <h3>Explore Editorials</h3>
      {makerEditorials.map(item =>
        (<Editorial
          {...item}
          key={item.editorial.flocklerId}
          env={env}
        />)
      )}
    </div>
  );
};

Editorials.propTypes = {
  makerEditorials: PropTypes.arrayOf(PropTypes.shape(makerEditorialPropType)).isRequired,
  env: PropTypes.string.isRequired
}

export default Editorials;
