import React, { Component } from 'react';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';
import PhillipsAccordion from '../../PhillipsAccordion/PhillipsAccordion';
import FilterItem from './filteritem';


class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const html = (<iframe src={this.props.storeForm} />);
    const {
      data, filterData, urlQueries, currentCatalogues
    } = this.props;

    return (
      <aside className="left col-xs-12 col-md-3" id="primaryAside">
        <h2 className="page-title col-xs-12 hidden-md">Catalogues</h2>
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

              {filterData.filterDims.map(item => (
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
        </section>
        <section className="row">
          <ul className="short-list col-xs-12">
            <li className="contact expandable info closed">
              <a href="#" className="toggle">
                      CONTACT
              </a>
              <div className="panel hide">
                <p>Catalogues</p>
                <p>
                  <a href="mailto:catalogues@phillips.com">
                          catalogues@phillips.com
                  </a>
                </p>
                <p>New York +1 212 940 1200</p>
                <p>London +44 20 7318 4010</p>
              </div>
            </li>
          </ul>
        </section>
        <section className="row">
          <button onClick={() => openModal(html)} className="button large cart col-xs-12" id="my-cart-modal">
My Cart
            <i className="cart" />
          </button>
        </section>
        <section className="back-to-top-section">
          <button className="back-to-top">Back to top</button>
        </section>
      </aside>
    );
  }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps, null)(Sidebar);
