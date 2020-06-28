import { connect } from 'react-redux';
import Layout from './ArtistsMakersPage';

const mapStateToProps = (
  { makerCarousels },
  { editable, env, featuredMaker, makerEditorials }
) => ({
  featuredMaker,
  makerCarousels,
  makerEditorials,
  editable,
  env
});

export default connect(mapStateToProps)(Layout);
