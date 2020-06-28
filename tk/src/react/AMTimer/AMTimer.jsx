import React, { Component } from 'react';
import PropTypes from 'prop-types';
import has from 'lodash/has';

const getAmTimerHtml = auctionMobilityLotRowId => `<div class="lot-information col-xs-12" id="am-timer-${auctionMobilityLotRowId}" lot-id="${auctionMobilityLotRowId}"><div class="row"><am-timer class="col-xs-12"></am-timer></div>`;

class AmTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amTimerHtml: getAmTimerHtml(props.auctionMobilityLotRowId)
    };
  }

  componentDidMount() {
    if (typeof amw !== 'undefined' && this.props.saleTypeId === 3) {
      this.setAmTimer();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auctionMobilityLotRowId !== this.props.auctionMobilityLotRowId) {
      const amTimerHtml = getAmTimerHtml(nextProps.auctionMobilityLotRowId);
      this.setState({
        ...this.state,
        status: '',
        offer: 0,
        error: null,
        amTimerHtml
      });
    }
  }

  componentDidUpdate({ auctionMobilityLotRowId }) {
    if (
      auctionMobilityLotRowId !== this.props.auctionMobilityLotRowId &&
      has(window, 'amTimer')
    ) {
      this.setAmTimer();
    }
  }

  setAmTimer() {
    if (!has(window, 'amTimer')) {
      this.amTimerWrapper.innerHTML = this.state.amTimerHtml;
      const { AmWidget } = window.amw.default;
      window.amTimer = new AmWidget({
        auctionId: this.props.auctionMobilityAuctionRowId,
        url: 'https://stage-am-live.phillips.com/',
        wrapperPrefix: 'am-timer',
        // []
        lots: [this.props.auctionMobilityLotRowId]
      });
      window.amTimer.init();
    } else {
      // when changing from one lot to another
      this.amTimerWrapper.innerHTML = this.state.amTimerHtml;
      window.amTimer.loadLots([this.props.auctionMobilityLotRowId]);
    }
  }
  render() {
    return (
      <div
        className="am-bid-timer"
        ref={(el) => { this.amTimerWrapper = el; }}
      />
    );
  }
}

AmTimer.defaultProps = {
  auctionMobilityLotRowId: '0',
  auctionMobilityAuctionRowId: '0',
  saleTypeId: 1
}

AmTimer.propTypes = {
  auctionMobilityLotRowId: PropTypes.string,
  auctionMobilityAuctionRowId: PropTypes.string,
  saleTypeId: PropTypes.number
}

export default AmTimer;
