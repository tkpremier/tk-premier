import React, { Component } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { upperFirst } from 'lodash/fp';
import getViewInRoomStyles from './getViewInRoomStyles';
import PhillipsImage from '../PhillipsImage/PhillipsImage';

const getInitialStyle = () => {
  const imageContainer = document.getElementsByClassName('main-lot-image')[0];
  const image = imageContainer.children[0];
  const imagePosition = image.getBoundingClientRect();
  return {
    position: 'fixed',
    top: imagePosition.top,
    left: imagePosition.left,
    zIndex: 1010
  };
};

class ViewInRoom extends Component {
  constructor(props) {
    super(props);
    this.galleryView = null;
    this.hangingLotImage = null;
    this.lotImageClone = null;
    this.perspectiveEl = null;
    this.setGalleryViewRef = (el) => { this.galleryView = el; return el; };
    this.setLotImageCloneRef = (el) => { this.lotImageClone = el; return el; };
    this.setHangingLotImageRef = (el) => { this.hangingLotImage = el; return el; };
    this.setPerspectiveElRef = (el) => { this.perspectiveEl = el; return el; };
    this.onImageLoad = this.onImageLoad.bind(this);
    this.onCloseAnimation = this.onCloseAnimation.bind(this);
  }

  componentDidMount() {
    this.onImageLoad();
  }

  onImageLoad() {
    const imagePosition = this.hangingLotImage.getBoundingClientRect();
    const { offsetWidth, offsetHeight } = this.hangingLotImage;
    const scale = offsetWidth / this.lotImageClone.offsetWidth;
    const animationTimeline = anime.timeline({ complete: () => console.log('animation complete') });
    animationTimeline
      .add({
        targets: this.lotImageClone,
        easing: 'linear',
        duration: 250,
        left: imagePosition.left - (offsetWidth / 2),
        top: imagePosition.top - (offsetHeight / 2),
        opacity: 0,
        scale
      })
      .add({
        targets: [this.galleryView, this.hangingLotImage, this.perspectiveEl],
        opacity: 1,
        easing: 'linear',
        delay: (el, index) => 250 * index,
        duration: 250,
        offset: '-=500'
      });
  }

  onCloseAnimation(callback) {
    // const findLotImage = find(element => includes('image-container')(element.className));
    // const lotImage = document.getElementsByClassName('lot-image')[0];
    // const image = findLotImage(lotImage.children);
    const imageContainer = document.getElementsByClassName('main-lot-image')[0];
    const image = imageContainer.children[0];
    const scale = image.offsetWidth / this.lotImageClone.offsetWidth;
    const imagePosition = image.getBoundingClientRect();

    const animationTimeline = anime.timeline({ complete: callback });
    animationTimeline
      .add({
        targets: [this.perspectiveEl, this.hangingLotImage, this.galleryView],
        opacity: 0,
        easing: 'linear',
        delay: (el, index) => 250 * index,
        duration: 250
      })
      .add({
        targets: this.lotImageClone,
        easing: 'linear',
        duration: 250,
        left: imagePosition.left,
        top: imagePosition.top,
        opacity: 1,
        scale,
        offset: '-=500'
      });
  }

  componentDidLeave() {
    // this.animationTimeline.finished.then(callback);
    this.animationTimeline.reverse();
  }

  render() {
    const styles = getViewInRoomStyles(this.props);
    const referenceContainerStyle = {};
    referenceContainerStyle[styles.position] = '50%';
    referenceContainerStyle[`margin${upperFirst(styles.position)}`] = `-${styles.referenceOffset}px`;
    const close = (e) => {
      this.onCloseAnimation(() => {
        this.props.onClose(e);
      });
    };
    return (
      <div className="view-in-room-container">
        <div
          className="lot-image-clone"
          ref={this.setLotImageCloneRef}
          style={getInitialStyle()}
        >
          <PhillipsImage
            alt={this.props.description}
            imagePath={this.props.image}
            transformation={this.props.transformation}
            cloudinary={this.props.cloudinary}
            loading={false}
            onError={error => console.log('view in room image error', this.props)}
          />
        </div>
        <div
          id="room-view-container"
          ref={this.setGalleryViewRef}
        >
          <div className="wall-view-room">
            <div className="close" onClick={close} />
            <div className="wall-view-wall">
              <div
                className="hanging-lot-image"
                style={{ marginLeft: `-${styles.marginLeft}px`, bottom: `${styles.bottom}px` }}
                ref={this.setHangingLotImageRef}
              >
                <PhillipsImage

                  alt="view in room image"
                  imagePath={this.props.image}
                  width={styles.width}
                  height={styles.height}
                  cloudinary={this.props.cloudinary}
                  onError={error => console.log('view in room image error', this.props)}
                  useTransformation={false}
                  loading={false}
                />
              </div>
            </div>
            <div className="wall-view-background" />
            <div
              ref={this.setPerspectiveElRef}
              className="perspective-container"
              style={referenceContainerStyle}
            >
              <img
                alt="perspective reference"
                className="perspective-reference"
                src={styles.referenceImg}
                style={{ height: `${styles.heightPx}px` }}
                title="perspective reference"
              />
              <div className="perspective-shadow" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewInRoom.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  image: PropTypes.string,
  cloudinary: PropTypes.bool
};

export default ViewInRoom;
