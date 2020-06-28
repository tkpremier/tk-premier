import { connect } from 'react-redux';
import ExtraInfo from '../../components/DetailsForms/ExtraInfo';
import * as auctionsActions from '../../actions/auction';

const mapStateToProps = (state) => {
  const { selectedAuction } = state;
  return { selectedAuction };
};

const mapDispatchToProps = {
  ...auctionsActions
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtraInfo);
