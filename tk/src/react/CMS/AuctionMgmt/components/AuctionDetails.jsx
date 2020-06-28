import React from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';

import RelevantAuctions from './RelevantAuctions';
import GeneralDetailsContainer from '../containers/DetailsFormsContainers/GeneralDetailsContainer';
import ExtraInfoContainer from '../containers/DetailsFormsContainers/extraInfo.container';
import FlocklerIdsContainer from '../containers/DetailsFormsContainers/FlocklerIdsContainer';
import BannersContainer from '../containers/DetailsFormsContainers/BannersContainer';
import HighlightsContainer from '../containers/DetailsFormsContainers/HighlightsContainer';
import PrintCatalogueContainer from '../containers/DetailsFormsContainers/PrintCatalogueContainer';
import SaleResultsContainer from '../containers/DetailsFormsContainers/SaleResultsContainer';
import BuyNowDetailsContainer from '../containers/DetailsFormsContainers/buyNowDetails.container';
import WinnerBidEmailContainer from '../containers/DetailsFormsContainers/WinnerBidEmailContainer';
import AuctionMobilityContainer from '../containers/DetailsFormsContainers/AuctionMobilityContainer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    justify: 'space-between',
    width: '100%'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  lotsLink: {
    textDecoration: 'none',
    display: 'block',
    justifySelf: 'flex-end'
  },
  progressOverlay: {
    bottom: 0,
    right: 0,
    height: '100%',
    width: '100%',
    borderRadius: '5px',
    opacity: '0.5',
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 1000
  }
});

// userAccess
// 1 = full
// 3 = bids
// 4 = digital

class AuctionDetails extends React.Component {
  state = {
    value: 'general-details',
    userAccess: 1
  }

  componentWillMount() {
    const userAccess = JSON.parse(localStorage.getItem('userAccess'));
    this.setState({ userAccess: userAccess });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { classes, associatedAuctions } = this.props;
    const { value, userAccess } = this.state;
    const {
      cloudinaryUpload,
      updateAuction,
      selectedAuction
    } = this.props.state;
    const {
      saleNumber,
      auctionTitle,
      startDate
    } = selectedAuction;

    return (
      <div className={classes.root}>
        {auctionTitle === 'Sample Auction'
          ? <RelevantAuctions />
          : (
            <form
              className={classes.container}
              noValidate
              autoComplete="off"
            >
              <div className={classes.root} style={{ position: 'relative' }}>
                {
                  cloudinaryUpload.cloudinaryDialogOpen ||
                  cloudinaryUpload.thumbnailDialogOpen ||
                  updateAuction.saveDialogOpen
                    ? <LinearProgress />
                    : <div className={classes.progressPlaceholder}>&nbsp;</div>
                }
                {
                  cloudinaryUpload.cloudinaryDialogOpen ||
                  cloudinaryUpload.thumbnailDialogOpen ||
                  updateAuction.saveDialogOpen
                    ? <div className={classes.progressOverlay} />
                    : null
                }
                <span>
                  {selectedAuction !== undefined
                    ? (
                      <h3>
                        {saleNumber}
                        &nbsp;&ndash;&nbsp;
                        {auctionTitle}
                        &nbsp;&ndash;&nbsp;
                        {startDate.slice('T', 10)}
                      </h3>
                    ) : <h3>Sale Number &mdash; Auction Title</h3>}
                </span>
                <AppBar position="static" style={{ backgroundColor: '#000', color: '#fff' }}>
                  <Toolbar justify="space-between">
                    {userAccess !== 3
                      ? (
                        <Tabs
                          value={value}
                          onChange={this.handleChange}
                          variant="scrollable"
                          scrollButtons="auto"
                        >
                          <Tab label="General Details" value="general-details" />
                          <Tab label="Extra Info" value="extra-info" />
                          <Tab label="Editorial" value="editorial" />
                          <Tab label="Highlights" value="highlights" />
                          <Tab label="Print Catalogue" value="print-catalogue" />
                          <Tab label="Banners" value="banners" />
                          <Tab label="Sale Results" value="sale-results" />
                          <Tab label="Buy Now" value="buy-now" />
                          <Tab label="Winner Bid Email" value="winner-bid-email" />
                          <Tab label="Auction Mobility" value="auction-mobility" />
                        </Tabs>
                      )
                      : (
                        <Tabs
                          value={value}
                          onChange={this.handleChange}
                          variant="scrollable"
                          scrollButtons="auto"
                        >
                          <Tab label="Sale Results" value="sale-results" />
                          <Tab label="Winner Bid Email" value="winner-bid-email" />
                        </Tabs>
                      )
                    }
                    { /* <Tab label="Live Auctions" value="live-auctions" /> */}
                  </Toolbar>
                </AppBar>
                {value === 'sale-results' && <SaleResultsContainer />}
                {value === 'general-details' && userAccess !== 3 && <GeneralDetailsContainer />}
                {value === 'extra-info' && <ExtraInfoContainer />}
                {value === 'editorial' && <FlocklerIdsContainer />}
                {value === 'highlights' && <HighlightsContainer />}
                {value === 'print-catalogue' && <PrintCatalogueContainer />}
                {value === 'banners' && <BannersContainer associatedAuctions={associatedAuctions} />}
                {value === 'buy-now' && <BuyNowDetailsContainer />}
                {value === 'winner-bid-email' && <WinnerBidEmailContainer />}
                {value === 'auction-mobility' && <AuctionMobilityContainer />}
              </div>
            </form>
          )}
      </div>
    );
  }
}

AuctionDetails.defaultProps = {
  associatedAuctions: []
};

AuctionDetails.propTypes = {
  classes: PropTypes.shape({
    container: PropTypes.string,
    lotsLink: PropTypes.string,
    menu: PropTypes.string,
    root: PropTypes.string,
    textField: PropTypes.string,
    progressOverlay: PropTypes.string
  }).isRequired,
  associatedAuctions: PropTypes.arrayOf(PropTypes.string)
  // actions: PropTypes.shape({
  //   saveDialogOpen: PropTypes.func.isRequired,
  //   thumbnailDialogOpen: PropTypes.func.isRequired
  // }).isRequired,
  // state: PropTypes.shape({
  //   selectedAuction: PropTypes.objectOf(PropTypes.object).isRequired
  // }).isRequired
};

export default withStyles(styles)(AuctionDetails);
