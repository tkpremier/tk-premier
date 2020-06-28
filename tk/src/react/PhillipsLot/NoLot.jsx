/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const NoLot = ({
  className,
  isWatch,
  lotNumberFull,
  showBidButton,
  showLotNumber,
  saleTypeId
}) => (
    <div
      className={classNames(
        'phillips-lot',
        className,
        {
          'widget-enabled': showBidButton,
          'phillips-lot--buy-now': saleTypeId === 5
        }
      )}
    >
      <div className={classNames('phillips-lot__description phillips-lot__description--no-lot',
        {
          'phillips-lot__description--is-watch': isWatch,
          'phillips-lot__description--buy-now': saleTypeId === 5
        })}
      >
        {showLotNumber
          ? (
            <span className={classNames('phillips-lot__description__lot-number-wrapper', { 'phillips-lot__description__lot-number-wrapper--pos-abs': !showLotNumber })}>
              <p className="phillips-lot__lot-number">{lotNumberFull.trim()}</p>
            </span>
          )
          : null
        }
        <p>This lot is no longer available.</p>
      </div>
    </div>
  );


NoLot.defaultProps = {
  className: '',
  isWatch: false,
  lotNumberFull: '',
  showBidButton: false,
  showLotNumber: true,
  saleTypeId: 1
};
NoLot.propTypes = {
  className: PropTypes.string,
  isWatch: PropTypes.bool,
  lotNumberFull: PropTypes.string,
  showBidButton: PropTypes.bool,
  showLotNumber: PropTypes.bool,
  saleTypeId: PropTypes.number
};

export default NoLot;
