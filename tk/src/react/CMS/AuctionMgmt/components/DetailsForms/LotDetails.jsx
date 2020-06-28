import React from 'react'
import PropTypes from 'prop-types'
import { Cloudinary } from 'cloudinary-core'

// Material UI
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'

// Material UI FormGroup
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

const styles = theme => ({
    container: {
        // display: 'flex',
        // flexWrap: 'wrap',
        // justifyContent: 'center'
    },
    root: {
        flexGrow: 1,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // width: 200,
    },
    menu: {
        width: 200,
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: 'left',
        color: theme.palette.text.secondary,
        boxShadow: 'none'
    },
    outlined: {
        border: '1px solid #000',
        borderRadius: '3px',
        margin: '5px',
        width: '95%'
    },
    switchLabel: {
        textAlign: 'left'
    },
    gridList: {
        flexWrap: 'nowrap',
        padding: '10px',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    instructions: {
        justifySelf: 'flex-start',
        fontStyle: 'italic'
    },
    imageTile: {
        height: '100%'
    }
})

const cloudinaryConfig = Cloudinary.new({
    cloud_name: 'phillips-assets',
    private_cdn: true,
    secure: true,
    secure_distribution: 'assets.phillips.com',
    cname: 'assets.phillips.com'
})

class LotDetails extends React.Component {
    state = {
        multiline: 'Controlled',
    }

    handleChange = (name) => (event) => {
        // Have to set both internal state and store value for dropdown
        this.setState({
            [name]: event.target.value
        })

        this.props.actions.editLotDetails(name, event.target.value)
    }

    handleToggle = (name) => (event) => {
        this.props.actions.editLotDetails(name, event.target.checked)
    }

    setViewInRoom = (imagePath) => (event) => {
        // Temporarily disabled pending back-end implementation
        // const { lotImages } = this.props.state.selectedLot
        // const newLotImages = lotImages.map(image => {
        //   image.isViewInRoom = false
        //   return (image.imagePath === imagePath)
        //     ? image.isViewInRoom === false
        //       ? { ...image, isViewInRoom: true }
        //       : { ...image, isViewInRoom: false }
        //     : image
        // })
        //
        // this.props.actions.editLotImages(newLotImages)
    }

    render() {
        console.log('Lot Details render(): ', this.props, this.state)
        const { classes } = this.props
        const { lotDisplayTypes } = this.props.state.lots
        const {
            auctionLotBidUrl,
            auctionLotDisplayTypeId,
            soldOverridePrice,
            description,
            detailVideoUrl,
            estimateText,
            is360View,
            isHideDisplay,
            lotNumber,
            isSoldOverride,
            showAdvanceBidButton,
            showInquireButton,
            showSaleOffers,
            showSoldPrice,
            showEstimateText,
            lotImages
        } = this.props.state.selectedLot

        const lotDisplayTypesFiltered = lotDisplayTypes.filter(d => (d.disabled === false));
        let selectedDisplayType = lotDisplayTypesFiltered.find(type => parseInt(type.value, 10) === parseInt(auctionLotDisplayTypeId, 10));
        if (!selectedDisplayType) {
            selectedDisplayType = lotDisplayTypes.find(type => parseInt(type.value, 10) === parseInt(auctionLotDisplayTypeId, 10))
        }
        return (
            <div className={classes.root}>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        &nbsp;
          </Grid>
                    <Grid item container xs={12} spacing={8}>
                        <Grid item xs={12}>
                            <GridList className={classes.gridList} cols={4}>
                                {lotImages.map(tile => (
                                    <GridListTile key={tile.imagePath}>
                                        <img
                                            className={classes.imageTile}
                                            src={cloudinaryConfig.url(
                                                tile.imagePath,
                                                {
                                                    'transformation': 'Website_CuratedAuction_SingleCell_NoPad_dev2',
                                                    'version': "1234"
                                                }
                                            )}
                                            onDoubleClick={this.setViewInRoom(tile.imagePath)}
                                        />
                                        <GridListTileBar
                                            key={tile.imagePath}
                                            classes={{
                                                root: classes.titleBar,
                                                title: classes.title,
                                            }}
                                            actionIcon={
                                                tile.isViewInRoom ?
                                                    <IconButton>
                                                        <StarBorderIcon className={classes.title} />
                                                    </IconButton>
                                                    : null
                                            }
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                            <p className={classes.instructions}>
                                View in Room images are marked with a star.
              </p>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={6} spacing={8}>
                        <div className={classes.outlined}>
                            <Grid item xs={12}>
                                <TextField
                                    id="lotNumber"
                                    label="Lot Number"
                                    className={classes.textField}
                                    margin="normal"
                                    fullwidth="true"
                                    style={{ width: '80%' }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={lotNumber}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="description"
                                    label="Title"
                                    className={classes.textField}
                                    margin="normal"
                                    fullwidth="true"
                                    style={{ width: '80%' }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={description}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="detailVideoUrl"
                                    label="Detail Video Url"
                                    className={classes.textField}
                                    margin="normal"
                                    style={{ width: '80%' }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={detailVideoUrl !== null ? detailVideoUrl : ''}
                                    onChange={this.handleChange('detailVideoUrl')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="auctionLotBidUrl"
                                    label="Lot Bid URL"
                                    className={classes.textField}
                                    margin="normal"
                                    style={{ width: '80%' }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={auctionLotBidUrl !== null ? auctionLotBidUrl : ''}
                                    onChange={this.handleChange('auctionLotBidUrl')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="estimateText"
                                    label="Estimate Text"
                                    className={classes.textField}
                                    margin="normal"
                                    style={{ width: '80%' }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={estimateText !== null ? estimateText : ''}
                                    onChange={this.handleChange('estimateText')}
                                />
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item container xs={12} md={6} spacing={8}>
                        <div className={classes.outlined}>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormGroup>
                                        <FormControlLabel
                                            className={classes.switchLabel}
                                            control={(
                                                <Switch
                                                    checked={showSaleOffers ? true : false}
                                                    onChange={this.handleToggle('showSaleOffers')}
                                                    color="primary"
                                                />
                                            )}
                                            label="Show Sale Offers"
                                        />
                                        <FormControlLabel
                                            className={classes.switchLabel}
                                            control={(
                                                <Switch
                                                    checked={is360View ? true : false}
                                                    onChange={this.handleToggle('is360View')}
                                                    color="primary"
                                                />
                                            )}
                                            label="Has 360 View"
                                        />
                                        <FormControlLabel
                                            className={classes.switchLabel}
                                            control={(
                                                <Switch
                                                    checked={showAdvanceBidButton ? true : false}
                                                    onChange={this.handleToggle('showAdvanceBidButton')}
                                                    color="primary"
                                                />
                                            )}
                                            label="Show Advance Bid Button"
                                        />
                                        <FormControlLabel
                                            className={classes.switchLabel}
                                            control={(
                                                <Switch
                                                    checked={showInquireButton ? true : false}
                                                    onChange={this.handleToggle('showInquireButton')}
                                                    color="primary"
                                                />
                                            )}
                                            label="Show Inquire Button"
                                        />
                                        <FormControlLabel
                                            className={classes.switchLabel}
                                            control={(
                                                <Switch
                                                    checked={showEstimateText ? true : false}
                                                    onChange={this.handleToggle('showEstimateText')}
                                                    color="primary"
                                                />
                                            )}
                                            label="Show Estimate Text"
                                        />
                                        <FormControlLabel
                                            className={classes.switchLabel}
                                            control={(
                                                <Switch
                                                    checked={showSoldPrice ? true : false}
                                                    onChange={this.handleToggle('showSoldPrice')}
                                                    color="primary"
                                                />
                                            )}
                                            label="Show Sold Price"
                                        />
                                        <FormControlLabel
                                            className={classes.switchLabel}
                                            control={(
                                                <Switch
                                                    checked={isHideDisplay ? true : false}
                                                    onChange={this.handleToggle('isHideDisplay')}
                                                    color="primary"
                                                />
                                            )}
                                            label="Hide Lot Display"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item container className={classes.outlined} xs={12} spacing={8}>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    <FormControlLabel
                                        className={classes.switchLabel}
                                        control={(
                                            <Switch
                                                checked={isSoldOverride ? true : false}
                                                onChange={this.handleToggle('isSoldOverride')}
                                                color="primary"
                                            />
                                        )}
                                        label="Mark As Sold"
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl component="fieldset">
                                <FormGroup>
                                    <TextField
                                        id="soldOverridePrice"
                                        label="Sold Price"
                                        className={classes.textField}
                                        margin="normal"
                                        style={{ width: '80%' }}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={soldOverridePrice !== null ? soldOverridePrice : ''}
                                        onChange={this.handleChange('soldOverridePrice')}
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid className={classes.outlined} item container xs={12} spacing={8}>
                        <Grid item xs={6}>
                            {!selectedDisplayType.disabled
                                ? <TextField
                                    id="select-auction-lot-display-type"
                                    select
                                    label="Lot Display Type*"
                                    style={{ width: '90%' }}
                                    className={classes.textField}
                                    value={selectedDisplayType.value}
                                    onChange={this.handleChange('auctionLotDisplayTypeId')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu
                                        }
                                    }}
                                    margin="normal"
                                >

                                    {lotDisplayTypesFiltered.map(type => (
                                        <MenuItem
                                            key={type.name}
                                            value={type.value}
                                        >
                                            {type.text}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                : <TextField
                                    id="select-auction-lot-display-type"
                                    label="Lot Display Type"
                                    className={classes.textField}
                                    margin="normal"
                                    style={{ width: '80%' }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    disabled
                                    value={selectedDisplayType.text}
                                />}
                        </Grid>
                        <Grid item xs={5}>
                            {parseInt(auctionLotDisplayTypeId) === 1
                                ? <img src="https://content.phillips.com/CMS/Help/curated_1.webp" />
                                : null}
                            {parseInt(auctionLotDisplayTypeId) === 2
                                ? <img src="https://content.phillips.com/CMS/Help/curated_2.webp" />
                                : null}
                            {parseInt(auctionLotDisplayTypeId) === 3
                                ? <img src="https://content.phillips.com/CMS/Help/curated_3.webp" />
                                : null}
                            {parseInt(auctionLotDisplayTypeId) === 4
                                ? <img src="https://content.phillips.com/CMS/Help/curated_4.webp" />
                                : null}
                            {parseInt(auctionLotDisplayTypeId) === 5
                                ? <img src="https://content.phillips.com/CMS/Help/curated_4.webp" />
                                : null}
                            {parseInt(auctionLotDisplayTypeId) === 6
                                ? <img src="https://content.phillips.com/CMS/Help/curated_4.webp" />
                                : null}
                            {parseInt(auctionLotDisplayTypeId) === 7
                                ? <img src="https://content.phillips.com/CMS/Help/curated_7.webp" />
                                : null}
                            {parseInt(auctionLotDisplayTypeId) === 8
                                ? <img src="https://content.phillips.com/CMS/Help/curated_8.webp" />
                                : null}
                            {parseInt(auctionLotDisplayTypeId) === 9
                                ? <img src="https://content.phillips.com/CMS/Help/curated_8.webp" />
                                : null}
                            {parseInt(auctionLotDisplayTypeId) === 10
                                ? <img src="https://content.phillips.com/CMS/Help/curated_8.webp" />
                                : null}
                            {parseInt(auctionLotDisplayTypeId) === 20
                                ? <img src="https://content.phillips.com/CMS/Help/curated_20.webp" />
                                : null}
                            {parseInt(auctionLotDisplayTypeId) === 21
                                ? <img src="https://content.phillips.com/CMS/Help/curated_21.webp" />
                                : null}
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

LotDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    // auctionInfo: PropTypes.object.isRequired
}

export default withStyles(styles)(LotDetails)
