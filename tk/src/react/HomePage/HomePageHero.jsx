import React, { createRef, useEffect, useState } from 'react';
import isNull from 'lodash/isNull';
import PropTypes from 'prop-types';
import PhillipsSlider from '../components/phillipsslider';
import ImageSlide from '../components/ImageSlide';
import CaptionSlide from '../components/CaptionSlide';
import applyEditOverlay from '../utils/applyEditOverlay';

const HomePageHero = (props) => {
  const {
    autoplay,
    editable,
    currentHeroIndex,
    changeSlide,
    imageData,
    interval,
    captionData
  } = props;
  const [endAutoPlay, setEnd] = useState(!autoplay);
  const [currIndex, setIndex] = useState(currentHeroIndex);
  const [apInterval, setApInt] = useState(null);
  const ref = createRef(null);
  useEffect(() => {
    if (!endAutoPlay) {
      const autoplayinterval = setInterval(() => {
        const total = imageData.length;
        setIndex(cI => cI === total - 1 ? 0 : cI + 1);
      }, interval);
      setApInt(autoplayinterval);
      return () => clearInterval(autoplayinterval);
    }
  }, []);
  const handleChangeSlde = (i) => {
    clearInterval(apInterval);
    setEnd(true);
    setIndex(i);
  };
  const totalCount = imageData.length;
  const imageSlides = imageData.map((image, index) => {
    const slideActive = index === currIndex;
    return applyEditOverlay(
      editable,
      ImageSlide,
      'slide'
    )({ ...image, slideActive, totalCount, key: index });
  });
  const captionSlides = captionData.map(caption => <CaptionSlide {...caption} key={caption.url} />);
  const scrollDown = () => {
    const el = ref.current;
    const height = el.clientHeight;
    // remove jquery for something else
    // we'll eventually kill out jquery dependency
    $('html, body').animate({ scrollTop: `${height}px` }, 500);
  };
  return (
    <div className={editable ? 'homepage-hero cms' : 'homepage-hero'} ref={ref}>
      <div className="hero-slider">
        <PhillipsSlider
          autoplay={!endAutoPlay}
          currentIndex={currIndex}
          changeSlide={handleChangeSlde}
          sliderClass="image-slider"
          animation="fade"
          arrows
        >
          {imageSlides}
        </PhillipsSlider>
        <PhillipsSlider
          autoplay={!endAutoPlay}
          sliderClass="caption-slider"
          currentIndex={currIndex}
          changeSlide={handleChangeSlde}
          animation="slide"
          pagination
        >
          {captionSlides}
        </PhillipsSlider>
        <button
          type="button"
          className="scroll-down"
          onClick={scrollDown}
        />
      </div>
    </div>
  );
};
// class HomePageHeroClass extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { endAutoplay: false };
//   }

//   componentDidMount() {
//     const img = document.createElement('img');
//     const imgModel = this.props.imageData[0];
//     img.addEventListener('load', () => this.props.onLoad(true));
//     img.addEventListener('error', () => this.props.onLoad(false));
//     img.src = imgModel.imageUrl;
//     if (this.props.autoplay && isNull(this.props.liveAuction)) {
//       this.props.startAutoplay(this);
//     }
//   }

//   render() {
//     const {
//       editable,
//       currentHeroIndex,
//       changeSlide,
//       imageData,
//       captionData,
//       liveAuction } = this.props;
//     const totalCount = imageData.length;
//     const imageSlides = imageData.map((image, index) => {
//       const slideActive = index === currentHeroIndex;
//       return applyEditOverlay(
//         editable,
//         ImageSlide,
//         'slide'
//       )({ ...image, slideActive, totalCount, key: index });
//     });
//     const captionSlides = captionData.map((caption, index) =>
//       <CaptionSlide {...caption} key={index} />
//     );
//     const scrollDown = () => {
//       const el = ref.current;
//       const height = el.clientHeight;
//       // remove jquery for something else
//       // we'll eventually kill out jquery dependency
//       $('html, body').animate({ scrollTop: `${height}px` }, 500);
//     };
//     let showAuctionVideo = false;
//     if (liveAuction && !editable) { showAuctionVideo = true; }
//     return (
//       <div className={editable ? 'homepage-hero cms' : 'homepage-hero'}>
//         <Switch expression={showAuctionVideo}>
//           <When case>
//             <div className="hero-video">
//               <AuctionVideo {...liveAuction} />
//             </div>
//           </When>
//           <When case={false}>
//             <div className="hero-slider">
//               <PhillipsSlider
//                 currentIndex={currentHeroIndex}
//                 changeSlide={changeSlide}
//                 sliderClass="image-slider"
//                 animation="fade"
//                 arrows
//                 endAutoplay={this.state.endAutoplay}
//               >
//                 {imageSlides}
//               </PhillipsSlider>
//               <PhillipsSlider
//                 sliderClass="caption-slider"
//                 currentIndex={currentHeroIndex}
//                 changeSlide={changeSlide}
//                 animation="slide"
//                 pagination
//                 endAutoplay={this.state.endAutoplay}
//               >
//                 {captionSlides}
//               </PhillipsSlider>
//               <div
//                 role="button"
//                 className="scroll-down"
//                 onClick={scrollDown}
//               />
//             </div>
//           </When>
//         </Switch>
//       </div>
//     );
//   }
// }

HomePageHero.defaultProps = {
  startAutoplay: (self) => {
    const intervalId = setInterval(() => {
      const { currentHeroIndex, imageData } = self.props;
      const totalCount = imageData.length;
      const nextindex = (currentHeroIndex === totalCount - 1) ?
        0 :
        currentHeroIndex + 1;
      self.props.changeSlide(nextindex);
    }, self.props.interval);
    self.setState({
      endAutoplay: () => {
        clearInterval(intervalId);
        self.setState({ endAutoplay: false });
      }
    });
  },
  liveAuction: null,
  editable: false,
  currentHeroIndex: 0,
  imageData: [],
  captionData: []
};

HomePageHero.propTypes = {
  editable: PropTypes.bool,
  currentHeroIndex: PropTypes.number,
  imageData: PropTypes.array,
  captionData: PropTypes.array,
  changeSlide: PropTypes.func.isRequired,
  imageSlides: PropTypes.array,
  onLoad: PropTypes.func.isRequired,
  interval: PropTypes.number,
  autoplay: PropTypes.bool,
  startAutoplay: PropTypes.func,
  liveAuction: PropTypes.object
};

export default HomePageHero;
