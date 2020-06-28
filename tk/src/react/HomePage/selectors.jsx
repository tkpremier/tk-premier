import React from 'react';
import { createSelector } from 'reselect';
import PhillipsLot from '../PhillipsLot/PhillipsLot';
import PhillipsMaker from '../PhillipsMaker/PhillipsMaker';
import applyEditOverlay from '../utils/applyEditOverlay';
import getCarouselType from '../PhillipsCarousel/utils/getCarouselType';

const editableSelector = ({ editable }) => editable;

const getCarouselData = (state, props) => props;
const makeCarouselChildren = () =>
  createSelector([editableSelector, getCarouselData], (editable, carouselData) => {
    const { carouselItems, carouselId, carouselTypeId } = carouselData;
    const carouselType = getCarouselType(carouselTypeId);
    switch (carouselType) {
      case 'lot':
        return {
          ...carouselData,
          children: carouselItems.map(lot => {
            const Child = editable ? applyEditOverlay(editable, PhillipsLot, carouselType) : PhillipsLot;
            return (
              <Child
                {...lot}
                buyNowsaleNumber={carouselData.buyNowsaleNumber}
                carouselId={carouselId}
                editable={editable}
                imageTransformation="HomePageCarousel"
                key={`carousel-${carouselId}-item-${lot.carouselItemId}`}
                lotListDisabled
                showLotNumber={false}
                totalCount={carouselItems.length}
                transformation="HomePageCarousel"
              />
            );
          })
        };
      case 'maker':
        return {
          ...carouselData,
          children: carouselItems.map(maker => {
            const Child = editable ? applyEditOverlay(editable, PhillipsMaker, carouselType) : PhillipsMaker;
            return (
              <Child
                {...maker}
                key={`carousel-${carouselId}-item-${maker.carouselItemId}`}
                editable={editable}
                carouselId={carouselId}
                imageTransformation="HomePageCarousel"
                totalCount={carouselItems.length}
              />
            );
          })
        };
      default:
        return {
          name: 'No Type set',
          children: []
        };
    }
  });

export { makeCarouselChildren };
