import React from 'react';
import { find } from 'lodash/fp';

const selectOptions = [
  {
    label: 'Auction Date',
    value: 'eventDate'
  },
  {
    label: 'Artist',
    value: 'makerName'
  },
  {
    label: 'Title',
    value: 'description'
  }
];

const handleSelectChange = ({ filter, saleNumber, saleNumbers }, sortBy, e) => {
  let type = 'ROUTES_SORT';
  if (saleNumber.length > 0) {
    if (filter.length > 0) {
      type = 'ROUTES_SALENUMBERFILTERSORT';
    } else {
      type = 'ROUTES_SALENUMBERSORT';
    }
  }
  const options = [
    {
      type,
      label: 'Auction Date',
      payload: {
        filter,
        saleNumber,
        saleNumbers,
        sort: 'eventDate'
      }
    },
    {
      type,
      label: 'Artist',
      payload: {
        filter,
        saleNumber,
        saleNumbers,
        sort: 'makerName'
      }
    },
    {
      type,
      label: 'Title',
      payload: {
        filter,
        saleNumber,
        saleNumbers,
        sort: 'description'
      }
    }
  ];
  const selectedOption = find(opt => opt.payload.sort === e.target.value)(options);
  return sortBy(selectedOption);
}

const SortNav = ({ deviceType, sortBy, urlQueries }) => {
  return (
    <nav className={`sortnav sortnav--${deviceType}`}>
      Sort by&nbsp;&nbsp;
      <select
        className="sortnav__select"
        onChange={handleSelectChange.bind(null, urlQueries, sortBy)}
      >
        {selectOptions.map(opt => (
          <option
            value={opt.value}
            selected={opt.value === urlQueries.sort}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </nav>
  )
};

export default SortNav;
