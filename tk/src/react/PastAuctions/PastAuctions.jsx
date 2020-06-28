import React, { Component } from 'react';
import PastAuctionSideBar from './PastAuctionSideBar';
import PastAuctionItem from './PastAuctionItem';
import PastAuctionSort from './PastAuctionSort';
import { filterPastAuctions } from './functions/functionIndex';

// const PADumb = (props) => {
//   const [ state, dispatch ] = use
//   return (
//     <p>blah</p>
//   )
// }
class PastAuctionsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: props.urlQueries.sort,
      selectedFilters: {}
    };
  }

  render() {
    const { filteredPastSales, filterData, urlQueries } = this.props;
    return (
      <div className="main-container">
        <div
          className="container content-area has-left-aside"
          id="past-auctions-page"
        >
          <div className="row">
            <PastAuctionSideBar
              filterData={filterData}
              urlQueries={urlQueries}
            />
            <div className="content-body col-xs-12 col-md-9">
              <header className="page-header row space-btwn">
                <nav className="sort-nav">
                  <h2 className="page-title visible-md col-md-4">Past Auctions</h2>

                  <div
                    style={{ float: 'right' }}
                    id="sort-backbone-md"
                    className="col-xs-12 visible-md col-md-4 needs-js sort-backbone"
                  >
                    Sort By:
                    <PastAuctionSort />
                  </div>
                </nav>
              </header>
              <ul
                className="standard-list bordered row"
                id="main-list-backbone"
              >
                {filteredPastSales.map(item => <PastAuctionItem item={item} key={item.saleNumber} />)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PastAuctionsPage;
