import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

const AuctionRow = (props) => {
  return (
    <div>
      &nbsp;
    </div>
  );
};

export default class RelevantAuctions extends Component {
  state = {

  }

  render() {
    // console.log('RelevantAuctions render() with props: ', this.props)

    return (
      <div>
        <h4>Upcoming Auctions</h4>
        <div className="auction-row">
          <AuctionRow />
        </div>
        <br />
        <h4>Recent Auctions</h4>
        <div className="auction-row">
          <AuctionRow />
        </div>
      </div>
    );
  }
}

// RelevantAuctions.defaultProps = {
//   auctions: []
// }

// RelevantAuctions.propTypes = {
//
// }
