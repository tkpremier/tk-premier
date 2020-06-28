import React from 'react';
import { connect } from 'react-redux';
import SideBar from './SideBar';
import Sort from './Sort';
import ItemCard from './ItemCard';
import { filterItems } from './functionIndex';

const ExhibitionsPage = (props) => {
  const { data, filterData, urlQueries } = props;
  const newFilteredExhibitions = filterItems(data, urlQueries);

  return (
    <div className="main-container">
      <div className="container content-area has-left-aside" id="exhibitions-page">
        <div className="row">
          <SideBar urlQueries={urlQueries} filterData={filterData} />
          <div className="content-body col-xs-12 col-md-9">
            <header className="page-header row space-btwn">
              <nav className="sort-nav">
                <h2 className="page-title visible-md col-md-4">Exhibitions</h2>
                <div
                  style={{ float: 'right' }}
                  id="sort-backbone-md"
                  className="col-xs-12 visible-md col-md-4 needs-js sort-backbone"
                >
                    Sort by:
                  <Sort />
                </div>
              </nav>
            </header>
            <ul
              className="standard-list bordered row"
              id="main-list-backbone"
            >
              {newFilteredExhibitions.map(item => <ItemCard item={item} key={Math.random()} />)}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};
const mapStateToProps = state => state;

export default connect(mapStateToProps, null)(ExhibitionsPage);
