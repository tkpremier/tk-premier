import makerCarousels from './makercarousels';
import manageMakerItem from './makercarouselitem';
import { search } from '../../BrowseArtists/reducers';


const autoComplete = (state = {data: []}, action) => {
  switch (action.type) {
    case 'RECEIVE_MAKERS_SUCCESS':
      return { ...state, data: action.data.makers };
    case 'SET_MAKER':
      return { ...state, hiddenValue: action.id, value: action.name };
    default:
      return state;
  }
}

const editable = (state = false) => state;

const env = (state = 'web') => state;

const rootReducer = {
  makerCarousels,
  manageMakerItem,
  editable,
  autoComplete,
  env,
  search
};

export default rootReducer;
