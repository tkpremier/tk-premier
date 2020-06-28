import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { showModal } from '../PhillipsModal/actions';


const Buttons = (props) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(showModal({ width: 1082, height: 677, type: 'vgallery', src: e.target.href, name: 'GalleryView', title: `GalleryView - ${e.target.dataset.id}` }));
  };
  return (
    <Fragment>
      {props.data.map(gallery => (
        <a
          className="auction-page__sidebar__button"
          key={`vgallery-${gallery}`}
          href={`/v-gallery?galleryId=${gallery}`}
          data-id={gallery}
          onClick={handleClick}
        >
          View Gallery
        </a>
      ))}
    </Fragment>
  );
};

Buttons.defaultProps = {
  data: []
};

Buttons.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string)
}

export default Buttons;
