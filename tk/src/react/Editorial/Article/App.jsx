import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import PhillipsCarousel from '../../PhillipsCarousel/PhillipsCarousel';
import PhillipsLot from '../../PhillipsLot/PhillipsLot';
import carouselPropTypes from '../../PhillipsCarousel/proptypes';
import bindUserModel from '../../PhillipsUser/bindUserModel';
import { loggedIn } from '../../PhillipsUser/actions';

import getPhillipsBackboneProperty from '../../../utils/getPhillipsBackboneProperty';

const EditorialCarousel = ({ data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getPhillipsBackboneProperty('user')
      .then((userModel) => {
        bindUserModel(userModel, dispatch);
        if (userModel.loggedIn) {
          if (userModel.loggedIn) { dispatch(loggedIn(userModel.toJSON())); }
        }
      })
  }, []);

  return data.length > 0
    ? data.map(carouselData => (
      <PhillipsCarousel
        {...carouselData}
        sizes={{
          xl: 4,
          lg: 4,
          md: 3,
          sm: 1,
          xs: 1
        }}
      >
        {carouselData.carouselItems.map(lot => (
          <PhillipsLot
            {...lot}
            imageTransformation="HomePageCarousel"
            lotListDisabled
          />
        ))}
      </PhillipsCarousel>
    ))
    : null;
};

EditorialCarousel.defaultProps = {
  data: []
};

EditorialCarousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(carouselPropTypes))
};

export default EditorialCarousel;
