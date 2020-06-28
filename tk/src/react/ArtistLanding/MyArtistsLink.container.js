import { connect } from 'react-redux';
import MyArtistsLink from './MyArtistsLink';

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(MyArtistsLink);
