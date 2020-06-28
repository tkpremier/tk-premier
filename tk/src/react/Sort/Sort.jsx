import React from 'react';

const SortNav = ({
  deviceType,
  handleSort,
  sortOptions,
  filter,
  sort,
  type
}) => {
  return (
    <nav className={`sortnav sortnav--${deviceType}`}>
      Sort by&nbsp;&nbsp;
      <select
        className="sortnav__select"
        onChange={handleSort}
        data-type={type}
        data-filter={filter}
        defaultValue={sort}
      >
        {sortOptions.map(opt => (
          <option
            key={ `sortnav__select__option__${opt.value}`}
            value={opt.value}
          >
            {opt.label}
          </option>
        ))}
      </select>
    </nav>
  )
};

export default SortNav;
