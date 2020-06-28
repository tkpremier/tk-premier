import React, { Fragment, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import isNull from 'lodash/isNull';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import CarouselItemEditor, { CarouselItemOverlay } from './CarouselItemEditor';
import PhillipsCarousel from '../../PhillipsCarousel/PhillipsCarousel';
import PhillipsLot from '../../PhillipsLot/PhillipsLot';
import PhillipsMaker from '../../PhillipsMaker/PhillipsMaker';
import LotPicker from '../LotPicker/LotPicker';
import TextInput from '../FlocklerMgmt/TextInput';
import carouselPropTypes, { defaultProps } from '../../PhillipsCarousel/proptypes';

const itemDefaultState = { item: null, editType: '' };

const styles = () => ({
  checked: {
    backgroundColor: '#f2f2f2',
    color: '#f2f2f2'
  },
  root: {
    backgroundColor: '#000'
  }
});

const PhillipsCarouselEditor = (props) => {
  const {
    active,
    carouselId,
    carouselAreaId,
    carouselDesc,
    carouselItems,
    carouselTitle,
    carouselTypeId,
    classes,
    classNames,
    children,
    contextId,
    flocklerId,
    formClassName,
    isNew,
    handleItem,
    onItemEdit,
    onSubmit } = props;
  const carouselFormData = {
    active,
    carouselId,
    carouselTypeId,
    carouselAreaId,
  }
  const [cId, setCId] = useState(contextId);
  const [id, setId] = useState(carouselId);
  const [type, setType] = useState(carouselTypeId);
  const [selectedItem, setItem] = useState(itemDefaultState);
  const [isActive, setStatus] = useState(active);
  useEffect(() => {
    if (id === 0 && carouselId !== id) {
      setId(carouselId);
    }
    if (!isNull(contextId) && cId !== contextId) {
      setId(carouselId);
      setCId(contextId);
      setStatus(active);
    }
  }, [cId, contextId, active, carouselId]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = serialize(e.target, { hash: true });
    onSubmit({
      ...data,
      active: isActive
    });
  }
  const handleCancelItem = () => {
    setItem(itemDefaultState);
  }
  const handleItemSubmit = (payload) => {
    handleItem(payload, selectedItem.editType);
    setItem(itemDefaultState);
  }
  const handleItemAdd = item => handleItem({
    ...item,
    carouselId: id,
    active: true
  }, 'POST');
  const handleItemEdit = item => (e) => {
    // handleItem(item, e.target.value);
    setItem({
      item,
      editType: e.target.value
    });
  };

  const Child = type === 1 ? PhillipsLot : PhillipsMaker;
  const getUniqueId = item => type === 1 ? `${item.saleNumber}-${item.lotNumber}` : `${item.makerId}`;
  return (
    <Fragment>
      <Grid container spacing={16} component="form" onSubmit={handleSubmit}>
        <Grid
          item
          xs={12}
        >
          <Paper>
            <TextInput
              label="Carousel Title"
              name="carouselTitle"
              id="carouselTitle"
              value={carouselTitle}
            />
            <TextInput
              label="Carousel Description"
              name="carouselDesc"
              id="carouselDesc"
              value={carouselDesc}
            />
            <FormControlLabel
              control={(
                <Switch
                  classes={{
                    checked: classes.checked,
                    iconChecked: classes.root
                  }}
                  id="active"
                  checked={isActive}
                  onChange={() => setStatus(!isActive)}
                  value="active"
                  color="primary"
                />
              )}
              name="active"
              label={isActive ? 'Active' : 'Inactive'}
            />
            <Button type="submit">{`${isNew ? 'Create' : 'Edit'} Carousel`}</Button>
          </Paper>
        </Grid>
      </Grid>
      {
        !isNull(selectedItem.item)
          ? (
            <Grid
              container
              spacing={16}
            >
              <Grid
                item
                xs={12}
              >
                <CarouselItemEditor
                  itemCount={carouselItems.length}
                  {...selectedItem.item}
                  editType={selectedItem.editType}
                  onSubmit={handleItemSubmit}
                  onCancel={handleCancelItem}
                />
              </Grid>
            </Grid>
          )
          : !isNew
            ? (
              <Grid
                container
                spacing={16}
              >
                <Grid
                  item
                  xs={12}
                >
                  <LotPicker onSubmit={handleItemAdd} itemCount={carouselItems.length} showDisplayOrder />
                </Grid>
              </Grid>
            )
            : null
      }


      {carouselItems.length > 0
        ? (
          <Grid
            container
            spacing={16}
          >
            <Grid
              item
              xs={12}
            >
              <PhillipsCarousel
                classNames={classNames}
                sizes={{
                  xs: 1,
                  sm: 1,
                  md: 2,
                  lg: 3,
                  xl: 3
                }}
              >
                {carouselItems.map(item => (
                  <CarouselItemOverlay
                    key={`${carouselId}-${getUniqueId(item)}`}
                    handleEdit={handleItemEdit({ ...item, carouselId })}
                  >
                    <Child
                      editable
                      {...item}
                    />
                  </CarouselItemOverlay>
                ))}
              </PhillipsCarousel>
            </Grid>

          </Grid>
        )
        : null
      }
    </Fragment>
  )
};

PhillipsCarouselEditor.defaultProps = {
  ...defaultProps,
  children: [],
  contextId: null,
  formClassName: '',
  isNew: false
};

PhillipsCarouselEditor.propTypes = {
  ...carouselPropTypes,
  children: PropTypes.arrayOf(PropTypes.element),
  contextId: PropTypes.number,
  formClassName: PropTypes.string,
  isNew: PropTypes.bool,
  onAddItem: PropTypes.func.isRequired,
  onItemEdit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
// export default PhillipsCarouselEditor;
export default withStyles(styles)(PhillipsCarouselEditor);