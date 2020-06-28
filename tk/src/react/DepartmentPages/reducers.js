import has from 'lodash/fp/has';
import isNull from 'lodash/isNull';
import { editingState } from './setInitialState';
import { defaultLotProps } from '../PropTypes/proptypes';

/* DEFAULT STATES BEGIN */

const defaultEditingState = editingState(0);

const defaultBannerState = {
  active: true,
  imagePath: '',
  link: ''
};

const defaultBuyNow = {
  carouselTitle: '',
  carouselDesc: '',
  carouselItems: [defaultLotProps]
};

const defaultCarousel = {
  title: '',
  lots: [defaultLotProps]
};

const defaultDetails = {
  description: '',
  departmentName: '',
  locations: [
    {
      name: '',
      email: ''
    }
  ]
};

const defaultHero = {
  imagePath: '',
  buttonText: '',
  description: '',
  link: ''
};

/* DEFAULT STATES END */

const editingComponent = (state = defaultEditingState, action) => state;

const hero = (state = defaultHero, action) => {
  switch (action.type) {
    case 'SAVE_SUCCESS_HERO':
      const { resp } = action.payload;
      return { ...state, ...resp.hero };
    default:
      return state;
  }
};
const features = (state = []) => state;

const banner = (state = defaultBannerState) => state;

const buyNowCarousel = (state = [defaultBuyNow], { type, payload }) => {
  switch (type) {
    case 'SAVE_SUCCESS_BUYNOWCAROUSEL':
      const { resp } = payload;
      return has('carousel')(resp)
        ? [resp.carousel] : state;
    default:
      return !isNull(state) && state.length > 0
        ? [{ ...state[0] }]
        : state;
  }
};

const carousel = (state = defaultCarousel, { type, payload }) => {
  switch (type) {
    case 'SAVE_SUCCESS_CAROUSEL':
      const { resp } = payload;
      return has('departmentPage')(resp)
        ? resp.departmentPage.carousel
        : has('carousel')(resp)
          ? resp.carousel
          : state;
    default:
      return state;
  }
};

const pastAuctions = (state = []) => state;
const pressReleases = (state = []) => state;
const upcomingAuctions = (state = []) => state;
const videos = (state = []) => state;
const instagram = (state = []) => state;

const departmentName = (state = '') => state;
const departmentId = (state = 0) => state;
const details = (state = defaultDetails) => state;
const editable = (state = false) => state;

/* CMS-ONLY reducers END */

export {
  banner,
  buyNowCarousel,
  carousel,
  departmentId,
  departmentName,
  details,
  editable,
  features,
  hero,
  instagram,
  pastAuctions,
  pressReleases,
  upcomingAuctions,
  videos
};
