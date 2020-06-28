import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isUndefined, includes, find } from 'lodash/fp';
import LotList from './LotList';
import { saveLotList, saveLotToLotList } from '../PhillipsUser/actions';
import matchError from '../PhillipsUser/matchError';

const mapStateToProps = ({ favoriteLots, user, lotLists, error }, { lot, key }) => {
  const listErrorMatcher = matchError('LOT_LIST', ({ list }) => includes(lot)(list.lots));
  const listItemErrorMatcher = matchError('LOT_LIST_ITEM', ({ list }) => includes(lot)(list.lots));
  const listError = listErrorMatcher(error) ? error : null;
  const itemError = listItemErrorMatcher(error) ? error : null;
  const favoriteLotsInSale = find(sale => sale.saleNumber === lot.saleNumber)(favoriteLots);
  const isFavorited = includes(`${lot.lotNumberFull.trim()}`)(isUndefined(favoriteLotsInSale) ? [] : favoriteLotsInSale.lots);
  return { user, isFavorited, lotLists, lot, listError, itemError, key };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveLotList: (userId, list) => dispatch(saveLotList({ userId, list })),
    saveLotToLotList: (userId, listId, lot) => dispatch(saveLotToLotList({ userId, listId, lot }))
  };
};

class PhillipsLotList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLotList: false,
      timeOutId: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lot.lotNumberFull.trim() === this.props.lot.lotNumberFull.trim()) {
      if (nextProps.isFavorited !== this.props.isFavorited) {
        this.setState(state => ({ ...state, showLotList: nextProps.isFavorited }));
      }
    } else if (nextProps.lot.lotNumberFull.trim() !== this.props.lot.lotNumberFull.trim()) {
      this.setState(state => ({ ...state, showLotList: false }));
    }
  }

  render() {
    const eventHandlers = {
      onMouseEnter: () => {
        if (this.props.isFavorited) {
          clearTimeout(this.state.timeOutId);
          this.setState(state => ({ ...state, showLotList: true, timeOutId: null }));
        }
      },
      onMouseLeave: () => {
        // if (this.props.isFavorited) {
        //   const timeOutId = setTimeout(() => {
        //     this.setState(state => ({ ...state, showLotList: false }));
        //   }, 5000);
        //   this.setState(state => ({ ...state, timeOutId }));
        // }
      },
      onPress: () => {
        this.setState(state => ({ ...state, showLotList: !state.showLotList }));
      }
    };
    return (
      <div
        className="phillips-lot-list-container"
      >
        {this.props.children(eventHandlers)}
        <LotList
          {...this.props}
          show={this.state.showLotList}
          onMouseEnter={eventHandlers.onMouseEnter}
          onMouseLeave={eventHandlers.onMouseLeave}
        />
      </div>
    );
  }
}

PhillipsLotList.propTypes = {
  children: PropTypes.func.isRequired,
  isFavorited: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PhillipsLotList);
