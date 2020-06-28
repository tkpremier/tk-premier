import { connect } from 'react-redux';
import OfferModal from './OfferModal';
import { submitOffer } from '../BidButtons/actions';

const mapStateToProps = ({ modal }) => {
  return { ...modal };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitOffer: (offerData, payload) => {
      dispatch(submitOffer({ offerData, payload }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferModal);
