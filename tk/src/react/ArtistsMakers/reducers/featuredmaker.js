import { defaultFeaturedMaker } from '../default-state-slices/featuredmaker';

const featuredMaker = (state = {data: defaultFeaturedMaker}, action) => {
  switch (action.type) {
    case 'RECEIVE_POSTS':
      const newState = {...state, data: action.data.featuredMaker.data};
      return newState;
    case 'SELECT_SUBREDDIT':
      return action.subreddit
    default:
      return state
  }
}

export default featuredMaker;
