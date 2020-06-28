// This component will handle currnet active filters and handle clearing all filters
import React from 'react';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import FilterCategories from './filtercategories';
import FilterItems from './filteritem';


const BuyFilters = (props) => {
  const { filterData } = props.state;
  const { urlQueries } = props.state;
  return (
    <ul
      id="filter-backbone"
      className="filter short-list col-xs-6 col-md-12"
    >
      <li className="header expandable closed">
        <a href="#" className="toggle">
                Filter
        </a>
        {urlQueries.filter ? (
          <Link className="clearall" style={{ display: 'block' }} to="#">
         (clear all)
          </Link>
        ) : (
          <a className="clearall" href="#">
                (clear all)
          </a>
        )}
        {filterData.filterDims.map(item => (
          <ul className="filter-list ">
            <li className="expandable closed">

              <FilterCategories categoryName={item.categoryName} />
              <ul className="panel hide">
                <li className="loading">
                  {item.categoryValues.map(filter => (
                    <FilterItems filterName={filter.filterValue} filterCat={item.categoryName} currentCatalogues={props.currentCatalogues} />
                  ))}
                </li>
              </ul>
            </li>
          </ul>
        ))}
      </li>
    </ul>
  );
};
const mapStateToProps = state => ({ state });

export default connect(mapStateToProps, null)(BuyFilters);
