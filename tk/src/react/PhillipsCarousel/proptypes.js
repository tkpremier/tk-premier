import PropTypes from 'prop-types';
import { lotPropTypes, makerPropTypes } from '../PropTypes/proptypes';

/*
carouselAreaId
  HomePage = 1,
  Department = 2,
  Maker = 3,
  Editorial = 4
carouselTypeId
  Lot = 1
  Maker 2
*/

export const defaultProps = {
  active: false,
  buyNowSaleNumber: '',
  carouselAreaId: 1,
  carouselDesc: '',
  carouselId: 0,
  carouselItems: [],
  carouselTitle: '',
  carouselTypeId: 1,
  departmentId: null,
  displayOrder: 1,
  flocklerId: 0,
  itemCount: 0
};

const carouselPropTypes = {
  active: PropTypes.bool,
  buyNowSaleNumber: PropTypes.string,
  carouselAreaId: PropTypes.number,
  carouselDesc: PropTypes.string,
  carouselId: PropTypes.number,
  carouselItems: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape(lotPropTypes),
    PropTypes.shape(makerPropTypes)
  ])),
  carouselTitle: PropTypes.string,
  carouselTypeId: PropTypes.number,
  departmentId: PropTypes.number,
  displayOrder: PropTypes.number,
  flocklerId: PropTypes.number,
  itemCount: PropTypes.number
};

export default carouselPropTypes;
