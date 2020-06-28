import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';

import { ALERT_TYPES as alertTypes } from '../constants'

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography';

// Components
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  root: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '80%'
  },
  card: {
    minWidth: 244,
    margin: '5px'
  },
  cardActionArea: {
    height: '100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  sectionDivider: {
    borderBottom: '1px solid #000',
    marginTop: '20px',
    width: '100%'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    width: '95%'
  }
})

const Content = (props) => {
  const {
    alert,
    classes,
    item,
    handleChange,
    handlePurgeCache,
    selectedCacheEndpoint
  } = props;
console.log('props: ', props);
  let processing = alert.type === alertTypes.CACHE_PURGING
  return (<Fragment>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {item.name}
      </Typography>
      {item.hasInput ? <TextField
        id={item.input.key}
        label={item.input.label}
        className={classes.textField}
        margin="normal"
        fullwidth="true"
        style={{ width: '100%' }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event) => handleChange(item, event)}
      /> : null}
    </CardContent>
    {item.hasInput ?
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handlePurgeCache(item)}
          disabled={processing && item.name === selectedCacheEndpoint.name}>Purge Cache</Button>
      </CardActions> : null}
  </Fragment>)
}

class WebsiteCacheManagement extends Component {
  state = {
    dense: false,
    secondary: true
  };

  componentWillMount() {

  }
  handleChange = (item, event) => {
    item.input.value = event.target.value;
    this.props.actions.setSelectedCacheEndpoint(item);
  }

  handlePurgeCache = (item) => {
    this.props.actions.setSelectedCacheEndpoint(item);
    this.props.actions.purgeCache();
  }

  componentDidMount() {
  }

  render() {
    const { classes, cacheEndpoints, alert, selectedCacheEndpoint } = this.props;
    let processing = alert.type === alertTypes.CACHE_PURGING;
    return (
      <div className={classes.root}>
        <Grid container spacing={24} alignItems="stretch" >
          <Grid item xs={12}>
            <Grid container className={classes.root} spacing={24} alignItems="stretch" >
              <Grid item xs={12}>
                <span>
                  <h1>Website Cache Management</h1>
                  Press any tile to purge the cache
                </span>
                {processing ? <LinearProgress color="secondary" /> : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.root} spacing={24}  >
              {cacheEndpoints.map((cacheSection, index) => (
                <Fragment key={index}>
                  <div className={classes.root, classes.sectionDivider} >
                    {cacheSection.sectionName}
                  </div>
                  {cacheSection.items.map((item, index) => (
                    <Card className={classes.card} key={index}>
                      {processing && item.name === selectedCacheEndpoint.name ? <LinearProgress color="secondary" /> : null}
                      {!item.hasInput ?
                        <CardActionArea
                          onClick={() => this.handlePurgeCache(item)}
                          className={classes.cardActionArea}
                          disabled={processing && item.name === selectedCacheEndpoint.name}>
                          <Content
                            alert={alert} 
                            classes={classes}
                            item={item}
                            selectedCacheEndpoint={selectedCacheEndpoint} />
                        </CardActionArea>
                        : <Content
                          alert={alert}
                          item={item}
                          classes={classes}
                          handleChange={this.handleChange}
                          handlePurgeCache={this.handlePurgeCache}
                          selectedCacheEndpoint={selectedCacheEndpoint} />}
                    </Card>
                  ))}
                </Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

WebsiteCacheManagement.propTypes = {
  state: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles, { withTheme: true })(WebsiteCacheManagement)