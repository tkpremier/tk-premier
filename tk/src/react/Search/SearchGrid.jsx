import PropTypes from 'prop-types';
import React from 'react';
import PhillipsGrid from '../PhillipsGrid/PhillipsGrid';
import PhillipsLot from '../PhillipsLot/PhillipsLot';
import PhillipsMaker from '../PhillipsMaker/PhillipsMaker';
import PhillipsEmployee from '../PhillipsEmployee/PhillipsEmployee';
import PhillipsEditorial from '../PhillipsEditorial/PhillipsEditorial';
import PhillipsAuctionItem from '../PhillipsAuction/PhillipsAuctionItem';


const typeProps = {
  makers: {
    columns: { lg: 4, md: 4, sm: 6, xs: 6 },
    component: PhillipsMaker,
    props: {}
  },
  lots: {
    columns: { lg: 4, md: 4, sm: 6, xs: 6 },
    component: PhillipsLot,
    props: {
      hasRouter: false,
      useTransformation: true,
      transformation: 'AuctionLotsView'
    }
  },
  auctions: {
    columns: { lg: 6, md: 6, sm: 6, xs: 6 },
    component: PhillipsAuctionItem,
    props: {}
  },
  editorials: {
    columns: { lg: 6, md: 6, sm: 6, xs: 6 },
    component: PhillipsEditorial,
    props: {}
  },
  teams: {
    columns: { lg: 4, md: 4, sm: 6, xs: 6 },
    component: PhillipsEmployee,
    props: {}
  }
};


const SearchGrid = (props) => {
  const Child = typeProps[`${props.type}s`].component;
  const childProps = typeProps[`${props.type}s`].props;
  return (
    <div className="search-grid" id={props.type}>
      <p className="title">{props.title} <span>({props.totalCount})</span></p>
      <PhillipsGrid columns={typeProps[`${props.type}s`].columns}>
        {props.results.map(item => <Child {...item} {...childProps} />)}
      </PhillipsGrid>
    </div>
  );
};

SearchGrid.defaultProps = {
  type: '',
  title: '',
  results: [],
  totalCount: 0
};

SearchGrid.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  totalCount: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.object)
};

export default SearchGrid;
