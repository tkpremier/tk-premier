import pick from 'lodash/fp/pick';
import { connect } from 'react-redux';
import { changeHeroIndex, loaded } from '../actions/actions';
import HomePageHero from './HomePageHero';

const mapStateToProps = ({ currentHeroIndex, elements }, { editable }) => {
  const liveAuction = elements.homePageLiveAuction;
  const imageData = elements.featuredSlider;
  const captionData = elements.featuredSlider.map(pick(['htmlCaption', 'url']));
  return {
    imageData,
    currentHeroIndex,
    captionData,
    liveAuction,
    editable
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSlide: (index) => {
      dispatch(changeHeroIndex(index));
    },
    onLoad: (isloaded) => {
      dispatch(loaded(isloaded));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageHero);
