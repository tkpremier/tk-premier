import React, { Component } from 'react';
import CatalogueItem from './catalogueItem';
import CatalogueSort from './cataloguesort';
import SideBar from './sidebar';
import PhillipsModal from '../../PhillipsModal/PhillipsModal';
import { createFilteredItems, parseFilterQuery } from '../functions/functionIndex';


class CatalogueBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartIsOpen: false,
      filteredCatalogues: [],
      sortBy: 'newest',
      selectedFilters: {}
    };

    this.hideModal = this.hideModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
  }


  hideModal() {
    this.setState({ cartIsOpen: false });
  }

  openModal(child) {
    this.setState({ cartIsOpen: true, modalChildren: child });
  }

  updateFilters(filterArray) {
    this.setState({ filteredCatalogues: filterArray });
    filterArray.preventDefault();
  }

  render() {
    const { data, urlQueries, filterData } = this.props;
    let newFilteredCatalogues = this.props.data;
    if (urlQueries.filter) {
      const parsedFilterQuery = parseFilterQuery(urlQueries.filter);
      newFilteredCatalogues = createFilteredItems(data, parsedFilterQuery);
    }
    if (urlQueries.sort) {
      const { sort } = urlQueries;

      if (sort === 'newest') {
        newFilteredCatalogues = newFilteredCatalogues.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      } else {
        newFilteredCatalogues = newFilteredCatalogues.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      }
    }
    return (

      <div className="main-container">
        <div
          className="container content-area has-left-aside"
          id="buy-catalogues-page"
        >
          <div className="row">
            <SideBar openModal={this.openModal} createUrl={this.createUrl} currentCatalogues={newFilteredCatalogues} urlQueries={urlQueries} filterData={filterData} />
            <div className="content-body col-xs-12 col-md-9">
              <header className="page-header row space-btwn">
                <nav className="sort-nav">
                  <h2 className="page-title visible-md col-md-4">Catalogues</h2>
                  <div
                    style={{ float: 'right' }}
                    id="sort-backbone-md"
                    className="col-xs-12 visible-md col-md-4 needs-js sort-backbone"
                  >
    Sort By:
                    <CatalogueSort />

                  </div>
                </nav>
              </header>
              {this.state.cartIsOpen ? (<PhillipsModal hideModal={this.hideModal}>{this.state.modalChildren}</PhillipsModal>) : null}
              <ul
                className="standard-list bordered row"
                id="main-list-backbone"
                data-tpl="buy"
              >
                {newFilteredCatalogues.map(item => <CatalogueItem currentCatalogues={newFilteredCatalogues} image={item.catalogueCoverImage} item={item} storeForm={this.props.storeForm} openModal={this.openModal} />)}
              </ul>
            </div>
          </div>
        </div>
      </div>

    );
  }
}


export default CatalogueBuy;
