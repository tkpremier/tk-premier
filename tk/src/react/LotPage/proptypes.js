import PropTypes from 'prop-types';
import { lotPropTypes, auctionPropTypes, user as userPropTypes } from '../PropTypes/proptypes';

const componentDataPropTypes = {
  active: PropTypes.bool.isRequired,
  componentId: PropTypes.number.isRequired,
  displayOrder: PropTypes.number.isRequired,
  htmlCaption: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

export const additionalContentPropTypes = {
  active: PropTypes.bool.isRequired,
  objectNumber: PropTypes.string.isRequired,
  componentContainerId: PropTypes.number.isRequired,
  displayOrder: PropTypes.number.isRequired,
  componentData: PropTypes.arrayOf(PropTypes.shape(componentDataPropTypes)).isRequired,
  componentType: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export const additionalContentLotPropTypes = {
  ...lotPropTypes,
  additionalContent: PropTypes.arrayOf(PropTypes.shape(additionalContentPropTypes))
};

const lotPagePropTypes = {
  auction: PropTypes.shape(auctionPropTypes).isRequired,
  auctionMobilityLotRowIds: PropTypes.arrayOf(PropTypes.string),
  currentLanguage: PropTypes.string,
  currentLot: PropTypes.shape(additionalContentLotPropTypes).isRequired,
  dispatch: PropTypes.func.isRequired,
  isServer: PropTypes.bool.isRequired,
  loginRequired: PropTypes.bool.isRequired,
  lots: PropTypes.arrayOf(PropTypes.shape(additionalContentLotPropTypes)).isRequired,
  modal: PropTypes.shape({
    payload: PropTypes.object,
    show: PropTypes.bool,
    type: PropTypes.string
  }),
  user: PropTypes.shape(userPropTypes).isRequired
};

export default lotPagePropTypes;