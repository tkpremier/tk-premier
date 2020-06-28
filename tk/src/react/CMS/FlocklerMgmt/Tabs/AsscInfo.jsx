import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import MakerPicker from '../MakerPicker';
/**
 * @function MakerInfo
 * @param {object} data Editorial Data.
 * @description Read & edit following editorial properties:
 *  associatedSalesList - dataType === array
 *  makerId - MakerSearch
 * @returns {object} Potentitally Updated data
 */

const styles = () => ({
  root: {}
});



const MakerInfo = ({ onSubmit, data }) => {
  const setMakerId = (makerId) => {
    onSubmit('makerId', { makerId });
  };
  return (
    <MakerPicker
      makerName={data.makerName}
      makerId={data.makerId}
      onSelect={setMakerId}
    />

  );
};

export default withStyles(styles)(MakerInfo);
