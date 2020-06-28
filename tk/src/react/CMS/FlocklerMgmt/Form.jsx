import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isNull from 'lodash/isNull';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import getInputs from './InputFactory';
import ProgressBar from './ProgressBar';
import { selectItem, updateItem, editorialCarousel, handleCarouselItem } from './actions';
import { getPadding } from './styles';
import { defaultProps } from '../../PhillipsCarousel/proptypes';

const root = {
  flexGrow: 1,
  backgroundColor: '#000'
};

const styles = theme => ({
  root,
  rootPaper: {
    ...getPadding(8)
  },
  rootToolbar: {
    ...root,
    'justifyContent': 'space-between'
  },
  indicator: {
    backgroundColor: '#f2f2f2'
  }
});

const Form = ({ classes }) => {
  const {
    activeView,
    formStatus,
    selectedEditorial
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const [tabValue, setTab] = useState(0);
  const [currData, editData] = useState(selectedEditorial);
  // when reducer changes, data gets set
  useEffect(() => {
    dispatch(selectItem(currData));
  }, []);
  useEffect(() => {
    editData({
      ...selectedEditorial
    });
  }, [selectedEditorial]);
  const handleTabChange = (e, value) => {
    setTab(value);
  };
  const handleDataEdit = (type, data) => {
    if (type === 'carousels') {
      dispatch(editorialCarousel(data));
      return;
    }
    dispatch(updateItem({ ...currData, ...data }));
  };
  const handleCarouselItemSubmit = (data, method) => {
    dispatch(handleCarouselItem(data, method));
  }
  const Child = getInputs(tabValue);

  return (
    <Grid xs={12} sm={7} item>
      <Grid container spacing={8}>
        <Grid xs={12} item>

          <AppBar position="relative">
            <Toolbar classes={{ root: classes.rootToolbar }}>
              <span>
                {currData.title}
                <br />
                {`ID: ${currData.flocklerId}`}
              </span>
              {!formStatus.pending && formStatus.msg.length > 0
                ? <span>{formStatus.msg}</span>
                : null
              }
            </Toolbar>
            <Tabs
              classes={{
                indicator: classes.indicator,
                root: classes.root
              }}
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
            >
              <Tab value={0} label="Main Info" />
              <Tab value={1} label="Lot Carousel" />
              <Tab value={2} label="Makers" />
              <Tab value={3} label="Alternate Data" />
            </Tabs>
            {
              formStatus.pending ? <ProgressBar /> : null
            }
          </AppBar>
        </Grid>
        {!isNull(Child) && (
          <Grid xs={12} item>
            <Child
              data={currData}
              flocklerId={currData.flocklerId}
              onSubmit={handleDataEdit}
              onCarouselItemSubmit={handleCarouselItemSubmit}
              activeView={activeView}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Form);
