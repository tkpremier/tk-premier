import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import BrowseBar from '../BrowseArtists/components/browsebar';
import FeaturedMaker from './FeaturedMaker';
import MakerCarouselCont from './MakerCarouselList.container';
import Editorials from './Editorials';
import getPhillipsBackboneProperty from '../utils/getPhillipsBackboneProperty';
import bindUserModel from '../PhillipsUser/bindUserModel';
import { makerEditorialPropType, featuredMakerPropType } from '../PropTypes/proptypes';

const Layout = ({ dispatch, editable, env, featuredMaker, makerEditorials }) => {
  useEffect(() => {
    if (env === 'web') {
      getPhillipsBackboneProperty('user').then((userModel) => {
        bindUserModel(userModel, dispatch);
        if (userModel.loggedIn) {
          userModel.fetchUserDetails();
        } else {
          userModel.on('loggedIn', userModel.fetchUserDetails);
        }
      });
    }
  }, []);
  return (
    <div className="container content-area">
      <h2 className="page-title">Artists & Makers</h2>
      <FeaturedMaker
        {...featuredMaker}
        env={env}
      />
      {!editable ?
        <BrowseBar page="landing" /> :
        null
      }
      <MakerCarouselCont />
      <Editorials
        makerEditorials={makerEditorials}
        env={env}
      />
    </div>
  );
};

Layout.defaultProps = {
  editable: false
};

Layout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editable: PropTypes.bool,
  featuredMaker: PropTypes.shape(featuredMakerPropType).isRequired,
  makerEditorials: PropTypes.arrayOf(PropTypes.shape(makerEditorialPropType)).isRequired,
  env: PropTypes.string.isRequired
};

export default Layout;
