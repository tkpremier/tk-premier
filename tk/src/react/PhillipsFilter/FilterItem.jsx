import React from 'react';
import Link from 'redux-first-router-link';
import classNames from 'classnames';
import PhillipsCheckbox from '../PhillipsCheckbox/PhillipsCheckbox';
import { filterItemDefaultProps, filterItemPropTypes } from './proptypes';

const FilterItem = ({ filter, hide, label, sort, status, type, payload }) => (
  <li
    className={classNames('sortfilter__filter-list__item', {
      'sortfilter__filter-list__item--hide': hide
    })}
    key={`${label}`}
  >
    {status === 'disabled'
      ? (
        <PhillipsCheckbox
          label={label}
          isChecked={status === 'active'}
          disabled={status === 'disabled'}
          arg={payload}
        />
      )
      : (
        <Link
          className="sortfilter__filter-list__item__a"
          to={{
            type,
            payload: {
              ...payload,
              filter,
              sort
            }
          }}
        >
          <PhillipsCheckbox
            label={label}
            isChecked={status === 'active'}
            disabled={status === 'disabled'}
            arg={{ ...payload, filter, sort }}
          />
        </Link>
      )
    }
  </li>
);

FilterItem.defaultProps = filterItemDefaultProps;

FilterItem.propTypes = filterItemPropTypes;

export default FilterItem;
