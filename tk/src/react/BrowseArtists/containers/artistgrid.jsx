import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMoreMakers } from '../actions/';
import uriEncoder from '../../utils/uriencoder';
import { calcNatBirthDisplay } from '../../ArtistsMakers/utils/calcnatbirth';
import PhillipsSocialLegacy from '../../PhillipsSocialLegacy/PhillipsSocialLegacy';


const mapStateToProps = (state ={}) => {
  const {
    data,
    isFetching,
    letter,
    currentCount,
    currentPage,
    totalCount
  } = state;
  return { letter, data, isFetching, currentCount, currentPage, totalCount};
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMore: (letter, page) => {
      dispatch(fetchMoreMakers(letter, page));
    }
  }
}

const ArtistGrid = (props) => {
  const noMore = props.currentCount === props.totalCount;
  const getMore = (e) => {
    e.preventDefault();
    if (!noMore) {
      props.fetchMore(props.letter, props.currentPage + 1)
    }
  }

  const isFetching = (<div className="col-xs-12 web-spinner"></div>);
  const makers = (
    <ul className="grid-list">
      {props.data.map((maker) => {
        const bkgImg = {
          backgroundImage: `url(${maker.imagePath})`
        };
        const makerLink = `/artist/${maker.makerId}/${uriEncoder(maker.makerName)}`;
        return (
          <li className="col-xs-6 col-sm-3 col-md-2 maker">
            <a href={makerLink} className="col-xs-12">
              <div style={bkgImg} className='carousel-item-img' />
            </a>
            <a href={makerLink} className="col-xs-12">
              <h3 className="name">{maker.makerName}</h3>
              <p className="nat-birth" title={calcNatBirthDisplay(maker)}>{calcNatBirthDisplay(maker)}</p>
            </a>
            <PhillipsSocialLegacy {...maker} lotNumber={''} lot={false} key={maker.makerId} />
          </li>
        )
      })}
    </ul>
  )
  const grid = props.isFetching.initial ? isFetching : makers;
  const viewMore = props.isFetching.more ? isFetching : (<div className="view-more col-xs-12">
    <a href="#" onClick={getMore}>Show More Results</a>
  </div>)

  return (
    <div className="row browse-artist-grid">
      <div className="col-xs-12 info"><h2 className="seroMedium">{props.letter}</h2><span>Showing {props.currentCount} of {props.totalCount}</span></div>
      {grid}
      {viewMore}
    </div>
  );
}

ArtistGrid.defaultProps = {
  data: [],
  letter: 'A',
  currentCount: 0,
  totalCount: 0
}

ArtistGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  letter: PropTypes.string,
  currentCount: PropTypes.number,
  totalCount: PropTypes.number,
}

const ArtistGridCont = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistGrid);

export default ArtistGridCont;
