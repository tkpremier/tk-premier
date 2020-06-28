import React, { PureComponent } from 'react';
import getPhillipsBackboneProperty from '../utils/getPhillipsBackboneProperty';
import bindUserModel from '../PhillipsUser/bindUserModel';
import { loggedIn } from '../PhillipsUser/actions';


class MyArtistsLink extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    getPhillipsBackboneProperty('user').then((userModel) => {
      bindUserModel(userModel, dispatch);
      if (userModel.loggedIn) { dispatch(loggedIn(userModel.toJSON()));}
    });
  }

  render() {
    const { user } = this.props;
    if (user.loggedIn) {
      return (
        <div className="col-xs-12 user-actions">
          <div className="back-button col-xs-6 ">
            <a href="/follows">Back to My Artists</a>
          </div>
        </div>
      );
    }
    return null;
  }
};

export default MyArtistsLink;
