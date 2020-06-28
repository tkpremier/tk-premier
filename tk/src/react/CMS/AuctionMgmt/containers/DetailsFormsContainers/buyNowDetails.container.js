import { connect } from 'react-redux';
import BuyNowDetails from '../../components/DetailsForms/BuyNow';
import * as auctionsActions from '../../actions/auction';

const mapStateToProps = ({ selectedAuction }) => ({ selectedAuction });

const mapDispatchToProps = {
  ...auctionsActions
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyNowDetails);
