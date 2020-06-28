import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CuratedToggle from '../CuratedView/CuratedToggle';

const goToLotPage = e => location.assign(e.target.value);

const AuctionPageSort = ({
  dropDownData,
  filter,
  filteredLotsCount,
  filterSort,
  saleNumber,
  saleTypeId,
  showCuratedViewToggle,
  sort
}) => {
  const saleType = saleTypeId === 1 ? 'auction' : 'exhibition';
  const handleSortChange = (e) => {
    const newSortQuery = e.target.value;
    filterSort(filter, newSortQuery, saleNumber, saleType);
  };
  return (
    <nav className="sort-nav">
      <div
        className={
          classNames('left col-xs-6 info', {
            'col-sm-4': !showCuratedViewToggle,
            'col-sm-2': showCuratedViewToggle
          })
        }
      >
        Showing <span>{filteredLotsCount} lots</span>
      </div>
      <div
        className={
          classNames('col-xs-6 selectLot', {
            'col-sm-4': !showCuratedViewToggle,
            'col-sm-3': showCuratedViewToggle
          })
        }
      >
        Show Lot
        <select
          onChange={goToLotPage}
          className="lot-number-dropdown site-wide-lot-navigation-dropdown"
        >
          {dropDownData.map(({ lotNumberFull, detailLink }) =>
            <option value={detailLink} key={`goto-lot-${lotNumberFull}`}>{lotNumberFull}</option>
          )}
        </select>
      </div>
      <div
        className={classNames('needs-js sort-backbone text-right')}
      >
        Sort By
        <select onChange={handleSortChange} defaultValue={sort}>
          <option value="lotNumber">Lot Number</option>
          <option value="makerName">Artist</option>
          {saleTypeId !== 2
            ? <option value="estimate-ascending">Price low - high</option>
            : null
          }
          {saleTypeId !== 2 ?
            <option value="estimate-descending">Price high - low</option> :
            null
          }
        </select>
      </div>
      {showCuratedViewToggle
        ? (
          <CuratedToggle />
        )
        : null
      }
    </nav>
  );
};

AuctionPageSort.defaultProps = {
  deviceType: {
    'isDesktop': true
  },
  dropDownData: [{
    'detailLink': '',
    'lotNumber': 0,
    'lotNumberFull': ''
  }],
  filter: '',
  saleNumber: '',
  saleTypeId: 1,
  sort: ''
};

AuctionPageSort.propTypes = {
  deviceType: PropTypes.shape({
    'isDesktop': PropTypes.bool
  }),
  dropDownData: PropTypes.arrayOf({
    'detailLink': PropTypes.string,
    'lotNumber': PropTypes.number,
    'lotNumberFull': PropTypes.string
  }),
  filteredLotsCount: PropTypes.number.isRequired,
  filter: PropTypes.string,
  filterSort: PropTypes.func.isRequired,
  saleNumber: PropTypes.string,
  saleTypeId: PropTypes.number,
  showCuratedViewToggle: PropTypes.bool.isRequired,
  sort: PropTypes.string
};

export default AuctionPageSort;
