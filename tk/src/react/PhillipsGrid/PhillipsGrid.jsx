import React, { Component } from 'react';
import PropTypes from 'prop-types';

const GridItem = ({ columns, children, className }) => {
  const { xs, sm, md, lg } = columns;
  return (
    <li className={`phillips-grid-item col-xs-${xs} col-sm-${sm} col-md-${md} col-lg-${lg} ${className}`}>
      {children}
    </li>
  );
};

GridItem.defaultProps = {
  className: '',
  columns: {
    lg: 3,
    md: 4,
    sm: 6,
    xs: 12
  }
};

GridItem.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.shape({
    lg: PropTypes.number,
    md: PropTypes.number,
    sm: PropTypes.number,
    xs: PropTypes.number
  }),
  children: PropTypes.element.isRequired
};

const PhillipsGrid = ({ children, classNames, columns }) => (
  <ul className={`phillips-grid ${classNames}`}>
    {children.map(child => (
      <GridItem
        className={child.props.className}
        columns={columns}
        key={child.key}
      >
        {child}
      </GridItem>
    ))}
  </ul>
);

PhillipsGrid.defaultProps = {
  classNames: '',
  columns: {
    lg: 3,
    md: 4,
    sm: 6,
    xs: 12
  },
  itemsShown: 4,
  end: false
};

PhillipsGrid.propTypes = {
  classNames: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  columns: PropTypes.shape({
    large: PropTypes.number,
    medium: PropTypes.number,
    small: PropTypes.number
  }),
  maxShown: PropTypes.number,
  concat: PropTypes.bool,
  itemsShown: PropTypes.number,
  end: PropTypes.bool,
};

export default PhillipsGrid;
