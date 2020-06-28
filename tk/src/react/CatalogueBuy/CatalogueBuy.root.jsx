import React, { Component, createContext } from 'react';
import {
  Route, useHistory, useLocation, StaticRouter
} from 'react-router-dom';
import PhillipsModal from '../PhillipsModal/PhillipsModal';
import Sidebar from './components/sidebar';
import CatalogueItem from './components/catalogueItem';
import CatalogueBuyFilter from './components/cataloguebuyfilters';
import CatalogueSort from './components/cataloguesort';
import BuyFilters from './components/buyfilter';
import {
  filterByDepartment, filterByLocation, filterByYear, selectedFilterParams
} from './functions/functionIndex';

export const CatalogueBuyContext = createContext();

class CatalogueBuy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCatalogues: props.data,
      filterParams: [],
      sortByNew: true,
      filterObject: [],
      cartIsOpen: false,
      modalChildren: null
    };

    this.hideModal = this.hideModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.sortByNew = this.sortByNew.bind(this);
    this.addFilter = this.addFilter.bind(this);
  }


  hideModal() {
    this.setState({ cartIsOpen: false });
  }

  openModal(child) {
    this.setState({ cartIsOpen: true, modalChildren: child });
  }

  sortByNew(bool) {
    console.log('INSIDE THE SORT', bool);
    if (bool) {
      this.setState({ sortByNew: true });
    } else this.setState({ sortByNew: false });
  }

  addFilter(filter) {
    console.log('ADD FILTER', filter);
    if (filter.filterCategory === 'Years') {
      const newFilteredCatalogues = filterByYear(this.state.filteredCatalogues, filter.filterValue);
      console.log('NEW FILTER ', newFilteredCatalogues);

      this.setState({ filteredCatalogues: newFilteredCatalogues });
    }
    if (filter.filterCategory === 'Departments') {
      const newFilteredCatalogues = filterByDepartment(this.state.filteredCatalogues, filter.filterValue);
      this.setState({ filteredCatalogues: newFilteredCatalogues });
    }
    if (filter.filterCategory === 'Locations') {
      const newFilteredCatalogues = filterByLocation(this.state.filteredCatalogues, filter.filterValue);
      this.setState({ filteredCatalogues: newFilteredCatalogues });
    }
    const newFilterParams = selectedFilterParams(filter, this.state.filterParams);
    console.log(newFilterParams);
    this.setState({ filterParams: newFilterParams });
    // this.setState({ filterParams: [...this.state.filterParams, filter] });
  }

  removeFilter(filter) {
    if (filter.filterCategory === 'Years') {
      const newFilteredCatalogues = filterByYear(this.state.filteredCatalogues, filter.filterValue);
      console.log('NEW FILTER ', newFilteredCatalogues);

      this.setState({ filteredCatalogues: newFilteredCatalogues });
    }
    if (filter.filterCategory === 'Departments') {
      const newFilteredCatalogues = filterByDepartment(this.state.filteredCatalogues, filter.filterValue);
      this.setState({ filteredCatalogues: newFilteredCatalogues });
    }
    if (filter.filterCategory === 'Locations') {
      const newFilteredCatalogues = filterByLocation(this.state.filteredCatalogues, filter.filterValue);
      this.setState({ filteredCatalogues: newFilteredCatalogues });
    }
  }

  createFilters(data) {
    const years = Object.values(data.reduce((acc, obj) => {
      if (!acc[obj.startDate.slice(0, 4)]) acc[obj.startDate.slice(0, 4)] = obj.startDate.slice(0, 4);
      return acc;
    }, {})).sort((a, b) => b - a).map(filter => ({ filterValue: filter, isSelected: false }));

    const departments = Object.values(data.reduce((acc, obj) => {
      if (!acc[obj.departmentName.toLowerCase()]) acc[obj.departmentName.toLowerCase()] = obj.departmentName;
      return acc;
    }, {})).sort().map(filter => ({ filterValue: filter, isSelected: false }));

    const locations = Object.values(data.reduce((acc, obj) => {
      if (!acc[obj.locationName.toLowerCase()]) acc[obj.locationName.toLowerCase()] = obj.locationName;
      return acc;
    }, {})).sort().map(filter => ({ filterValue: filter, isSelected: false }));
    return [
      { categoryName: 'Years', categoryValues: years },
      { categoryName: 'Departments', categoryValues: departments },
      { categoryName: 'Locations', categoryValues: departments }
    ];
  }

  componentDidMount() {
    this.setState({ filterObject: this.createFilters(this.props.data) });
  }

  render() {
    const { storeForm, data } = this.props;
    const html = (<iframe src={storeForm} />);
    return (
      <CatalogueBuyContext.Provider value={{
        openModal: this.openModal, state: this.state, data: data, sortByNew: this.sortByNew, addFilter: this.addFilter, storeForm: this.props.storeForm
      }}
      >
        <div className="main-container">
          <div
            className="container content-area has-left-aside"
            id="buy-catalogues-page"
          >
            <div className="row">
              <aside className="left col-xs-12 col-md-3" id="primaryAside">
                <h2 className="page-title col-xs-12 hidden-md">Catalogues</h2>
                <section className="needs-js row">
                  <BuyFilters data={data} />
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
                  <button onClick={() => this.openModal(html)} className="button large cart col-xs-12" id="my-cart-modal">
My Cart
                    <i className="cart" />

                  </button>
                </section>
                <section className="back-to-top-section">
                  <button className="back-to-top">Back to top</button>
                </section>
              </aside>
              <div className="content-body col-xs-12 col-md-9">
                <header className="page-header row space-btwn">
                  <nav className="sort-nav">
                    <h2 className="page-title visible-md col-md-4">Catalogues</h2>

                    <div
                      id="sort-backbone-md"
                      className="col-xs-12 visible-md col-md-4 needs-js sort-backbone"
                    >
Sort By:
                      <CatalogueSort />
                      {/* Sort by:
                      {' '}
                      <select>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                      </select> */}
                    </div>
                  </nav>
                </header>
                {this.state.cartIsOpen ? (<PhillipsModal hideModal={this.hideModal}>{this.state.modalChildren}</PhillipsModal>) : null}

                <ul
                  className="standard-list bordered row"
                  id="main-list-backbone"
                  data-tpl="buy"
                >

                  <CatalogueItem data={this.state.filteredCatalogues} storeForm={storeForm} openModal={this.openModal} hideModal={this.hideModal} />

                </ul>
              </div>
            </div>
          </div>
        </div>
      </CatalogueBuyContext.Provider>

    );
  }
}
export { CatalogueBuy };
