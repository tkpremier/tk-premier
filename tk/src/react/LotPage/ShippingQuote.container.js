import { connect } from 'react-redux';
import ShippingQuote from './ShippingQuote';
import { userStateSelector } from '../PhillipsUser/selectors';
import { currentLotSelector } from './selectors';

const mapStateToProps = ({ lotNumberFull, lots, user }) => {
  const { saleNumber, lowEstimate } = currentLotSelector({ lotNumberFull, lots });
  return {
    lotNumberFull,
    lowEstimate,
    saleNumber,
    ...userStateSelector({ user })
  }
};

export default connect(mapStateToProps)(ShippingQuote);