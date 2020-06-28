import UserService from '../../../services/UserService';
import { getUserCarousel } from '../../services/httpservice';

const userService = new UserService();

const setUserCarousel = userCarousel => ({
  type: 'SET_USER_CAROUSEL',
  userCarousel
});

const fetchUserCarousel = userData => dispatch => getUserCarousel(userData)
  .then(userCarousel => dispatch(setUserCarousel(userCarousel)));

const removeUserCarousel = () => ({
  type: 'REMOVE_USER_CAROUSEL'
});
const setRecommendedLots = (recommendedLots) => {
  return {
    type: 'SET_RECOMMENDED_LOTS',
    payload: { recommendedLots }
  };
};

const fetchRecommendedLots = (userId, saleNumber) => {
  return (dispatch) => {
    userService.fetchRecommendedLots(userId, saleNumber)
      .then(recommendedLots => dispatch(setRecommendedLots(recommendedLots)))
      .catch((err) => {
        console.log('error: ', err);
        dispatch(setRecommendedLots([]));
      });
  };
};
export {
  fetchUserCarousel,
  removeUserCarousel,
  setRecommendedLots,
  fetchRecommendedLots
};