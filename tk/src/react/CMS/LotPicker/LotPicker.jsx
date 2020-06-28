/* eslint-disable import/prefer-default-export */
import React, { Fragment, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'; import Button from '@material-ui/core/Button';
import isNull from 'lodash/isNull';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import TextInput from '../FlocklerMgmt/TextInput';
import SelectInput from '../FlocklerMgmt/SelectInput';
import PhillipsImage from '../../PhillipsImage/PhillipsImage';
import { displayOrderFlow } from '../CarouselEditor/CarouselItemEditor';
import handleResponse from '../../../utils/handleresponse';
import { getPadding } from '../FlocklerMgmt/styles';

const styles = () => ({
  paperRoot: {
    ...getPadding('8px')
  },
  root: {
    backgroundColor: '#000'
  }
});
export const getLotData = (saleNumber, lotNumber) => fetch(`/api/lots/GetAuctionLot?saleNumber=${saleNumber}&lotNumber=${lotNumber}`).then(handleResponse);

const saleNumRegex = /^[aA-zZ][aA-zZ][01][0-9][01][0-9][012][0-9]$/i;

const LotPicker = ({
  classes,
  contextId,
  itemCount,
  lotNumber,
  onSubmit,
  saleNumber,
  showDisplayOrder
}) => {
  const [errorMsg, setError] = useState('');
  const [cId, setCId] = useState(contextId);
  const [lotNum, setlotNum] = useState(lotNumber);
  const [validSaleNumber, setSaleNum] = useState(saleNumber);
  const [data, setData] = useState([]);
  const handleSaleNumChange = e => saleNumRegex.test(e.target.value)
    ? setSaleNum(e.target.value)
    : '';
  const handleLotNumChange = (e) => {
    if (!Number.isNaN(parseInt(e.target.value, 10))) {
      setlotNum(parseInt(e.target.value, 10));
    }
  };
  useEffect(() => {
    if (!isNull(cId) && cId !== contextId) {
      setlotNum(0);
      setSaleNum('');
      setData([]);
      setCId(contextId);
    }
  }, [cId, contextId])
  useEffect(() => {
    if (
      validSaleNumber.length > 0
    ) {
      if (!Number.isNaN(parseInt(lotNum, 10))) {
        getLotData(validSaleNumber, lotNum)
          .then((res) => {
            if (errorMsg.length > 0) {
              setError('');
            }
            setData([res]);
          })
          .catch((err) => {
            if (data.length > 0) {
              setData([]);
            }
            setError(err.message);
          });
      }
    }
  }, [lotNum, validSaleNumber, errorMsg]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.length > 0) {
      const formData = serialize(e.target, true);
      onSubmit({
        ...formData,
        ...data[0]
      });
      setData([]);
    }
  };
  return (
    <Paper classes={{ root: classes.paperRoot }}>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Sale Number"
          type="text"
          name="saleNumber"
          id="sale-number"
          value={validSaleNumber}
          onChange={handleSaleNumChange}
        />
        <TextInput
          label="Lot Number"
          type="number"
          name="lotNumber"
          id="lot-number"
          value={lotNum}
          onChange={handleLotNumChange}
        />
        {showDisplayOrder
          ? (
            <SelectInput
              id="display-order"
              name="displayOrder"
              label="Display Order"
              margin="none"
              options={displayOrderFlow(1, itemCount + 2)}
              value={itemCount + 1}
            />
          )
          : null
        }
        <Button type="submit">Add Lot</Button>
      </form>
      {errorMsg.length > 0
        ? <p>{errorMsg}</p>
        : data.length > 0
          ? (
            <GridList>
              {data.map(lot => (
                <GridListTile key={`${lot.saleNumber}-${lot.lotNumber}`}>
                  <PhillipsImage
                    alt={`${lot.makerName} - ${lot.description}`}
                    imagePath={lot.imagePath}
                    transformation="SingleCell"
                    cloudinary
                    version={lot.imageVersion}
                    width={251}
                    height={320}
                  />
                  <GridListTileBar
                    subtitle={lot.makerName}
                    title={lot.description}
                  />
                </GridListTile>
              ))}
            </GridList>

          )
          : null
      }
    </Paper>
  )
};
LotPicker.defaultProps = {
  itemCount: 0,
  lotNumber: 0,
  contextId: null,
  saleNumber: '',
  showDisplayOrder: false
};
LotPicker.propTypes = {
  classes: PropTypes.shape({
    paperRoot: PropTypes.string
  }).isRequired,
  contextId: PropTypes.number,
  itemCount: PropTypes.number,
  lotNumber: PropTypes.number,
  saleNumber: PropTypes.string,
  showDisplayOrder: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(LotPicker);
