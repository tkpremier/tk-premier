import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';
import HomePageHero from './HomePageHero.container';
import Sticky from './Sticky';
import PhillipsGrid from '../components/phillipsgrid';
import LowerBannerImg from '../components/lowerbannerimg';
import BuyNowCarousel from './BuyNow.container';
import PhillipsVideo from './HomePageVideo';
import PrivateServices from '../PrivateServices/PrivateServices.container';
import HomePageCarousel from './HomePageCarousel.container';
import DisplayComponent from '../components/displaycomponent';
import EditorialItem from '../components/editorialitem';
import applyEditOverlay from '../utils/applyEditOverlay';
import CMSControls from '../CMS/CMSControls.container';
import ConsignmentBannerCMS from '../Consignments/ConsignmentBannerCMS';
import VideoForm from '../CMS/HomePage/VideoForm';
import carouselPropTypes from '../PhillipsCarousel/proptypes';
import getCarouselType from '../PhillipsCarousel/utils/getCarouselType';

const HomePage = ({
  buyNowCarousel,
  carouselOne,
  carouselTwo,
  editable,
  featuredContent,
  featuredSlider,
  featuredVideos,
  lowerBanner,
  sticky,
  userCarousel
}) => {
  const gridItemProps = [];
  const gridItems = featuredContent.map((editorialItem, index) => {
    const itemProps = { ...editorialItem, key: index, totalCount: featuredContent.length };
    gridItemProps.push(itemProps);
    return applyEditOverlay(editable, EditorialItem, 'featuredContent')(itemProps);
  });
  return (
    <section className="homepage" id="homepage">
      {!editable && sticky && sticky.isActive ? <Sticky {...sticky} /> : null}
      <CMSControls editable={editable} elementProps={featuredSlider} addType="slide" showAdd>
        <HomePageHero editable={editable} interval={5000} autoplay={!editable} />
      </CMSControls>
      <div className="body-content grid">
        {!isNull(userCarousel) && userCarousel.carouselItems.length > 0 ? (
          <div className="container">
            <HomePageCarousel {...userCarousel} carouselTypeId={1} />
          </div>
        ) : null}
        {!isEmpty(featuredVideos) ? <PhillipsVideo featuredVideos={featuredVideos} /> : null}
        {editable ? <VideoForm data={featuredVideos} /> : null}

        <div className="container">
          {!isNull(carouselOne) ? (
            <CMSControls
              carouselId={carouselOne.carouselId}
              editable={editable}
              elementProps={carouselOne}
              editType="carousel"
              addType={getCarouselType(carouselOne.carouselTypeId)}
              showEdit
              showAdd
            >
              <HomePageCarousel editable={editable} {...carouselOne} />
            </CMSControls>
          ) : null}
          <section className="row sales-grid">
            <CMSControls editable={editable} elementProps={gridItemProps} addType="featuredContent" showAdd>
              <PhillipsGrid
                editable={editable}
                header="Features"
                listClass="featuredContent"
                itemClass="grid-item"
                itemsShown={6}
                childCount={gridItems.length}
              >
                {gridItems}
              </PhillipsGrid>
            </CMSControls>
          </section>
        </div>
      </div>
      {editable || !isNull(buyNowCarousel) ? (
        <CMSControls
          carouselId={buyNowCarousel.carouselId || 0}
          editable={editable}
          elementProps={buyNowCarousel}
          addType={getCarouselType(buyNowCarousel.carouselId)}
          editType="carousel"
          showAdd
          showEdit
        >
          <BuyNowCarousel carouselType="carouselItem" {...buyNowCarousel} editable={editable} />
        </CMSControls>
      ) : null}
      <PrivateServices />

      {/* Below Hidden Articker Bulletin on Homepage. Do not activate unitl official launch */}
      {/* {!editable ? (
        <div className="homepage__banner-module container">
          <h2 className="homepage__banner-module__title">Articker Bulletin</h2>
          <div className="homepage__banner-module__info homepage__banner-module__info--bulletin">
          An algorithmic roundup of the most important stories in the art world.
            &nbsp;&nbsp;&nbsp;
            <a className="homepage__banner-module__cta" href="/bulletin" alt="Go to Articker Bulletin">Explore</a>
          </div>
        </div>
      ) : null} */}
      <ConsignmentBannerCMS
        bannerId="Bottom"
        consignmentText="We are inviting consignments for our upcoming auctions."
      />
      {!isNull(carouselTwo) || editable ? (
        <div className="body-content">
          <div className="container">
            <CMSControls
              carouselId={carouselTwo.carouselId}
              editable={editable}
              elementProps={carouselTwo}
              editType="carousel"
              addType={getCarouselType(carouselTwo.carouselTypeId)}
              showEdit
              showAdd
            >
              <HomePageCarousel editable={editable} {...carouselTwo} />
            </CMSControls>
          </div>
        </div>
      ) : null}
      <DisplayComponent if={editable || !isNull(lowerBanner)}>
        <CMSControls editable={editable} elementProps={lowerBanner} editType="lowerBanner" showEdit>
          <LowerBannerImg {...lowerBanner} />
        </CMSControls>
      </DisplayComponent>
    </section>
  );
};

HomePage.defaultProps = {
  carouselOne: null,
  carouselTwo: null,
  buyNowCarousel: [],
  editable: false,
  featuredContent: [],
  featuredSlider: [],
  featuredVideos: [],
  loaded: true,
  lowerBanner: null,
  userCarousel: null
};
HomePage.propTypes = {
  buyNowCarousel: PropTypes.shape(carouselPropTypes),
  carouselOne: PropTypes.arrayOf(carouselPropTypes),
  carouselTwo: PropTypes.shape(carouselPropTypes),
  editable: PropTypes.bool,
  featuredContent: PropTypes.arrayOf(PropTypes.object),
  featuredSlider: PropTypes.arrayOf(PropTypes.object),
  featuredVideos: PropTypes.arrayOf(PropTypes.object),
  loaded: PropTypes.bool,
  lowerBanner: PropTypes.object,
  sticky: PropTypes.object,
  userCarousel: PropTypes.object
};

export default HomePage;
