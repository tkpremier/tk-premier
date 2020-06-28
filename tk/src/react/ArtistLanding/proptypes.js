import PropTypes from 'prop-types';
import { lotPropTypes } from '../PropTypes/proptypes';
import { headline } from '../Articker/proptypes';


export const defaultMakerBio = {
  biography: '',
  firstQuote: '',
  insights: [],
  secondQuote: ''
};

export const defaultArtistLanding = {
  ...defaultMakerBio,
  artistImageBlocked: false,
  birthYear: '',
  cloudinaryTransformation: '',
  deathYear: '',
  firstQuote: '',
  headlines: [],
  imagePath: '',
  insights: [],
  isConsignmentMaker: false,
  isFeatured: false,
  landingDescription: '',
  lotNumber: 0,
  lotNumberSuffix: '',
  lots: [],
  nationality: '',
  pastLots: [],
  saleNumber: '',
  secondQuote: '',
  upcomingLots: [],
  useCloudinary: true
};


export const makerBioPropTypes = {
  biography: PropTypes.string,
  firstQuote: PropTypes.string,
  insights: PropTypes.arrayOf(PropTypes.string),
  secondQuote: PropTypes.string
};

export const artistLandingPropTypes = {
  ...makerBioPropTypes,
  artistImageBlocked: PropTypes.bool,
  birthYear: PropTypes.string,
  cloudinaryTransformation: PropTypes.string,
  deathYear: PropTypes.string,
  headlines: PropTypes.arrayOf(PropTypes.shape(headline)),
  imagePath: PropTypes.string,
  isConsignmentMaker: PropTypes.bool,
  isFeatured: PropTypes.bool,
  landingDescription: PropTypes.string,
  lots: PropTypes.arrayOf(lotPropTypes),
  lotNumber: PropTypes.number,
  lotNumberSuffix: PropTypes.string,
  makerId: PropTypes.number.isRequired,
  makerName: PropTypes.string.isRequired,
  nationality: PropTypes.string,
  pastLots: PropTypes.arrayOf(lotPropTypes),
  saleNumber: PropTypes.string,
  upcomingLots: PropTypes.arrayOf(lotPropTypes),
  useCloudinary: PropTypes.bool
};