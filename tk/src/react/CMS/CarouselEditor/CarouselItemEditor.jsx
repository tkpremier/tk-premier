import React, { Fragment, useState } from 'react';
import range from 'lodash/range';
import flow from 'lodash/flow';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import serialize from 'form-serialize';
import SelectInput from '../FlocklerMgmt/SelectInput';
import TextInput from '../FlocklerMgmt/TextInput';
import { getPadding } from '../FlocklerMgmt/styles';

const styles = () => ({
  paperRoot: {
    ...getPadding('8px')
  },
  root: {
    backgroundColor: '#000'
  }
});

const createDisplayOrderRange = (numArr = []) => numArr.map(int => ({
  label: int,
  value: int
}));
export const displayOrderFlow = flow(range, createDisplayOrderRange);

export const CarouselItemOverlay = props => (
  <div className="item-editor">
    {props.children}
    <div className="hover-dash">
      <button
        className="edit"
        value="PUT"
        onClick={props.handleEdit}
        type="button"
      >
        Edit
      </button>
      <button
        className="delete"
        value="DELETE"
        onClick={props.handleEdit}
        type="button"
      >
        Delete
      </button>
    </div>
  </div>
);

CarouselItemOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  handleEdit: PropTypes.func.isRequired
};

const CarouselItemEditor = ({
  active,
  classes,
  editType = '',
  displayOrder,
  itemCount,
  lotNumber,
  onCancel,
  onSubmit,
  saleNumber,
  ...props
}) => {
  const [isActive, setStatus] = useState(active);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...props,
      lotNumber,
      saleNumber,
      ...serialize(e.target, true),
      active: isActive
    });
  };
  return (
    <Paper classes={{ root: classes.paperRoot }} component="form" onSubmit={handleSubmit}>
      {editType.toUpperCase() === 'DELETE'
        ? <span>Are you sure you want to delete this item?</span>
        : (
          <Fragment>
            <TextInput
              label="Sale Number"
              type="text"
              name="saleNumber"
              id="sale-number"
              value={saleNumber}
            />
            <TextInput
              label="Lot Number"
              type="text"
              name="lotNumber"
              id="lot-number"
              value={lotNumber}
            />
            <FormControlLabel
              control={(
                <Switch
                  id="active"
                  checked={isActive}
                  onChange={() => setStatus(!isActive)}
                  value="active"
                  color="primary"
                />
              )}
              name="active"
              label={active ? 'Active' : 'Inactive'}
            />

            <SelectInput
              id="display-order"
              name="displayOrder"
              label="Display Order"
              margin="none"
              options={displayOrderFlow(1, itemCount + 1)}
              value={displayOrder}
            />
          </Fragment>
        )
      }
      <Button type="submit">{`${editType.toUpperCase() === 'DELETE' ? 'Delete' : 'Edit'} Item`}</Button>
      <Button type="button" onClick={onCancel}>Cancel</Button>
    </Paper>
  )
};

CarouselItemEditor.propTypes = {
  active: PropTypes.bool.isRequired,
  carouselItemId: PropTypes.number.isRequired,
  classes: PropTypes.shape({
    paperRoot: PropTypes.string
  }).isRequired,
  displayOrder: PropTypes.number.isRequired,
  editType: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired
};

export default withStyles(styles)(CarouselItemEditor);
