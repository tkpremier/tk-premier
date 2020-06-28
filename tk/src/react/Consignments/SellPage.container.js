import { connect } from 'react-redux';
import SellPage from './SellPage';
import { loggedIn } from '../PhillipsUser/actions';

const mapStateToProps = ({ makers, makersFetched, selectedMaker, language }, { mediums, isLandingPage }) => {
  return {
    makers,
    makersFetched,
    selectedMaker,
    mediums,
    isLandingPage,
    language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loggedIn: userJSON => dispatch(loggedIn(userJSON)),
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SellPage);
