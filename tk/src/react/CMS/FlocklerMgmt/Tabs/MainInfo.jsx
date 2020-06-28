import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import format from 'date-fns/format';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import { getPadding } from '../styles';
import { editorialPropTypes } from '../../../PropTypes/proptypes';
/**
 * @function MainInfo
 * @param {object} data Editorial Data.
 * @description Read & edit following editorial properties:
 *  title - readonly
 *  flocklerId - readonly
 *  articleUrl - readonly
 *  publishDate - readonly
 *  summary - readonly
 *  coverUrl - readonly
 *  section - readonly
 *  state
 *  displayType
 * @returns {object} Potentitally Updated data
 */
const mainInfoInputProps = [
  {
    id: 'state',
    name: 'state',
    label: 'Active Status',
    type: 'select',
    options: [
      {
        label: 'Inactive',
        value: 1
      },
      {
        label: 'Preview',
        value: 2
      },
      {
        label: 'Active',
        value: 3
      }
    ]
  },
  {
    id: 'display-type',
    name: 'displayType',
    label: 'Display Type',
    type: 'select',
    options: [
      {
        label: 'Not Featured',
        value: 1
      },
      {
        label: 'Highlight',
        value: 2
      },
      {
        label: 'Left Feature',
        value: 3
      },
      {
        label: 'Right Feature',
        value: 4
      }
    ]
  },
  {
    id: 'article-url',
    name: 'articleUrl',
    label: 'Article Url',
    readOnly: true,
    fullWidth: true
  },
  {
    id: 'publish-date',
    name: 'publishDate',
    label: 'Publish Date',
    readOnly: true,
    fullWidth: true,
    type: 'date'
  },
  {
    id: 'section',
    name: 'section',
    label: 'Section',
    readOnly: true,
    fullWidth: true
  },
  {
    id: 'summary',
    name: 'summary',
    label: 'Summary',
    type: 'textarea',
    readOnly: true,
    fullWidth: true,
    multiLine: true,
    rowsMax: '4'
  },
  {
    id: 'cover-url',
    name: 'coverUrl',
    label: 'Cover Url',
    type: 'image'
  }
];

const fullWidth = {
  width: '100%'
};
const styles = () => ({
  root: {
    ...fullWidth,
    ...getPadding(8)
  },
  containedPrimary: {

  },
  // readOnly: {

  // },
  table: {
    ...fullWidth,
    overflowX: 'auto'
  }
});
const MainInfo = ({ activeView, classes, data, onSubmit }) => {
  const readOnlies = ['articleUrl', 'publishDate', 'summary', 'section'];
  const form = ['state', 'displayType'];
  const inputNames = mainInfoInputProps.map(({ name }) => name);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = serialize(e.target, true);
    onSubmit('mainInfo', {
      ...formData,
      flocklerId: data.flocklerId
    });
  };
  const readOnlyBps = activeView === 'form'
    ? {
      xs: 12,
      sm: 7,
      md: 6
    }
    : {
      xs: 12
    };
  const imageBps = activeView === 'form'
    ? {
      xs: 12,
      sm: 5,
      md: 6
    }
    : {
      xs: 12
    };

  return (
    <Grid container spacing={16}>
      <Grid item {...readOnlyBps}>
        <Paper classes={{ root: classes.root }}>
          {readOnlies.map((input) => {
            const i = inputNames.indexOf(input);
            const inputProp = mainInfoInputProps[i];
            const value = inputProp.type === 'date'
              ? format(new Date(data[inputProp.name]), 'yyyy-MM-dd')
              : data[inputProp.name];
            return (
              <TextInput
                {...inputProp}
                key={`${input}-${value}`}
                value={value}
              />
            );
          })}
        </Paper>
        <Paper classes={{ root: classes.root }}>
          <Grid
            container
            spacing={8}
            component="form"
            justify="center"
            onSubmit={handleSubmit}
          >
            {form.map((input) => {
              const i = inputNames.indexOf(input);
              const inputProp = mainInfoInputProps[i];
              return (
                <Grid key={`${input}-${data[inputProp.name]}`} item xs={12} sm={6}>
                  <SelectInput
                    {...inputProp}
                    fullWidth
                    value={data[inputProp.name]}
                  />
                </Grid>
              );
            })}
            <Button
              variant="outlined"
              type="submit">Update</Button>
          </Grid>


        </Paper>
      </Grid>
      <Grid item {...imageBps}>
        <Paper classes={{ root: classes.root }}>
          <img src={data.coverUrl} alt={data.title} title={data.title} />
        </Paper>
      </Grid>
    </Grid>
  );
};

MainInfo.propTypes = {
  data: PropTypes.shape(editorialPropTypes).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default withStyles(styles)(MainInfo);
