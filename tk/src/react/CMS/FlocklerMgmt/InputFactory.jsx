
import MainInfo from './Tabs/MainInfo';
import CarouselInfo from './Tabs/CarouselInfo';
import AsscInfo from './Tabs/AsscInfo';
import AltInfo from './Tabs/AltInfo';

/* const Inputs = [
  // Main Info
  {
    title: TextInput,
    flocklerId: TextInput,
    articleUrl: TextInput,
    publishDate: TextInput,
    summary: TextInput,
    coverUrl: TextInput,
    section: TextInput - readonly,
    state: 3,
    displayType: 4 - Dropdown
  },
  {
    carousels: [{
      active: PropTypes.bool,
      buyNowSaleNumber: PropTypes.string,
      carouselAreaId: PropTypes.number,
      carouselId: PropTypes.number,
      carouselItems: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.shape(lotPropTypes),
        PropTypes.shape(makerPropTypes)
      ])),
      departmentId: PropTypes.number,
      carouselDesc: PropTypes.string,
      displayOrder: PropTypes.number,
      itemCount: PropTypes.number,
      carouselTitle: PropTypes.string
    }]
  },
  // Associated Sales and Makers
  {
    associatedSalesList: SalePicker,
    makerId: null - MakerSearch,    
  },
  // Alternate Data
  {
    alternateTitle: - Textarea"",
    alternateDescription: - Textarea ""
  }
] */

export default function getInputs(tabValue) {
  switch (tabValue) {
    case 0:
      return MainInfo;
    case 1:
      return CarouselInfo;
    case 2:
      return AsscInfo;
    case 3:
      return AltInfo;
    default:
      return null;
  }
};