import React from 'react';
import serialize from 'form-serialize';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { getPadding } from '../styles';
import TextInput from '../TextInput';
import { editorialPropTypes } from '../../../PropTypes/proptypes';

const styles = () => ({
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paperRoot: {
    ...getPadding('8px')
  },
  root: {
    backgroundColor: '#000'
  }
});
/**
 * AltInfo - Form to update alternate data
 *  [alternateTitle, alternateDescription]
 */
const AltInfo = ({ classes, data, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = serialize(e.target, true);
    onSubmit('alternateInfo', formData);
  };
  return (
    <Grid container spacing={16} component="form" onSubmit={handleSubmit}>
      <Grid item xs={12} sm={4} md={5}>
        <Paper classes={{ root: classes.paperRoot }}>
          <TextInput
            label="Alternate Title"
            id="alt-title"
            name="alternateTitle"
            value={data.alternateTitle}
          />

        </Paper>
      </Grid>
      <Grid classes={{ item: classes.flexCenter }} item xs={12} sm={4} md={2} justify="center" alignItems="center">
        <Button type="submit">Update</Button>
      </Grid>
      <Grid item xs={12} sm={4} md={5}>
        <Paper classes={{ root: classes.paperRoot }}>

          <TextInput
            id="alt-title"
            name="alternateDescription"
            label="Alternate Description"
            value={data.alternateDescription}
            multiLine
            rowsMax="6"
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

AltInfo.defaultProps = {
  classes: { root: {} }
};
AltInfo.propTypes = {
  classes: PropTypes.shape({ root: PropTypes.object }),
  data: PropTypes.shape(editorialPropTypes).isRequired,
  onSubmit: PropTypes.func.isRequired
};
export default withStyles(styles)(AltInfo);
