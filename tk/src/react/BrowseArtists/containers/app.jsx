import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BrowseBar from '../components/browsebar';
import ArtistGridCont from './artistgrid';
import { fetchMakers } from '../actions/';
import getPhillipsBackboneProperty from '../../utils/getPhillipsBackboneProperty';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'mounted': false
    }
  }
  componentDidMount() {
    this.setState({
      mounted: true
    });
    getPhillipsBackboneProperty('user').then((userModel) => {
      if (userModel.loggedIn) {
        userModel.fetchUserDetails();
      } else {
        userModel.on('loggedIn', userModel.fetchUserDetails);
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { letter } = nextProps.match.params;
    dispatch(fetchMakers(true, letter));
  }
  render() {
    const ShowBrowseBar = this.state.mounted === true ? (
      <BrowseBar/>
    ) : null;
    return (
      <div className="container content-area">
        <h2 className="page-title">Artists & Makers</h2>
        {ShowBrowseBar}
        <ArtistGridCont/>
      </div>
    )
  }
}

function mapStateToProps(state) {

  const { example } = state;

  return {
    example
  }

}

export default connect(mapStateToProps)(App)
