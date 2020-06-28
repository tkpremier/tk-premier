import React from 'react';
import PropTypes from 'prop-types';
import PhillipsShowMore from '../../PhillipsShowMore/PhillipsShowMore';
import setLineBreaks from '../../../utils/setLineBreaks';

export const LotEssay = (props) => {
  const { essay } = props;
  return (
    <li className="lot-page__details__list__item lot-page__details__list__item--essay">
      <PhillipsShowMore buttonText="Read More">
        <div className="essay-container">
          <h4 className="lot-page__details__list__item__header">Catalogue Essay</h4>
          <div className="lot-essay">
            <p dangerouslySetInnerHTML={{ __html: setLineBreaks(essay) }} />
          </div>
        </div>
      </PhillipsShowMore>
    </li>
  );
};

LotEssay.defaultProps = {
  name: ''
};

LotEssay.propTypes = {
  essay: PropTypes.string.isRequired,
  name: PropTypes.string
};


const LotDetailItem = (props) => {
  const { className, header, name, value } = props;
  return (
    <li name={`${name}-stickyNav`} className={`lot-page__details__list__item ${className}`}>
      <h4 className="lot-page__details__list__item__header">{header}</h4>
      <p
        className="lot-page__details__list__item__value"
        dangerouslySetInnerHTML={{ __html: setLineBreaks(value) }}
      />
    </li>
  );
};

LotDetailItem.defaultProps = {
  className: '',
  name: ''
};

LotDetailItem.propTypes = {
  className: PropTypes.string,
  header: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired
};

export default LotDetailItem;
