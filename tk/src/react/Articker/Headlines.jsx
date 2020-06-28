import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { headline } from './proptypes';

const Headlines = ({ headlines }) => (
  <ul className="articker__headlines">
    {headlines.map(({ articleDate, title, link, source }) => (
      <li className="articker__headline">
        <p className="articker__headline__eyebrow">{`${format(new Date(articleDate), 'd LLLL yyyy')} | ${source} `}</p>
        <a className="articker__headline__link" href={link} target="_blank" rel="noopener noreferrer">{title}</a>
      </li>
    ))}
  </ul>
);

Headlines.defaultProps = {
  headlines: []
};

Headlines.propTypes = {
  headlines: PropTypes.arrayOf(headline)
};

export default Headlines;
