import 'fetch-ponyfill';
import React, { useEffect, useRef, useState } from 'react';
import isNull from 'lodash/isNull';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import cloudinaryConfig from './cloudinaryConfig';
import { getCloudinaryTransformation } from './PhillipsCloudinary';
import XigenImage from './XigenImage';

const placeholder = 'https://phillips.vo.llnwd.net/v1/web_prod/images/placeholders/item_placeholder.png';
const Loading = () => {
  const ref = useRef(null);
  const [height, setHeight] = useState('133.33px');
  useEffect(() => {
    if (!isNull(ref.current)) {
      const newWidth = ref.current.clientWidth;
      const newHeight = newWidth * (2 / 3);
      setHeight(`${parseInt(newHeight, 10)}px`);
    }
  }, []);
  return (
    <div className="image-loader" ref={ref} style={{ height, zIndex: 10 }}><div className="signal" /></div>
  );
};
const Image = (props) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  const handleLoad = (event) => {
    props.onLoad(event);
    if (!loaded) {
      setLoaded(true);
    }
  };
  useEffect(() => {
    const domNode = ref.current;
    const effectHandleLoad = handleLoad;
    const onComplete = (event) => {
      if (!loaded) {
        props.onLoad(event);
        setLoaded(true);
      }
    };
    if (!isNull(domNode)) {
      domNode.addEventListener('complete', onComplete);
      if (ref.current.complete && !loaded) {
        effectHandleLoad({ target: ref.current, type: 'load' });
        setLoaded(true);
      }
    }
    return () => {
      domNode.removeEventListener('complete', onComplete);
    }
  }, []);
  return !isNull(props.imgSrc)
    ? (
      <img
        alt={props.alt}
        data-pin-url={props.imgSrc}
        loading={props.loading}
        onError={props.onError}
        onLoad={handleLoad}
        src={props.imgSrc}
        ref={ref}
      />
    )
    : (
      <XigenImage
        onLoad={handleLoad}
        onError={props.onError}
        {...props}
      />
    );
};

Image.defaultProps = {
  alt: '',
  loading: 'lazy',
  imgSrc: placeholder
}
Image.propTypes = {
  alt: PropTypes.string,
  imgSrc: PropTypes.string,
  loading: PropTypes.string,
  onError: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired
}

const PhillipsImage = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const handleLoad = (event) => {
    if (props.onLoad) {
      props.onLoad(event);
    }
    if (loading) {
      setLoading(!loading);
    }

  };
  const handleError = () => {
    if (!error) {
      if (props.onError) {
        props.onError();
      }
      setLoading(false);
      setError(true);
    }
  }
  const imgSrc = props.cloudinary
    ? error
      ? placeholder
      : props.useTransformation
        ? cloudinaryConfig.url(
          props.imagePath,
          {
            transformation: getCloudinaryTransformation(props.transformation),
            version: props.version
          }
        )
        : cloudinaryConfig.url(
          props.imagePath,
          {
            width: props.width,
            height: props.height,
            crop: props.crop
          })
    : null;
  return (
    <div className={classNames('phillips-image', props.className)}>
      {loading
        ? <Loading />
        : null
      }
      <Image
        {...props}
        imgSrc={imgSrc}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}

PhillipsImage.defaultProps = {
  alt: '',
  className: '',
  cloudinary: true,
  constrain: false,
  crop: 'scale',
  curatedView: false,
  description: 'no description',
  height: 280,
  hideLoader: false,
  loading: 'lazy',
  onError: null,
  onLoad: null,
  padX: false,
  padY: false,
  sizeMode: 'fitpadded',
  transformation: 'AuctionLotsView',
  useTransformation: true,
  version: '1',
  width: 220
};

PhillipsImage.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  cloudinary: PropTypes.bool,
  crop: PropTypes.string,
  curatedView: PropTypes.bool,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
  loading: PropTypes.string,
  hideLoader: PropTypes.bool,
  description: PropTypes.string,
  transformation: PropTypes.string,
  imagePath: PropTypes.string.isRequired,
  height: PropTypes.number,
  constrain: PropTypes.bool,
  padX: PropTypes.bool,
  padY: PropTypes.bool,
  sizeMode: PropTypes.string,
  version: PropTypes.string,
  useTransformation: PropTypes.bool,
  width: PropTypes.number
};

export default PhillipsImage;
