import React from 'react';
import Link from 'redux-first-router-link';
// import Expandable from '../Expandable/Expandable';
import FilterItem from './FilterItem';
import ScrollButton from '../ScrollToTopButton/ScrollToTopButton';
import PhillipsAccordion from '../PhillipsAccordion/PhillipsAccordion';


const SideBar = (props) => {
  const { filterData, urlQueries } = props;

  return (

    <aside className="left col-xs-12 col-md-3" id="primaryAside">
      <h2 className="page-title col-xs-12 hidden-md">Exhibitions</h2>
      <section className="needs-js row">
        <ul id="filter-backbone" className="filter short-list col-xs-6 col-md-12">
          <li className="header closed" key="filter-list">
            <a href="#" className="toggle">
          Filter
            </a>
            {urlQueries.filter && urlQueries.filter.length > 0 ? (
              <Link className="clearall" style={{ display: 'block' }} to="#">
            (clear all)
              </Link>
            ) : null}
            {filterData.map(item => (
              <ul className="filter-list " key={item.categoryName}>
                <PhillipsAccordion className="exhibitions" title={item.categoryName} expanded={urlQueries.filter.includes(item.categoryName)} key={item.categoryName}>
                  <ul>
                    {item.categoryValues.map(filter => (
                      <FilterItem filterName={filter.filterValue} filterCat={item.categoryName} key={filter.filterValue} />
                    ))}
                  </ul>
                </PhillipsAccordion>
              </ul>
            ))}
          </li>
        </ul>
        <ScrollButton />
      </section>
    </aside>
  );
};

export default SideBar;
