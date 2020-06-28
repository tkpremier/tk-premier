import { connect } from 'react-redux';
import { selectElement } from './actions';
import CMSControls from './CMSControls';

const mapStateToProps = (state, ownProps) => {
  let totalCount = 0;
  let { elementProps, carouselId } = ownProps;
  if (Array.isArray(elementProps)) {
    elementProps = elementProps.map(prop => ({
      ...prop,
      totalCount: elementProps.length
    }));
  } else if (carouselId > 0) {
    totalCount = elementProps.carouselItems.length;
    elementProps.carouselId = carouselId;
    elementProps.totalCount = elementProps.carouselItems.length;
    elementProps.buyNowSaleNumber = elementProps.buyNowSaleNumber;
  }
  return {
    ...ownProps,
    elementProps,
    totalCount
  };
}

const mapDispatchToProps = { selectElement };

export default connect(mapStateToProps, mapDispatchToProps)(CMSControls);
