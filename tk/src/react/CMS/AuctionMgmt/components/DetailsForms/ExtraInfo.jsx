import React from 'react';
import { Grid, Input, InputLabel, TextField, withStyles } from '@material-ui/core';
import { isNull } from 'lodash/fp';
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
    width: '100%'
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


const ExtraInfoForm = ({ classes, editDetails, selectedAuction }) => {
  return (
    <Grid container className={classes.root}>
      <Grid
        className={classes.outlined}
        item
        xs={12}
        sm={6}
      >
        {/*
          Html Editor for extraInfo
        */}
        <InputLabel
          shrink
          className={classes.inputLabel}
        >
          {'Extra Info (HTML)'}
        </InputLabel>
        <ReactCkeditor
          editorId={`extra-info-${selectedAuction.saleNumber}`}
          className={classes.htmlEditor}
          data={{
            propName: 'extraInfo',
            propValue: selectedAuction.extraInfo,
            type: 'markup'
          }}
          onBlur={data => editDetails('extraInfo', data)}
        />
        <InputLabel
          shrink
          className={classes.inputLabelWithMarginTop}
        >
          {'Extra Info - Chinese (HTML)'}
        </InputLabel>
        <ReactCkeditor
          editorId={`c-extra-info-${selectedAuction.saleNumber}`}
          className={classes.htmlEditor}
          data={{
            propName: 'cExtraInfo',
            propValue: selectedAuction.cExtraInfo,
            type: 'markup'
          }}
          onBlur={data => editDetails('cExtraInfo', data)}
        />
      </Grid>
      <Grid
        className={classes.outlined}
        item
        xs={12}
        sm={6}
      >
        {/*
          Html Editor for auctionDetails
        */}
        <InputLabel
          className={classes.inputLabel}
          shrink
        >
          {'Auction Details (HTML)'}
        </InputLabel>
        <ReactCkeditor
          editorId={`auction-details-${selectedAuction.saleNumber}`}
          className={classes.htmlEditor}
          data={{
            propName: 'auctionDetails',
            propValue: selectedAuction.auctionDetails,
            type: 'markup'
          }}
          onBlur={data => editDetails('auctionDetails', data)}
        />
        <InputLabel
          className={classes.inputLabel}
          shrink
        >
          {'Auction Details - Chinese (HTML)'}
        </InputLabel>
        <ReactCkeditor
          editorId={`auction-details-chinese-${selectedAuction.saleNumber}`}
          className={classes.htmlEditor}
          data={{
            propName: 'cAuctionDetails',
            propValue: selectedAuction.cAuctionDetails,
            type: 'markup'
          }}
          onBlur={data => editDetails('cAuctionDetails', data)}
        />

        {/*
          Text input for auctionDetailsSmall
        */}
        <TextField
          className={classes.textInput}
          label="Shortened Auction Details"
          placeholder="Ex: New York Auction 4 April 2019"
          InputProps={{ fullWidth: true }}
          InputLabelProps={{ shrink: true }}
          onChange={e => editDetails('auctionDetailsSmall', e.target.value)}
          value={isNull(selectedAuction.auctionDetailsSmall) ? '' : selectedAuction.auctionDetailsSmall}
        />        
      </Grid>
      <Grid
        item
        className={classes.outlined}
        xs={12}
        sm={6}
      >
        {/*
          Text input for noLots
        */}
        <TextField
          className={classes.textInput}
          label="Withdrawn Lots"
          placeholder="Withdrawn lots separated by commas. Ex: 24, 45, 51"
          InputLabelProps={{ shrink: true }}
          // InputProps={{ fullWidth: true }}
          onChange={e => editDetails('noLots', e.target.value)}
          value={isNull(selectedAuction.noLots) ? '' : selectedAuction.noLots}
        />
        {/*
          Virtual Gallery ids
        */}
        <TextField
          className={classes.textInput}
          label="Virtual Galleries"
          placeholder="Virtual Gallery ids separated by commas. Ex: 13748, 13546, 12345"
          InputLabelProps={{ shrink: true }}
          // InputProps={{ fullWidth: true }}
          onChange={e => editDetails('virtualGalleryIds', e.target.value)}
          value={isNull(selectedAuction.virtualGalleryIds) ? '' : selectedAuction.virtualGalleryIds}
        />
        {/*
          Email Editor for conditionRequestEmail
        */}
        <TextField
          className={classes.emailInput}
          label="Condition Request Email"
          placeholder="Ex: tkim@phillips.com"
          value={isNull(selectedAuction.conditionRequestEmail) ? '' : selectedAuction.conditionRequestEmail}
          InputLabelProps={{
            shrink: true
          }}
          onChange={e => editDetails('conditionRequestEmail', e.target.value)}
        />
        {/*
          Email Editor for contactEmail
        */}
        <TextField
          className={classes.emailInput}
          label="Contact Email"
          InputProps={{
            fullWidth: true
          }}
          InputLabelProps={{
            shrink: true
          }}
          placeholder="Ex: tkim@phillips.com"
          value={isNull(selectedAuction.contactEmail) ? '' : selectedAuction.contactEmail}
          onChange={e => editDetails('contactEmail', e.target.value)}
        />
      </Grid>
      <Grid
        item
        className={classes.outlined}
        xs={12}
        sm={6}
      >
        <TextField
          className={classes.textInput}
          label="Upcoming Lots Page Title"
          InputProps={{ fullWidth: true }}
          InputLabelProps={{ shrink: true }}
          onChange={e => editDetails('upcomingLotsTitle', e.target.value)}
          value={isNull(selectedAuction.upcomingLotsTitle) ? '' : selectedAuction.upcomingLotsTitle}
        />
        <TextField
          className={classes.textInput}
          label="Upcoming Lots Page Description"
          InputProps={{ fullWidth: true }}
          InputLabelProps={{ shrink: true }}
          onChange={e => editDetails('upcomingLotsDesc', e.target.value)}
          value={isNull(selectedAuction.upcomingLotsDesc) ? '' : selectedAuction.upcomingLotsDesc}
        />
      </Grid>
      <Grid
        item
        className={classes.outlined}
        xs={12}
        sm={6}
      >
        <TextField
          className={classes.textInput}
          label="Meta Description"
          InputProps={{ fullWidth: true }}
          InputLabelProps={{ shrink: true }}
          onChange={e => editDetails('metaDescription', e.target.value)}
          placeholder="Phillips presents {Name} from {Dates} in {City} where we'll be featuring works by Artist 1, Artist 2"
          value={isNull(selectedAuction.metaDescription) ? '' : selectedAuction.metaDescription}
        />
        <TextField
          className={classes.textInput}
          label="Meta Keywords"
          InputProps={{
            fullWidth: true
          }}
          InputLabelProps={{ shrink: true }}
          onChange={e => editDetails('metaKeywords', e.target.value)}
          value={isNull(selectedAuction.metaKeywords) ? '' : selectedAuction.metaKeywords}
        />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ExtraInfoForm);
