import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import isNull from 'lodash/isNull';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TextInput from './TextInput';
import MakerService from '../../../services/MakerService';

const MakerPicker = ({ makerId: initId, makerName, onSelect }) => {
  const makerService = new MakerService();
  const [makerId, setMakerId] = useState(initId);
  const [makers, setMakers] = useState([]);
  useEffect(() => {
    if (initId === makerId) {
      setMakers([]);
    }
    if (initId !== makerId) {
      setMakerId(initId);
    }
  }, [initId]);
  const handleChange = (e) => {
    if (e.target.value.length > 2) {
      makerService.getMakerByName(e.target.value)
        .then(res => setMakers(res.makers));
    }
  };
  const handleSelect = m => () => {
    onSelect(m.makerId);
    setMakerId(m.makerId);
  }
  return (
    <Grid container spacing={16}>
      <Grid item xs={4} md={3}>
        <Paper>
          {!isNull(makerId)
            ? (

              <Chip label={makerName} clickable={false} variant="outlined" />

            )
            : <p>No makers associated</p>
          }
        </Paper>
      </Grid>
      <Grid item xs={8} md={4}>
        <Paper>

          <TextInput
            label="Search by name"
            id="maker-name"
            name="makerName"
            onChange={handleChange}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={5}>
        <Paper>
          {makers.length > 0
            ? makers.map(m => <Chip onClick={handleSelect(m)} label={m.makerName} />)
            : null
          }
        </Paper>

      </Grid>
    </Grid>
  );
};

MakerPicker.defaultProps = {
  makerId: null,
  makerName: ''
};

MakerPicker.propTypes = {
  makerId: PropTypes.number,
  makerName: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default MakerPicker;
