import React from 'react';
import { Grid, Input, InputLabel, TextField, withStyles } from '@material-ui/core';
import ReactCkeditor from '../../../../components/reactckeditor';

const styles = theme => ({
  outlined: {
    border: '1px solid #000',
    borderRadius: '3px',
    padding: '15px',
    [theme.breakpoints.up('sm')]: {
      flexBasis: `calc(50% -  ${theme.spacing.unit * 2}px)`,
      marginRight: theme.spacing.unit * 2
    }
  },
  root: {
    padding: '15px',
    textAlign: 'left'
  },
  inputLabel: {
    width: '100%',
    textAlign: 'left'
  },
  inputLabelWithMarginTop: {
    width: '100%',
    textAlign: 'left',
    marginTop: theme.spacing.unit * 2
  },
  htmlEditor: {
    height: '150px',
    overflowY: 'scroll',
    width: '100%',
    textAlign: 'left'
  },
  emailInput: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  textInput: {
    marginTop: theme.spacing.unit * 2,
    width: '100%'
  }
});

const BuyNowDetails = ({ classes, selectedAuction, editDetails }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        {/*
          Html Editor for BuyNow Titles
        */}
        <InputLabel
          shrink
          className={classes.inputLabel}
        >
          {'Buy Now Title (HTML)'}
        </InputLabel>
        <ReactCkeditor
          editorId={`buy-now-title-${selectedAuction.saleNumber}`}
          className={classes.htmlEditor}
          data={{
            propName: 'buyNowTitle',
            propValue: selectedAuction.buyNowTitle,
            type: 'markup'
          }}
          onBlur={data => editDetails('buyNowTitle', data)}
        />
        <InputLabel
          shrink
          className={classes.inputLabelWithMarginTop}
        >
          {'Buy Now Description (HTML)'}
        </InputLabel>
        <ReactCkeditor
          editorId={`buy-now-desc-${selectedAuction.saleNumber}`}
          className={classes.htmlEditor}
          data={{
            propName: 'buyNowDesc',
            propValue: selectedAuction.buyNowDesc,
            type: 'markup'
          }}
          onBlur={data => editDetails('buyNowDesc', data)}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(BuyNowDetails);
