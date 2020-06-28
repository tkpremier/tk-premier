import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { showModal } from '../PhillipsModal/actions';


const Link = (props) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(showModal({ width: 980, height: 613, type: 'iframe', src: e.target.href, name: 'GalleryView', title: `GalleryView - ${e.target.dataset.id}` }));
  };
  const href = props.href.length > 0
    ? props.href
    : `/v-gallery?galleryId=${props.galleryId}`;
  return (
    <a
      className="auction-page__sidebar__button"
      key={`vgallery-${props.galleryId}`}
      href={href}
      data-id={props.galleryId}
      onClick={handleClick}
    >
      View Gallery
    </a>
  );
};

Link.defaultProps = {
  children: null,
  className: '',
  galleryId: '',
  href: ''
};

Link.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.string])),
  className: PropTypes.string,
  galleryId: PropTypes.string,
  href: PropTypes.string
};

export default Link;
