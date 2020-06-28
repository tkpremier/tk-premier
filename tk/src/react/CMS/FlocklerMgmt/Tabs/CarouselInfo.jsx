import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import serialize from 'form-serialize';
import PhillipsCarouselEditor from '../../CarouselEditor/CarouselEditor';

import { defaultProps } from '../../../PhillipsCarousel/proptypes';
import { symmetricDifferenceWith } from 'ramda';
/*
{
  active: PropTypes.bool,
  buyNowSaleNumber: PropTypes.string,
  carouselAreaId: PropTypes.number,
  carouselId: PropTypes.number,
  carouselItems: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape(lotPropTypes),
    PropTypes.shape(makerPropTypes)
  ])),
  departmentId: PropTypes.number,
  carouselDesc: PropTypes.string,
  displayOrder: PropTypes.number,
  itemCount: PropTypes.number,
  carouselTitle: PropTypes.string
}
*/
/*
  Local State
  {
    carouselData: [],
    currentId: 0,
    carouselDataFetched: false
  }
*/
const carouselInfoInputProps = [
  {
    id: 'active',
    name: 'active',
    label: 'Active',
    type: 'radio'
  },
  {
    id: 'carouselTitle',
    name: 'carouselTitle',
    label: 'Carousel Title',
    type: 'text'
  },
  {
    id: 'carouselDesc',
    name: 'carouselDesc',
    label: 'Carousel Description',
    type: 'text'
  },
  {
    id: 'carouselDesc',
    name: 'carouselDesc',
    label: 'Carousel Description',
    type: 'text'
  },
  {
    id: 'carouselItems',
    name: 'carouselItems',
    type: 'carouselItems'
  }
];

const getInitData = flocklerId => ({
  carouselAreaId: 4,
  carouselTypeId: 1,
  displayOrder: 1,
  flocklerId
});

const getInitDefault = flocklerId => ({
  ...defaultProps,
  ...getInitData(flocklerId)
});
const CarouselForm = ({ onCarouselItemSubmit, onSubmit }) => {
  const { selectedEditorial } = useSelector(state => state);
  const [localState, setState] = useState({
    carousels: selectedEditorial.carousels || [],
    currentId: selectedEditorial.flocklerId,
    isNew: selectedEditorial.carousels?.length === 0
  });
  const { carousels, currentId, isNew } = localState;
  useEffect(() => {
    setState({
      carousels: selectedEditorial.carousels || [],
      currentId: selectedEditorial.flocklerId,
      isNew: selectedEditorial.carousels?.length === 0
    });
  }, [selectedEditorial]);
  const handleSubmit = (formData) => {
    if (isNew) {
      onSubmit('carousels', {
        ...getInitDefault(currentId),
        ...formData,
        method: 'POST'
      });
      return;
    }
    onSubmit('carousels', {
      ...getInitData(currentId),
      ...carousels[0],
      ...formData,
      method: 'PUT'
    });
  };

  const handleItem = (lot, method) => {
    const carouselItemId = method === 'POST' ? 0 : lot.carouselItemId;
    const data = {
      active: lot.active,
      carouselItemId,
      carouselId: lot.carouselId,
      lotNumber: lot.lotNumber,
      saleNumber: lot.saleNumber,
      displayOrder: parseInt(lot.displayOrder, 10)
    };
    onCarouselItemSubmit(data, method);
  }
  const data = carousels.length > 0
    ? { ...carousels[0] }
    : { ...getInitDefault(currentId) };

  return (
    <PhillipsCarouselEditor
      formClassName="editorial__mgmt__carousel"
      classNames="carousel-editor"
      contextId={currentId}
      {...data}
      isNew={carousels.length > 0 ? false : isNew}
      handleItem={handleItem}
      onSubmit={handleSubmit}
    />
  );
};

export default CarouselForm;